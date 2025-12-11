"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Search, RefreshCcw, DollarSign } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function FinanceProjectsPage() {
  const [query, setQuery] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showPayFor, setShowPayFor] = useState(null); // project object
  const qc = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["fin-projects"],
    queryFn: async () => {
      const res = await fetch("/api/finance/projects/list");
      if (!res.ok)
        throw new Error(
          `When fetching projects: [${res.status}] ${res.statusText}`,
        );
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await fetch("/api/finance/projects/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create project");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["fin-projects"] }),
  });

  const payMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await fetch("/api/finance/projects/add-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to add payment");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["fin-projects"] }),
  });

  const projects = data?.projects || [];
  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return projects.filter(
      (p) =>
        !q ||
        p.title.toLowerCase().includes(q) ||
        (p.status || "").toLowerCase().includes(q),
    );
  }, [projects, query]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h2 className="text-2xl font-montserrat font-bold">
          Portfólio · Finance Projects
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowNew(true)}
            className="bg-[#FF0000] text-white px-4 py-2 rounded flex items-center gap-2 font-poppins"
          >
            <Plus size={18} /> New Project
          </button>
          <button
            onClick={() => refetch()}
            className="bg-white text-black px-4 py-2 rounded flex items-center gap-2 font-poppins"
          >
            <RefreshCcw size={18} /> Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded p-4 text-black mb-4 flex flex-col md:flex-row gap-3 items-start md:items-center">
        <div className="flex items-center bg-gray-100 rounded px-3 py-2 w-full md:w-auto">
          <Search size={16} className="text-gray-600 mr-2" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="bg-transparent outline-none w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded p-4 text-black overflow-x-auto">
        {isLoading ? (
          <div className="text-gray-600">Loading…</div>
        ) : error ? (
          <div className="text-red-600">Failed to load. Try again.</div>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm text-gray-600">
                <th className="py-2 pr-4">Title</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Currency</th>
                <th className="py-2 pr-4">Invoiced</th>
                <th className="py-2 pr-4">Paid</th>
                <th className="py-2 pr-4">Remaining</th>
                <th className="py-2 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td className="py-4 text-gray-500" colSpan={7}>
                    No projects
                  </td>
                </tr>
              )}
              {filtered.map((p) => {
                const fmt = (n) =>
                  new Intl.NumberFormat("pt-PT", {
                    style: "currency",
                    currency: "EUR",
                  }).format(Number(n || 0));
                return (
                  <tr key={p.id} className="border-t">
                    <td className="py-2 pr-4 font-poppins font-semibold">
                      {p.title}
                    </td>
                    <td className="py-2 pr-4">
                      <span className="inline-block px-2 py-1 rounded bg-gray-100 text-gray-800 text-xs">
                        {p.status}
                      </span>
                    </td>
                    <td className="py-2 pr-4">{p.currency}</td>
                    <td className="py-2 pr-4">
                      {p.currency === "EUR"
                        ? fmt(p.invoiced_amount_excl_vat)
                        : fmt(p.invoiced_eur_equivalent)}
                    </td>
                    <td className="py-2 pr-4">{fmt(p.paid_eur_equiv)}</td>
                    <td className="py-2 pr-4">{fmt(p.remaining_amount)}</td>
                    <td className="py-2 pr-0 text-right">
                      <button
                        onClick={() => setShowPayFor(p)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1 justify-end w-full"
                      >
                        <DollarSign size={16} /> Payment
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* New Project panel */}
      {showNew && (
        <NewProject
          onClose={() => setShowNew(false)}
          onCreate={(payload) => createMutation.mutate(payload)}
          loading={createMutation.isLoading}
        />
      )}

      {/* Add Payment panel */}
      {showPayFor && (
        <AddPayment
          project={showPayFor}
          onClose={() => setShowPayFor(null)}
          onSubmit={(payload) => payMutation.mutate(payload)}
          loading={payMutation.isLoading}
        />
      )}
    </div>
  );
}

function NewProject({ onClose, onCreate, loading }) {
  const [title, setTitle] = useState("");
  const [currency, setCurrency] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [vatApplicable, setVatApplicable] = useState(true);
  const [vatRate, setVatRate] = useState("0.23");
  const [exRate, setExRate] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [expected, setExpected] = useState("");

  const submit = () => {
    const payload = {
      title,
      currency,
      amount_excl_vat: Number(amount || 0),
      vat_applicable: vatApplicable,
      vat_rate: vatApplicable ? Number(vatRate || 0) : 0,
      exchange_rate_eur_usdt:
        currency === "USDT" ? Number(exRate || 0) : undefined,
      start_date: startDate,
      expected_completion_date: expected || null,
    };
    onCreate(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white text-black rounded-lg p-6 w-full max-w-lg">
        <h3 className="font-montserrat font-bold text-xl mb-4">New Project</h3>
        <div className="space-y-3">
          <Input label="Title" value={title} onChange={setTitle} />
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm text-gray-600 mb-1">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full border rounded px-3 py-2"
              >
                <option>EUR</option>
                <option>USDT</option>
              </select>
            </div>
            <Input
              label={
                currency === "EUR" ? "Amount (excl. VAT)" : "Amount (USDT)"
              }
              value={amount}
              onChange={setAmount}
              type="number"
            />
          </div>
          {currency === "EUR" ? (
            <div className="flex items-center gap-3">
              <input
                id="vat"
                type="checkbox"
                checked={vatApplicable}
                onChange={(e) => setVatApplicable(e.target.checked)}
              />
              <label htmlFor="vat">VAT applicable</label>
              {vatApplicable && (
                <input
                  type="number"
                  step="0.01"
                  value={vatRate}
                  onChange={(e) => setVatRate(e.target.value)}
                  className="ml-2 border rounded px-2 py-1 w-24"
                />
              )}
            </div>
          ) : (
            <Input
              label="Exchange rate (EUR/USDT)"
              value={exRate}
              onChange={setExRate}
              type="number"
            />
          )}
          <div className="flex gap-3">
            <Input
              label="Start date"
              value={startDate}
              onChange={setStartDate}
              type="date"
            />
            <Input
              label="Expected completion"
              value={expected}
              onChange={setExpected}
              type="date"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-4 py-2 rounded bg-[#FF0000] text-white"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

function AddPayment({ project, onClose, onSubmit, loading }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [method, setMethod] = useState("");
  const [ref, setRef] = useState("");

  const submit = () => {
    onSubmit({
      project_id: project.id,
      payment_amount: Number(amount || 0),
      payment_date: date,
      payment_method: method,
      reference: ref,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white text-black rounded-lg p-6 w-full max-w-lg">
        <h3 className="font-montserrat font-bold text-xl mb-4">
          Add Payment · {project.title}
        </h3>
        <div className="space-y-3">
          <Input
            label="Amount"
            value={amount}
            onChange={setAmount}
            type="number"
          />
          <div className="flex gap-3">
            <Input label="Date" value={date} onChange={setDate} type="date" />
            <Input label="Method" value={method} onChange={setMethod} />
          </div>
          <Input label="Reference" value={ref} onChange={setRef} />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200">
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={loading}
            className="px-4 py-2 rounded bg-[#FF0000] text-white"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }) {
  return (
    <div className="flex-1">
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
}
