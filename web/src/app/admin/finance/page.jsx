"use client";

import { useEffect, useState } from "react";
import useUser from "@/utils/useUser";
import {
  BarChart3,
  Euro,
  PiggyBank,
  Landmark,
  Receipt,
  TrendingUp,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function FinanceOverviewPage() {
  const { data: user, loading } = useUser();
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    // simple placeholder warning about month closure checklist
    setWarning(
      "Lembra-te de cruzar o extracto bancário e enviar as faturas ao contabilista antes de fechar o mês.",
    );
  }, []);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["finance-kpi"],
    queryFn: async () => {
      const res = await fetch("/api/finance/kpi");
      if (!res.ok) {
        throw new Error(
          `When fetching /api/finance/kpi: [${res.status}] ${res.statusText}`,
        );
      }
      return res.json();
    },
  });

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  const fmt = (n) =>
    new Intl.NumberFormat("pt-PT", {
      style: "currency",
      currency: "EUR",
    }).format(Number(n || 0));

  return (
    <div>
      {/* Warning */}
      {warning && (
        <div className="mb-6 p-4 bg-yellow-900/40 border border-yellow-600 text-yellow-200 rounded-lg font-poppins">
          ⚠️ {warning}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-900/40 border border-red-600 text-red-200 rounded-lg font-poppins">
          Ocorreu um erro a carregar os KPIs.{" "}
          <button onClick={() => refetch()} className="underline">
            Tentar novamente
          </button>
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <KPI
          icon={Euro}
          title={`Receita (Mês ${data?.month?.month || ""}/${data?.month?.year || ""})`}
          value={fmt(data?.revenue?.total_excl_vat)}
          note={`EUR s/IVA: ${fmt(data?.revenue?.eur_excl_vat)} · Crypto(€): ${fmt(data?.revenue?.crypto_eur_equiv)}`}
        />
        <KPI
          icon={BarChart3}
          title="Lucro Real"
          value={fmt(data?.profit?.real)}
          note="Após IVA, IRC e despesas"
        />
        <KPI
          icon={TrendingUp}
          title="Lucro (antes poupança)"
          value={fmt(data?.profit?.before_savings)}
          note={`Receita líquida: ${fmt(data?.profit?.net_revenue)}`}
        />
        <KPI
          icon={Receipt}
          title="IVA a reservar"
          value={fmt(data?.taxes?.vat_liability)}
          note={`Vendas: ${fmt(data?.taxes?.vat_sales)} · Despesas: ${fmt(data?.taxes?.vat_expenses)}`}
        />
        <KPI
          icon={Landmark}
          title="IRC (mês)"
          value={fmt(data?.taxes?.irc_liability)}
          note="Apenas sobre EUR (antes salários)"
        />
        <KPI
          icon={PiggyBank}
          title="Poupança obrigatória"
          value={fmt(data?.savings?.amount)}
          note={`${Math.round((data?.savings?.pct || 0) * 1000) / 10}%`}
        />
      </div>

      {/* Actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="/admin/finance/projects"
          className="bg-[#FF0000] hover:bg-red-700 px-4 py-2 rounded text-white font-poppins"
        >
          Adicionar Projeto
        </a>
        <a
          href="/admin/finance/expenses"
          className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded font-poppins"
        >
          Adicionar Despesa
        </a>
        <a
          href="/admin/finance/months"
          className="bg-white text-black hover:bg-gray-200 px-4 py-2 rounded font-poppins"
        >
          Fechar Mês
        </a>
      </div>

      {/* Placeholder sections */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white text-black rounded-lg p-6">
          <h3 className="font-montserrat font-bold text-xl mb-4">
            Tendência de Receita
          </h3>
          <div className="text-gray-600 font-poppins">Gráfico em breve…</div>
        </div>
        <div className="bg-white text-black rounded-lg p-6">
          <h3 className="font-montserrat font-bold text-xl mb-4">
            Lucro: Real vs Teórico
          </h3>
          <div className="text-gray-600 font-poppins">Gráfico em breve…</div>
        </div>
      </div>
    </div>
  );
}

function KPI({ icon: Icon, title, value, note }) {
  return (
    <div className="bg-white text-black rounded-lg p-6 border border-gray-200">
      <div className="flex items-center gap-3 mb-2">
        <Icon size={20} className="text-[#FF0000]" />
        <h4 className="font-montserrat font-bold">{title}</h4>
      </div>
      <div className="text-2xl font-montserrat font-bold">{value}</div>
      <div className="text-sm text-gray-600 font-poppins mt-1">{note}</div>
    </div>
  );
}
