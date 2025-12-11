"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function FinanceMonthsPage() {
  const qc = useQueryClient();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fin-months"],
    queryFn: async () => {
      const res = await fetch("/api/finance/months/list");
      if (!res.ok)
        throw new Error(
          `When fetching months: [${res.status}] ${res.statusText}`,
        );
      return res.json();
    },
  });

  const closeMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/finance/months/close", { method: "POST" });
      if (!res.ok) throw new Error("Failed to close month");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["fin-months"] });
      // also refresh overview KPIs
      qc.invalidateQueries({ queryKey: ["finance-kpi"] });
    },
  });

  return (
    <div>
      <h2 className="text-2xl font-montserrat font-bold mb-6">Months</h2>
      <div className="bg-white text-black rounded p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="font-poppins text-gray-700">
            Linha temporal e fecho de mês.
          </div>
          <button
            onClick={() => closeMutation.mutate()}
            className="bg-[#FF0000] text-white px-4 py-2 rounded"
            disabled={closeMutation.isLoading}
          >
            {closeMutation.isLoading ? "A fechar…" : "Fechar Mês Atual"}
          </button>
        </div>

        {isLoading ? (
          <div className="text-gray-600">A carregar…</div>
        ) : error ? (
          <div className="text-red-600">Erro a carregar. Tentar novamente.</div>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="py-2 pr-4">Mês</th>
                <th className="py-2 pr-4">Estado</th>
                <th className="py-2 pr-4">Receita Real</th>
                <th className="py-2 pr-4">Lucro Real</th>
                <th className="py-2 pr-4">Patamar</th>
              </tr>
            </thead>
            <tbody>
              {(data?.months || []).map((m) => {
                const v = (n) =>
                  new Intl.NumberFormat("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                  }).format(Number(n || 0));
                return (
                  <tr key={m.id} className="border-t">
                    <td className="py-2 pr-4">
                      {String(m.month).padStart(2, "0")}/{m.year}
                    </td>
                    <td className="py-2 pr-4">{m.status}</td>
                    <td className="py-2 pr-4">
                      {v(m.snapshot_real_revenue_eur)}
                    </td>
                    <td className="py-2 pr-4">{v(m.snapshot_real_profit)}</td>
                    <td className="py-2 pr-4">
                      {m.snapshot_patamar_achieved || "-"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
