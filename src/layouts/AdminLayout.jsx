import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Sidebar from "../components/Sidebar";

/* ---------------- TOPBAR ---------------- */
const Topbar = memo(function Topbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const titleMap = {
    "/admin/dashboard": "Dashboard",
    "/admin/users": "Users",
    "/admin/analytics": "Analytics",
    "/admin/settings": "Settings",
  };

  const title = titleMap[location.pathname] || "Admin";

  useEffect(() => {
    const onClick = (e) => {
      if (!menuRef.current?.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleLogout = () => {
    console.log("Logout");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <div className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0">
          <h1 className="truncate text-xl font-semibold tracking-tight text-slate-900">
            {title}
          </h1>
          <span className="hidden sm:inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
            Admin Panel
          </span>
        </div>

        <div className="flex items-center gap-3 relative" ref={menuRef}>
          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm
                       transition hover:bg-slate-50 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-slate-100"
            aria-label="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-700"
            >
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            </svg>
          </button>

          <button
            onClick={() => setOpen((s) => !s)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl
                       bg-gradient-to-br from-violet-600 to-indigo-600 text-white font-semibold
                       shadow-sm transition hover:shadow-md active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-violet-100"
          >
            SR
          </button>

          <div
            className={`absolute right-0 top-[52px] w-56 rounded-2xl border border-slate-200 bg-white shadow-lg
                        transition-all duration-200 origin-top-right
                        ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
          >
            <div className="px-4 py-3">
              <p className="text-sm font-semibold text-slate-900">Sahil</p>
              <p className="text-xs text-slate-500 truncate">sahil@example.com</p>
            </div>

            <div className="border-t border-slate-200" />

            <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
              Profile
            </button>
            <button className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50">
              Settings
            </button>

            <div className="border-t border-slate-200" />

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 rounded-b-2xl"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
});

/* ---------------- FOOTER (at bottom + attractive) ---------------- */
function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative mt-auto border-t border-slate-200/70 bg-white/80 backdrop-blur-md"
    >
      {/* subtle glow line */}
      <div className="pointer-events-none absolute inset-x-0 -top-16 h-16 bg-gradient-to-b from-slate-900/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
        <p className="text-slate-600">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-slate-900">AdminPanel</span>. All
          rights reserved.
        </p>

        <div className="flex items-center gap-5">
          <a
            href="#"
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-slate-600 hover:text-slate-900 transition-colors"
          >
            Support
          </a>
        </div>
      </div>
    </motion.footer>
  );
}

/* ---------------- LAYOUT ---------------- */
export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((p) => !p);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar collapsed={collapsed} toggleCollapsed={toggleCollapsed} />

      {/* ✅ make right side column, footer pushes to bottom */}
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />

        {/* ✅ flex-1 ensures content takes remaining height, footer stays bottom */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}
