"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function FinanceSettingsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["fin-settings"],
    queryFn: async () => {
      const res = await fetch("/api/finance/settings/get");
      if (!res.ok) throw new Error("Failed to load settings");
      return res.json();
    },
  });

  const map = useMemo(() => {
    const out = {};
    (data?.settings || []).forEach((s) => (out[s.key] = s.value?.value));
    return out;
  }, [data]);

  const [form, setForm] = useState({});

  useEffect(() => {
    setForm({
      vat_rate: map.vat_rate ?? 0.23,
      irc_rate: map.irc_rate ?? 0.21,
      employee_ss_rate: map.employee_ss_rate ?? 0.11,
      employer_ss_rate: map.employer_ss_rate ?? 0.2375,
      mandatory_savings_pct: map.mandatory_savings_pct ?? 0.075,
      default_exchange_rate_eur_usdt:
        map.default_exchange_rate_eur_usdt ?? 0.92,
    });
  }, [
    map.vat_rate,
    map.irc_rate,
    map.employee_ss_rate,
    map.employer_ss_rate,
    map.mandatory_savings_pct,
    map.default_exchange_rate_eur_usdt,
  ]);

  const updateMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await fetch("/api/finance/settings/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to update settings");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fin-settings"] });
      alert("Configurações guardadas");
    },
    onError: (e) => {
      console.error(e);
      alert("Erro ao guardar configurações");
    },
  });

  const onChange = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const onSave = () => {
    // Backend expects { key: value }
    updateMutation.mutate({
      vat_rate: Number(form.vat_rate),
      irc_rate: Number(form.irc_rate),
      employee_ss_rate: Number(form.employee_ss_rate),
      employer_ss_rate: Number(form.employer_ss_rate),
      mandatory_savings_pct: Number(form.mandatory_savings_pct),
      default_exchange_rate_eur_usdt: Number(
        form.default_exchange_rate_eur_usdt,
      ),
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading…</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/40 border border-red-700 text-red-100 p-4 rounded">
        Ocorreu um erro a carregar as configurações.
      </div>
    );
  }

  const Num = ({ label, k, step = 0.01, min = 0 }) => (
    <div>
      <label className="block text-sm font-montserrat mb-1">{label}</label>
      <input
        type="number"
        step={step}
        min={min}
        value={form[k] ?? ""}
        onChange={(e) => onChange(k, e.target.value)}
        className="w-full border rounded px-3 py-2 font-poppins"
      />
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-montserrat font-bold mb-6">Configurações</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Taxas */}
        <div className="bg-white text-black rounded p-6 border border-gray-200">
          <h3 className="font-montserrat font-bold text-lg mb-4">Taxas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Num label="IVA (%)" k="vat_rate" step={0.01} />
            <Num label="IRC (%)" k="irc_rate" step={0.01} />
            <Num label="SS Empregado (%)" k="employee_ss_rate" step={0.001} />
            <Num label="SS Empregador (%)" k="employer_ss_rate" step={0.001} />
          </div>
        </div>

        {/* Empresa */}
        <div className="bg-white text-black rounded p-6 border border-gray-200">
          <h3 className="font-montserrat font-bold text-lg mb-4">Empresa</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Num
              label="Poupança Obrigatória (0.05 – 0.10)"
              k="mandatory_savings_pct"
              step={0.005}
            />
            <Num
              label="Taxa EUR/USDT por defeito"
              k="default_exchange_rate_eur_usdt"
              step={0.0001}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onSave}
          className="bg-[#FF0000] hover:bg-red-700 text-white px-5 py-2 rounded font-poppins"
        >
          Guardar
        </button>
      </div>
    </div>
  );
}
