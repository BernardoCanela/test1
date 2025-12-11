"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function FinanceIRCPage() {
  const queryClient = useQueryClient();
  const { data: monthsData } = useQuery({
    queryKey: ["fin-months"],
    queryFn: async () => {
      const r = await fetch("/api/finance/months/list");
      if (!r.ok) throw new Error("Failed months");
      return r.json();
    },
  });
  const months = monthsData?.months || [];
  const defaultMonthId = useMemo(() => {
    const open = months.find((m) => m.status === "open");
    return open?.id || months[0]?.id;
  }, [months]);
  const [monthId, setMonthId] = useState(null);
  useEffect(() => {
    if (!monthId && defaultMonthId) setMonthId(defaultMonthId);
  }, [defaultMonthId, monthId]);

  const ledgerQuery = useQuery({
    enabled: !!monthId,
    queryKey: ["fin-irc-ledger", monthId],
    queryFn: async () => {
      const r = await fetch(`/api/finance/irc/ledger?monthId=${monthId}`);
      if (!r.ok) throw new Error("Failed ledger");
      return r.json();
    },
  });

  const [payForm, setPayForm] = useState({
    quarter: "",
    year: "",
    amount_paid: "",
    payment_date: "",
  });
  useEffect(() => {
    if (ledgerQuery.data?.month) {
      const m = ledgerQuery.data.month;
      const q = m.month <= 3 ? 1 : m.month <= 6 ? 2 : m.month <= 9 ? 3 : 4;
      setPayForm((f) => ({ ...f, quarter: q, year: m.year }));
    }
  }, [ledgerQuery.data?.month]);

  const createPayment = useMutation({
    mutationFn: async (payload) => {
      const r = await fetch(`/api/finance/irc/payments/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error("Failed to record payment");
      return r.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fin-irc-ledger", monthId] });
      alert("Pagamento de IRC registado");
      setPayForm((f) => ({ ...f, amount_paid: "", payment_date: "" }));
    },
    onError: (e) => {
      console.error(e);
      alert("Erro ao registar pagamento");
    },
  });

  const fmt = (n) =>
    new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
    }).format(Number(n || 0));

  return (
    <div>
      <h2 className="text-2xl font-montserrat font-bold mb-6">IRC</h2>

      <div className="flex items-center gap-3 mb-4">
        <select
          value={monthId || ""}
          onChange={(e) => setMonthId(Number(e.target.value))}
          className="bg-white text-black border rounded px-3 py-2 font-poppins"
        >
          {months.map((m) => (
            <option key={m.id} value={m.id}>
              {String(m.month).padStart(2, "0")}/{m.year}{" "}
              {m.status === "open" ? "(aberto)" : ""}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <SummaryCard
          title="IRC (apurar no mês)"
          value={fmt(ledgerQuery.data?.monthTotals?.irc_liability)}
        />
        <SummaryCard
          title="Pagamentos (mês)"
          value={fmt(ledgerQuery.data?.monthTotals?.irc_payments)}
        />
      </div>

      <div className="bg-white text-black rounded p-4 border border-gray-200 mb-6">
        <h3 className="font-montserrat font-bold mb-3">
          Registar Pagamento Trimestral
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          <input
            type="number"
            placeholder="Trimestre (1-4)"
            className="border rounded px-3 py-2"
            value={payForm.quarter}
            onChange={(e) =>
              setPayForm({ ...payForm, quarter: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Ano"
            className="border rounded px-3 py-2"
            value={payForm.year}
            onChange={(e) =>
              setPayForm({ ...payForm, year: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Montante pago"
            className="border rounded px-3 py-2"
            value={payForm.amount_paid}
            onChange={(e) =>
              setPayForm({ ...payForm, amount_paid: e.target.value })
            }
          />
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={payForm.payment_date}
            onChange={(e) =>
              setPayForm({ ...payForm, payment_date: e.target.value })
            }
          />
          <div className="text-sm self-center">Mês atribuído: {monthId}</div>
          <button
            onClick={() =>
              createPayment.mutate({
                ...payForm,
                month_id: monthId,
                amount_paid: Number(payForm.amount_paid),
              })
            }
            className="bg-[#FF0000] text-white rounded px-4"
          >
            Registar
          </button>
        </div>
      </div>

      <div className="bg-white text-black rounded p-4 border border-gray-200">
        <h3 className="font-montserrat font-bold mb-3">Movimentos do Mês</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="px-3 py-2">Data</th>
                <th className="px-3 py-2">Tipo</th>
                <th className="px-3 py-2">Descrição</th>
                <th className="px-3 py-2">Valor</th>
              </tr>
            </thead>
            <tbody>
              {(ledgerQuery.data?.entries || []).map((e) => (
                <tr key={e.id} className="border-t">
                  <td className="px-3 py-2">{e.transaction_date || "-"}</td>
                  <td className="px-3 py-2">{e.type}</td>
                  <td className="px-3 py-2">{e.description || "-"}</td>
                  <td className="px-3 py-2">{fmt(e.irc_amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value }) {
  return (
    <div className="bg-white text-black rounded p-4 border border-gray-200">
      <div className="font-montserrat font-bold mb-1">{title}</div>
      <div className="text-xl font-montserrat">{value}</div>
    </div>
  );
}
