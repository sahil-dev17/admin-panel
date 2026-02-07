import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

/**
 * Settings Page (modern + catchy)
 * ✅ glass cards + gradients
 * ✅ hover lift + sheen
 * ✅ toggles + segmented tabs
 * ✅ save button animation
 *
 * Install: npm i framer-motion
 */

const fadeUp = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Card = ({ children, className = "" }) => (
  <motion.div
    whileHover={{
      y: -6,
      scale: 1.01,
      transition: { type: "spring", stiffness: 260, damping: 18 },
    }}
    whileTap={{ scale: 0.99 }}
    className={[
      "group relative overflow-hidden rounded-3xl",
      "bg-white/70 backdrop-blur-xl",
      "ring-1 ring-slate-200/60",
      "shadow-[0_18px_45px_rgba(15,23,42,0.12)]",
      "hover:shadow-[0_28px_70px_rgba(15,23,42,0.18)] hover:ring-slate-300/80",
      className,
    ].join(" ")}
  >
    {/* top highlight */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent opacity-70" />
    {/* moving sheen */}
    <div className="pointer-events-none absolute -inset-y-20 -left-40 w-52 rotate-12 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 group-hover:opacity-100 group-hover:left-[120%] transition-all duration-700" />
    {/* soft blob */}
    <div className="pointer-events-none absolute -top-20 -right-20 h-44 w-44 rounded-full bg-slate-900/5 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative">{children}</div>
  </motion.div>
);

const Toggle = ({ label, desc, checked, onChange }) => (
  <div className="flex items-start justify-between gap-4">
    <div>
      <p className="font-semibold text-slate-900">{label}</p>
      {desc ? <p className="text-sm text-slate-500 mt-1">{desc}</p> : null}
    </div>

    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={[
        "relative inline-flex h-7 w-12 items-center rounded-full ring-1 transition",
        checked
          ? "bg-slate-900 ring-slate-900/20"
          : "bg-slate-200 ring-slate-300/60",
      ].join(" ")}
      aria-pressed={checked}
    >
      <span
        className={[
          "inline-block h-6 w-6 transform rounded-full bg-white shadow-sm transition",
          checked ? "translate-x-5" : "translate-x-0.5",
        ].join(" ")}
      />
    </button>
  </div>
);

const Segmented = ({ value, onChange, options = [] }) => (
  <div className="inline-flex rounded-2xl bg-slate-100 p-1 ring-1 ring-slate-200/70">
    {options.map((opt) => {
      const active = value === opt.value;
      return (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={[
            "relative px-4 py-2 text-sm font-semibold rounded-xl transition",
            active ? "text-white" : "text-slate-700 hover:text-slate-900",
          ].join(" ")}
          type="button"
        >
          {active && (
            <motion.span
              layoutId="segmented-pill"
              className="absolute inset-0 rounded-xl bg-slate-900"
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            />
          )}
          <span className="relative z-10">{opt.label}</span>
        </button>
      );
    })}
  </div>
);

const Field = ({ label, hint, ...props }) => (
  <label className="block">
    <span className="text-sm font-semibold text-slate-900">{label}</span>
    {hint ? <span className="block text-xs text-slate-500 mt-1">{hint}</span> : null}
    <input
      {...props}
      className={[
        "mt-2 w-full rounded-2xl bg-white/80 px-4 py-3",
        "ring-1 ring-slate-200/70 shadow-sm",
        "placeholder:text-slate-400",
        "focus:outline-none focus:ring-2 focus:ring-slate-900/20",
      ].join(" ")}
    />
  </label>
);

export default function Settings() {
  const [tab, setTab] = useState("general");

  // toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [publicProfile, setPublicProfile] = useState(false);

  // form
  const [companyName, setCompanyName] = useState("Lotto247 Admin");
  const [supportEmail, setSupportEmail] = useState("support@yourapp.com");

  const changed = useMemo(() => true, [emailAlerts, smsAlerts, twoFA, publicProfile, companyName, supportEmail, tab]);

  return (
    <div className="space-y-6">
      {/* background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-slate-900/5 blur-3xl" />
        <div className="absolute top-44 right-1/4 h-96 w-96 rounded-full bg-slate-900/5 blur-3xl" />
      </div>

      {/* header */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-slate-500">Preferences</p>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Settings</h2>
          <p className="text-sm text-slate-500 mt-1">
            Configure your workspace, notifications, and security.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Segmented
            value={tab}
            onChange={setTab}
            options={[
              { label: "General", value: "general" },
              { label: "Notifications", value: "notify" },
              { label: "Security", value: "security" },
            ]}
          />

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className={[
              "ml-0 md:ml-2 px-4 py-2 rounded-2xl text-sm font-semibold",
              "bg-slate-900 text-white shadow-sm hover:bg-slate-800",
              "ring-1 ring-slate-900/10",
            ].join(" ")}
          >
            Save
          </motion.button>
        </div>
      </motion.div>

      {/* content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* left: main */}
        <motion.div variants={fadeUp} custom={1} initial="hidden" animate="show" className="xl:col-span-2 space-y-6">
          {tab === "general" && (
            <Card className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Workspace</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Update workspace identity and support details.
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200/70">
                  Active
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field
                  label="Workspace name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter workspace name"
                />
                <Field
                  label="Support email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  placeholder="Enter support email"
                />
              </div>

              <div className="mt-6">
                <Toggle
                  label="Public profile"
                  desc="Show workspace profile publicly (can be disabled anytime)."
                  checked={publicProfile}
                  onChange={setPublicProfile}
                />
              </div>
            </Card>
          )}

          {tab === "notify" && (
            <Card className="p-6">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Notifications</h3>
              <p className="text-sm text-slate-500 mt-1">
                Choose how you want to receive updates.
              </p>

              <div className="mt-6 space-y-6">
                <Toggle
                  label="Email alerts"
                  desc="Get updates about revenue, orders, and important changes."
                  checked={emailAlerts}
                  onChange={setEmailAlerts}
                />
                <div className="h-px bg-slate-200/70" />
                <Toggle
                  label="SMS alerts"
                  desc="Receive critical alerts on phone (recommended for admins)."
                  checked={smsAlerts}
                  onChange={setSmsAlerts}
                />
              </div>
            </Card>
          )}

          {tab === "security" && (
            <Card className="p-6">
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">Security</h3>
              <p className="text-sm text-slate-500 mt-1">
                Keep your account safe with strong authentication.
              </p>

              <div className="mt-6 space-y-6">
                <Toggle
                  label="Two-factor authentication (2FA)"
                  desc="Adds an extra layer of security during login."
                  checked={twoFA}
                  onChange={setTwoFA}
                />
                <div className="h-px bg-slate-200/70" />

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">Reset password</p>
                    <p className="text-sm text-slate-500 mt-1">
                      Send a password reset link to your email.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className="px-4 py-2 rounded-2xl bg-white/80 ring-1 ring-slate-200 shadow-sm hover:bg-white text-sm font-semibold"
                  >
                    Send Link
                  </motion.button>
                </div>
              </div>
            </Card>
          )}
        </motion.div>

        {/* right: sidebar */}
        <motion.div variants={fadeUp} custom={2} initial="hidden" animate="show" className="space-y-6">
     

          <Card className="p-6">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">Status</h3>
            <p className="text-sm text-slate-500 mt-1">
              Your configuration state.
            </p>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50/80 p-4 ring-1 ring-slate-200/70">
                <p className="text-sm font-semibold text-slate-700">Unsaved changes</p>
                <span className="text-sm font-extrabold text-slate-900">
                  {changed ? "Yes" : "No"}
                </span>
              </div>

              <div className="rounded-2xl bg-slate-50/80 p-4 ring-1 ring-slate-200/70">
                <p className="text-xs text-slate-500">Tip</p>
                <p className="text-sm font-semibold text-slate-800 mt-1">
                  Turn on 2FA + Email alerts for safer, faster operations.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
