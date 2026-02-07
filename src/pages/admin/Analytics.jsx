import React, { useMemo } from "react";
// ✅ Install once (if not already):
// npm i recharts

import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

 function Analytics() {
  const kpis = useMemo(
    () => [
      { label: "Revenue", value: "₹ 4,28,900", delta: "+12.4%" },
      { label: "Active Users", value: "8,214", delta: "+6.1%" },
      { label: "Conversion", value: "3.74%", delta: "+0.8%" },
      { label: "Churn", value: "1.12%", delta: "-0.3%" },
    ],
    []
  );

  const revenueTrend = useMemo(
    () => [
      { name: "Jan", revenue: 28, users: 520 },
      { name: "Feb", revenue: 32, users: 610 },
      { name: "Mar", revenue: 30, users: 590 },
      { name: "Apr", revenue: 38, users: 720 },
      { name: "May", revenue: 44, users: 860 },
      { name: "Jun", revenue: 41, users: 810 },
      { name: "Jul", revenue: 48, users: 940 },
    ],
    []
  );

  const channelMix = useMemo(
    () => [
      { name: "Organic", value: 42 },
      { name: "Paid", value: 28 },
      { name: "Referral", value: 18 },
      { name: "Social", value: 12 },
    ],
    []
  );

  const weeklyOrders = useMemo(
    () => [
      { name: "Mon", orders: 120 },
      { name: "Tue", orders: 160 },
      { name: "Wed", orders: 140 },
      { name: "Thu", orders: 210 },
      { name: "Fri", orders: 240 },
      { name: "Sat", orders: 220 },
      { name: "Sun", orders: 180 },
    ],
    []
  );

  // Keep colors minimal & professional
  const PIE = ["#0f172a", "#334155", "#64748b", "#94a3b8"];

  const Card = ({ title, children, right }) => (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between px-5 pt-5">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        {right}
      </div>
      <div className="px-5 pb-5 pt-4">{children}</div>
    </div>
  );

  const KPI = ({ label, value, delta }) => {
    const positive = delta?.trim().startsWith("+");
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className="mt-2 flex items-end justify-between gap-3">
          <p className="text-2xl font-semibold tracking-tight text-slate-900">
            {value}
          </p>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
              positive
                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                : "bg-rose-50 text-rose-700 ring-rose-200"
            }`}
          >
            {delta}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.10),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(14,165,233,0.08),transparent_55%)]" />
        <div className="relative flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Analytics
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Performance overview across revenue, users, and acquisition.
            </p>
          </div>

          <div className="mt-3 flex gap-2 sm:mt-0">
            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition">
              Export
            </button>
            <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 active:scale-[0.98] transition">
              View report
            </button>
          </div>
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <KPI key={k.label} {...k} />
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Trend (big) */}
        <div className="lg:col-span-2">
          <Card
            title="Revenue & Users Trend"
            right={
              <span className="text-xs font-semibold text-slate-500">
                Last 7 months
              </span>
            }
          >
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueTrend} margin={{ left: 8, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tickMargin={8} />
                  <YAxis tickMargin={8} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#0f172a"
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#64748b"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Channel mix (pie) */}
        <Card title="Acquisition Mix" right={<span className="text-xs text-slate-500">%</span>}>
          <div className="h-[320px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={channelMix}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  innerRadius={70}
                  paddingAngle={3}
                >
                  {channelMix.map((_, i) => (
                    <Cell key={i} fill={PIE[i % PIE.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Bar chart */}
      <Card
        title="Weekly Orders"
        right={<span className="text-xs font-semibold text-slate-500">This week</span>}
      >
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyOrders} margin={{ left: 8, right: 8 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tickMargin={8} />
              <YAxis tickMargin={8} />
              <Tooltip />
              <Bar dataKey="orders" fill="#0f172a" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
    
  );
}
export default React.memo(Analytics);
