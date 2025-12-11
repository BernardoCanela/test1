"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function FinanceExpensesPage() {
  const [tab, setTab] = useState("recurring");
  const queryClient = useQueryClient();

  // Months
  const { data: monthsData } = useQuery({
    queryKey: ["fin-months"],
    queryFn: async () => {
      const r = await fetch("/api/finance/months/list");
      if (!r.ok) throw new Error("Failed to load months");
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

  // Recurring
  const recurringQuery = useQuery({
    enabled: !!monthId,
    queryKey: ["fin-exp-rec", monthId],
    queryFn: async () => {
      const r = await fetch(
        `/api/finance/expenses/recurring/list?monthId=${monthId}&active=true`,
      );
      if (!r.ok) throw new Error("Failed recurring");
      return r.json();
    },
  });

  // One-time
  const onetimeQuery = useQuery({
    enabled: !!monthId,
    queryKey: ["fin-exp-one", monthId],
    queryFn: async () => {
      const r = await fetch(
        `/api/finance/expenses/onetime/list?monthId=${monthId}`,
      );
      if (!r.ok) throw new Error("Failed onetime");
      return r.json();
    },
  });

  const createRecurring = useMutation({
    mutationFn: async (payload) => {
      const r = await fetch(`/api/finance/expenses/recurring/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error("Failed to create recurring");
      return r.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fin-exp-rec", monthId] });
      alert("Despesa recorrente criada");
    },
    onError: (e) => {
      console.error(e);
      alert("Erro ao criar despesa");
    },
  });

  const createOnetime = useMutation({
    mutationFn: async (payload) => {
      const r = await fetch(`/api/finance/expenses/onetime/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!r.ok) throw new Error("Failed to create one-time");
      return r.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fin-exp-one", monthId] });
      alert("Despesa criada");
    },
    onError: (e) => {
      console.error(e);
      alert("Erro ao criar despesa");
    },
  });

  const [recForm, setRecForm] = useState({
    name: "",
    category: "",
    amount_excl_vat: "",
    vat_applicable: true,
    vat_rate: 0.23,
    start_month_id: null,
  });
  useEffect(() => {
    setRecForm((f) => ({ ...f, start_month_id: monthId }));
  }, [monthId]);

  const [oneForm, setOneForm] = useState({
    name: "",
    category: "",
    amount_excl_vat: "",
    vat_applicable: true,
    vat_rate: 0.23,
    expense_date: "",
  });

  const fmt = (n) =>
    new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
    }).format(Number(n || 0));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-montserrat font-bold">Despesas</h2>
        <div className="flex items-center gap-3">
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
          <div className="bg-white rounded p-1 text-black flex">
            <button
              onClick={() => setTab("recurring")}
              className={`px-4 py-2 rounded ${tab === "recurring" ? "bg-gray-200" : ""}`}
            >
              Recorrentes
            </button>
            <button
              onClick={() => setTab("onetime")}
              className={`px-4 py-2 rounded ${tab === "onetime" ? "bg-gray-200" : ""}`}
            >
              Pontuais
            </button>
            <button
              onClick={() => setTab("bycat")}
              className={`px-4 py-2 rounded ${tab === "bycat" ? "bg-gray-200" : ""}`}
            >
              Por Categoria
            </button>
          </div>
        </div>
      </div>

      {tab === "recurring" && (
        <div className="bg-white text-black rounded p-4 border border-gray-200">
          <h3 className="font-montserrat font-bold mb-3">
            Adicionar Recorrente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mb-4">
            <input
              placeholder="Nome"
              className="border rounded px-3 py-2"
              value={recForm.name}
              onChange={(e) => setRecForm({ ...recForm, name: e.target.value })}
            />
            <input
              placeholder="Categoria"
              className="border rounded px-3 py-2"
              value={recForm.category}
              onChange={(e) =>
                setRecForm({ ...recForm, category: e.target.value })
              }
            />
            <input
              placeholder="Valor s/IVA"
              type="number"
              className="border rounded px-3 py-2"
              value={recForm.amount_excl_vat}
              onChange={(e) =>
                setRecForm({ ...recForm, amount_excl_vat: e.target.value })
              }
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={recForm.vat_applicable}
                onChange={(e) =>
                  setRecForm({ ...recForm, vat_applicable: e.target.checked })
                }
              />{" "}
              IVA?
            </label>
            <input
              placeholder="Taxa IVA"
              type="number"
              step={0.01}
              className="border rounded px-3 py-2"
              value={recForm.vat_rate}
              onChange={(e) =>
                setRecForm({ ...recForm, vat_rate: e.target.value })
              }
            />
            <button
              onClick={() =>
                createRecurring.mutate({
                  ...recForm,
                  amount_excl_vat: Number(recForm.amount_excl_vat),
                })
              }
              className="bg-[#FF0000] text-white rounded px-4"
            >
              Guardar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-3 py-2">Nome</th>
                  <th className="px-3 py-2">Categoria</th>
                  <th className="px-3 py-2">s/IVA</th>
                  <th className="px-3 py-2">IVA</th>
                  <th className="px-3 py-2">c/IVA</th>
                  <th className="px-3 py-2">Início</th>
                  <th className="px-3 py-2">Fim</th>
                </tr>
              </thead>
              <tbody>
                {(recurringQuery.data?.items || []).map((e) => (
                  <tr key={e.id} className="border-t">
                    <td className="px-3 py-2">{e.name}</td>
                    <td className="px-3 py-2">{e.category || "-"}</td>
                    <td className="px-3 py-2">{fmt(e.amount_excl_vat)}</td>
                    <td className="px-3 py-2">{fmt(e.vat_amount)}</td>
                    <td className="px-3 py-2">{fmt(e.amount_incl_vat)}</td>
                    <td className="px-3 py-2">{e.start_month_id}</td>
                    <td className="px-3 py-2">{e.end_month_id || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "onetime" && (
        <div className="bg-white text-black rounded p-4 border border-gray-200">
          <h3 className="font-montserrat font-bold mb-3">Adicionar Pontual</h3>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-3 mb-4">
            <input
              placeholder="Nome"
              className="border rounded px-3 py-2"
              value={oneForm.name}
              onChange={(e) => setOneForm({ ...oneForm, name: e.target.value })}
            />
            <input
              placeholder="Categoria"
              className="border rounded px-3 py-2"
              value={oneForm.category}
              onChange={(e) =>
                setOneForm({ ...oneForm, category: e.target.value })
              }
            />
            <input
              placeholder="Valor s/IVA"
              type="number"
              className="border rounded px-3 py-2"
              value={oneForm.amount_excl_vat}
              onChange={(e) =>
                setOneForm({ ...oneForm, amount_excl_vat: e.target.value })
              }
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={oneForm.vat_applicable}
                onChange={(e) =>
                  setOneForm({ ...oneForm, vat_applicable: e.target.checked })
                }
              />{" "}
              IVA?
            </label>
            <input
              placeholder="Taxa IVA"
              type="number"
              step={0.01}
              className="border rounded px-3 py-2"
              value={oneForm.vat_rate}
              onChange={(e) =>
                setOneForm({ ...oneForm, vat_rate: e.target.value })
              }
            />
            <input
              placeholder="Data"
              type="date"
              className="border rounded px-3 py-2"
              value={oneForm.expense_date}
              onChange={(e) =>
                setOneForm({ ...oneForm, expense_date: e.target.value })
              }
            />
            <button
              onClick={() =>
                createOnetime.mutate({
                  ...oneForm,
                  month_id: monthId,
                  amount_excl_vat: Number(oneForm.amount_excl_vat),
                })
              }
              className="bg-[#FF0000] text-white rounded px-4"
            >
              Guardar
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-3 py-2">Nome</th>
                  <th className="px-3 py-2">Categoria</th>
                  <th className="px-3 py-2">Data</th>
                  <th className="px-3 py-2">s/IVA</th>
                  <th className="px-3 py-2">IVA</th>
                  <th className="px-3 py-2">c/IVA</th>
                </tr>
              </thead>
              <tbody>
                {(onetimeQuery.data?.items || []).map((e) => (
                  <tr key={e.id} className="border-t">
                    <td className="px-3 py-2">{e.name}</td>
                    <td className="px-3 py-2">{e.category || "-"}</td>
                    <td className="px-3 py-2">{e.expense_date || "-"}</td>
                    <td className="px-3 py-2">{fmt(e.amount_excl_vat)}</td>
                    <td className="px-3 py-2">{fmt(e.vat_amount)}</td>
                    <td className="px-3 py-2">{fmt(e.amount_incl_vat)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "bycat" && (
        <div className="bg-white text-black rounded p-4 border border-gray-200">
          <p className="font-poppins text-gray-700">
            Gráficos por categoria em breve…
          </p>
        </div>
      )}
    </div>
  );
}
