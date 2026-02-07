import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiUsers, FiBarChart2, FiSettings, FiChevronLeft } from "react-icons/fi";

const Item = memo(function Item({ to, icon: Icon, label, collapsed }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "w-full group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium",
          "transition-colors duration-200",
          isActive
            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow"
            : "text-slate-700 hover:bg-slate-100",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={[
              "grid h-9 w-9 place-items-center rounded-lg shrink-0",
              isActive ? "bg-white/15" : "bg-slate-100 group-hover:bg-slate-200",
              "transition-colors duration-200",
            ].join(" ")}
          >
            <Icon className={isActive ? "text-white" : "text-slate-700"} size={18} />
          </span>

          {/* ✅ GPU-friendly: opacity/transform (no width auto) */}
          <span
            className={[
              "min-w-0 whitespace-nowrap overflow-hidden",
              "transition-all duration-200 ease-out",
              collapsed
                ? "opacity-0 -translate-x-2 scale-95 pointer-events-none"
                : "opacity-100 translate-x-0 scale-100",
            ].join(" ")}
          >
            {label}
          </span>
        </>
      )}
    </NavLink>
  );
});

export default memo(function Sidebar({ collapsed, toggleCollapsed }) {
  return (
    <aside
      className={[
        "sticky top-0 h-dvh shrink-0 bg-white border-r border-slate-200 shadow-xl overflow-hidden",
        "transition-[width] duration-300 ease-in-out will-change-[width]",
        collapsed ? "w-20" : "w-72",
      ].join(" ")}
    >
      <div className="flex items-center justify-between px-4 py-5">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 shadow grid place-items-center text-white font-extrabold shrink-0">
            AP
          </div>

          <div
            className={[
              "min-w-0 transition-all duration-200",
              collapsed
                ? "opacity-0 -translate-x-2 scale-95 pointer-events-none"
                : "opacity-100 translate-x-0 scale-100",
            ].join(" ")}
          >
            <p className="truncate text-lg font-extrabold text-slate-900 leading-none">
              AdminPanel
            </p>
            <p className="text-xs text-slate-500">Control Center</p>
          </div>
        </div>

        <button
          onClick={toggleCollapsed}
          className="grid place-items-center rounded-xl border border-slate-200 bg-white h-10 w-10 hover:bg-slate-50 transition active:scale-[0.98]"
          aria-label="Toggle sidebar"
        >
          <FiChevronLeft
            className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}
            size={18}
          />
        </button>
      </div>

      <nav className="px-3 mt-2 space-y-2">
        <Item to="/admin/dashboard" icon={FiHome} label="Dashboard" collapsed={collapsed} />
        <Item to="/admin/users" icon={FiUsers} label="Users" collapsed={collapsed} />
        <Item to="/admin/analytics" icon={FiBarChart2} label="Analytics" collapsed={collapsed} />
        <Item to="/admin/settings" icon={FiSettings} label="Settings" collapsed={collapsed} />
      </nav>
    </aside>
  );
});
