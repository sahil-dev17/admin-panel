import React, { useMemo, useState } from "react";

/**
 * Modern Users Table (Tailwind-only)
 * ✅ Glassy header + better spacing
 * ✅ Sticky table header
 * ✅ Avatar initials
 * ✅ Status pills + subtle glow
 * ✅ Row hover + micro-interactions
 * ✅ Smooth “filter” animation
 * ✅ Lightweight (no extra libs)
 */

export default function Users() {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Editor",
      status: "Pending",
    },
    {
      id: 3,
      name: "Alex Brown",
      email: "alex@example.com",
      role: "User",
      status: "Blocked",
    },
  ];

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [search]);

  const initials = (name = "") =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0].toUpperCase())
      .join("");

  const statusPill = (status) => {
    switch (status) {
      case "Active":
        return "bg-emerald-50 text-emerald-700 ring-emerald-200";
      case "Pending":
        return "bg-amber-50 text-amber-700 ring-amber-200";
      case "Blocked":
      default:
        return "bg-rose-50 text-rose-700 ring-rose-200";
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* subtle background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.10),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(14,165,233,0.08),transparent_55%)]" />

      {/* Header */}
      <div className="relative border-b border-slate-200/70 bg-white/60 px-6 py-5 backdrop-blur">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
              Users
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Manage accounts, roles, and access.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="group relative w-full sm:w-[320px]">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
                  className="opacity-80"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </span>

              <input
                type="text"
                placeholder="Search by name or email…"
                className="w-full rounded-xl border border-slate-200 bg-white px-10 py-2.5 text-sm text-slate-900 outline-none transition
                           placeholder:text-slate-400 focus:border-violet-300 focus:ring-4 focus:ring-violet-100"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {!!search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-slate-500
                             hover:bg-slate-100 active:scale-95 transition"
                  aria-label="Clear search"
                >
                  Clear
                </button>
              )}
            </div>

            <button
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white
                         shadow-sm transition active:scale-[0.98] hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-200"
            >
              <span className="text-base leading-none">+</span>
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="relative overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200">
            <tr className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="[&>tr:last-child]:border-b-0">
            {filteredUsers.map((user, idx) => (
              <tr
                key={user.id}
                className="border-b border-slate-200/70 bg-white transition
                           hover:bg-slate-50/70"
                style={{
                  animation: "rowIn 420ms ease-out both",
                  animationDelay: `${idx * 55}ms`,
                }}
              >
                {/* User cell */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-10 w-10 place-items-center rounded-xl ring-1 ring-slate-200 bg-white shadow-sm"
                      title={user.name}
                    >
                      <span className="text-sm font-semibold text-slate-800">
                        {initials(user.name)}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {user.name}
                      </p>
                      <p className="truncate text-sm text-slate-500">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className="inline-flex items-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusPill(
                      user.status
                    )}`}
                  >
                    <span className="relative flex h-2 w-2">
                      <span
                        className="absolute inline-flex h-full w-full rounded-full opacity-60"
                        style={{
                          background:
                            user.status === "Active"
                              ? "rgba(16,185,129,0.9)"
                              : user.status === "Pending"
                              ? "rgba(245,158,11,0.9)"
                              : "rgba(244,63,94,0.9)",
                          animation: "pulseSoft 1.8s ease-in-out infinite",
                        }}
                      />
                      <span
                        className="relative inline-flex h-2 w-2 rounded-full"
                        style={{
                          background:
                            user.status === "Active"
                              ? "rgb(16,185,129)"
                              : user.status === "Pending"
                              ? "rgb(245,158,11)"
                              : "rgb(244,63,94)",
                        }}
                      />
                    </span>
                    {user.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    <button
                      className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700
                                 shadow-sm transition hover:bg-slate-50 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-slate-100"
                    >
                      Edit
                    </button>
                    <button
                      className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700
                                 transition hover:bg-rose-100 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-rose-100"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="4" className="px-6 py-16">
                  <div className="mx-auto flex max-w-md flex-col items-center text-center">
                    <div className="mb-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-slate-500"
                      >
                        <path d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                        <path d="M17 22a5 5 0 0 0-10 0" />
                        <path d="M21 12h-6" />
                        <path d="M18 9v6" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-slate-900">
                      No users found
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Try a different keyword or clear the search.
                    </p>
                    <button
                      onClick={() => setSearch("")}
                      className="mt-4 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white
                                 transition hover:bg-slate-800 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-slate-200"
                    >
                      Clear search
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer mini stats */}
      <div className="relative flex flex-col gap-2 border-t border-slate-200/70 bg-white/60 px-6 py-4 text-sm text-slate-600 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
        <p>
          Showing{" "}
          <span className="font-semibold text-slate-900">
            {filteredUsers.length}
          </span>{" "}
          of <span className="font-semibold text-slate-900">{users.length}</span>{" "}
          users
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Active
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Pending
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            Blocked
          </span>
        </div>
      </div>

      {/* animations */}
      <style>{`
        @keyframes rowIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulseSoft {
          0%, 100% { transform: scale(1); opacity: .55; }
          50%      { transform: scale(1.9); opacity: .18; }
        }
      `}</style>
    </div>
  );
}
