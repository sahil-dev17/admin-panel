import React, { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------ DATA ------------------ */
const kpi = [
  { label: "Total Users", value: 1240, sub: "+12.4% vs last month", pill: "↑ 12.4%", progress: 72 },
  { label: "Revenue", value: 24500, sub: "+8.1% vs last month", pill: "↑ 8.1%", progress: 64, money: true },
  { label: "New Orders", value: 320, sub: "+5.6% vs last week", pill: "↑ 5.6%", progress: 58 },
  { label: "Pending Tickets", value: 12, sub: "−2 since yesterday", pill: "↓ 2", progress: 32 },
];

const chartData = [
  { name: "Mon", revenue: 1800 },
  { name: "Tue", revenue: 2200 },
  { name: "Wed", revenue: 2000 },
  { name: "Thu", revenue: 2600 },
  { name: "Fri", revenue: 3100 },
  { name: "Sat", revenue: 2800 },
  { name: "Sun", revenue: 3400 },
];

/* ------------------ UI HELPERS ------------------ */
const Card = ({ children, className = "" }) => (
  <div
    className={[
      "relative rounded-2xl bg-white/70 backdrop-blur",
      "shadow-[0_10px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60",
      "overflow-hidden",
      className,
    ].join(" ")}
  >
    {/* subtle top glow */}
    <div className="pointer-events-none absolute -top-24 left-1/2 h-40 w-96 -translate-x-1/2 rounded-full bg-slate-900/5 blur-3xl" />
    {children}
  </div>
);

const Pill = ({ children, down }) => (
  <span
    className={[
      "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-extrabold ring-1",
      down
        ? "bg-rose-50 text-rose-700 ring-rose-200"
        : "bg-emerald-50 text-emerald-700 ring-emerald-200",
    ].join(" ")}
  >
    {children}
  </span>
);

const fmtMoney = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(n || 0));

const fmtCompact = (n) =>
  new Intl.NumberFormat("en-US", { notation: "compact" }).format(Number(n || 0));

/* ------------------ COUNT UP (no lib) ------------------ */
function useCountUp(to, durationMs = 700) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const from = 0;
    const diff = to - from;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(from + diff * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, durationMs]);

  return val;
}

/* ------------------ TOOLTIP ------------------ */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const val = payload[0].value ?? 0;

  return (
    <div className="rounded-xl bg-white/90 backdrop-blur shadow-lg ring-1 ring-slate-200 px-3 py-2">
      <p className="text-xs font-semibold text-slate-600">{label}</p>
      <p className="text-sm font-extrabold text-slate-900">{fmtMoney(val)}</p>
    </div>
  );
};

/* ------------------ MOTION PRESETS ------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const hoverLift = {
  whileHover: { y: -4, transition: { duration: 0.18 } },
  whileTap: { scale: 0.99 },
};

const SkeletonBar = () => (
  <div className="mt-5 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
    <motion.div
      initial={{ x: "-50%" }}
      animate={{ x: "100%" }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      className="h-full w-1/2 bg-gradient-to-r from-transparent via-slate-300/40 to-transparent"
    />
  </div>
);

/* ------------------ KPI CARD ------------------ */
function KpiCard({ item, index }) {
  const isDown = item.pill.includes("↓") || item.sub.includes("−");
  const counted = useCountUp(item.value, 800);

  const valueText = item.money ? fmtMoney(counted) : fmtCompact(counted);

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      initial="hidden"
      animate="show"
      {...hoverLift}
      className="h-full"
    >
      <Card className="p-6 group">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500">{item.label}</p>

            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.12 + index * 0.04 }}
              className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight"
            >
              {valueText}
            </motion.h3>

            <p className="text-xs text-slate-500 mt-2">{item.sub}</p>
          </div>

          <Pill down={isDown}>{item.pill}</Pill>
        </div>

        {/* progress */}
        <div className="mt-5 h-2 w-full rounded-full bg-slate-100 overflow-hidden ring-1 ring-slate-200/60">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${item.progress}%` }}
            transition={{ duration: 0.9, delay: 0.12 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="h-full rounded-full bg-slate-900/80"
          />
        </div>

        {/* hover shine */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-slate-900/5 blur-2xl" />
        </div>
      </Card>
    </motion.div>
  );
}

export default function Dashboard() {
  const weeklyTotal = useMemo(
    () => chartData.reduce((sum, d) => sum + (d.revenue || 0), 0),
    []
  );
  const bestDay = useMemo(() => {
    const max = chartData.reduce((a, b) => (a.revenue > b.revenue ? a : b));
    return max.name;
  }, []);

  const avg = Math.round(weeklyTotal / chartData.length);

  return (
    <div className="space-y-6">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/3 h-80 w-80 rounded-full bg-slate-900/5 blur-3xl" />
        <div className="absolute top-40 right-1/4 h-96 w-96 rounded-full bg-slate-900/5 blur-3xl" />
      </div>

      {/* Header */}
      <motion.div
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate="show"
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-3"
      >
        <div>
          <p className="text-sm text-slate-500">Overview</p>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Dashboard
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Key metrics and revenue trend for the last 7 days.
          </p>
        </div>

        <div className="flex gap-3">
          <motion.button
            {...hoverLift}
            className="px-4 py-2 rounded-xl bg-white/70 backdrop-blur ring-1 ring-slate-200 shadow-sm hover:bg-white text-sm font-semibold"
          >
            Export
          </motion.button>
          <motion.button
            {...hoverLift}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white shadow-sm hover:bg-slate-800 text-sm font-semibold"
          >
            Create Report
          </motion.button>
        </div>
      </motion.div>

      {/* KPI Cards (top row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {kpi.map((item, idx) => (
          <KpiCard key={item.label} item={item} index={idx + 1} />
        ))}
      </div>

      {/* Chart */}
      <motion.div variants={fadeUp} custom={6} initial="hidden" animate="show">
        <Card className="p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-slate-500">Revenue Trend</p>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Last 7 days
              </h3>
            </div>

            <div className="flex gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200/60">
                Updated just now
              </span>
            </div>
          </div>

          <div className="mt-4 h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0f172a" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={36} />
                <Tooltip content={<CustomTooltip />} />

                {/* animated draw */}
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0f172a"
                  strokeWidth={2}
                  fill="url(#revGradient)"
                  isAnimationActive
                  animationDuration={900}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Summary */}
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <motion.div {...hoverLift} className="rounded-xl bg-slate-50/80 p-4 ring-1 ring-slate-200/70">
              <p className="text-xs text-slate-500">Weekly Total</p>
              <p className="text-lg font-extrabold text-slate-900 mt-1">
                {fmtMoney(weeklyTotal)}
              </p>
            </motion.div>

            <motion.div {...hoverLift} className="rounded-xl bg-slate-50/80 p-4 ring-1 ring-slate-200/70">
              <p className="text-xs text-slate-500">Best Day</p>
              <p className="text-lg font-extrabold text-slate-900 mt-1">{bestDay}</p>
            </motion.div>

            <motion.div {...hoverLift} className="rounded-xl bg-slate-50/80 p-4 ring-1 ring-slate-200/70">
              <p className="text-xs text-slate-500">Avg / Day</p>
              <p className="text-lg font-extrabold text-slate-900 mt-1">
                {fmtMoney(avg)}
              </p>
            </motion.div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
