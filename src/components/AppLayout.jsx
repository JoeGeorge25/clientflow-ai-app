import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/architect-ai": "Architect AI",
  "/prospects": "Prospects",
  "/newsletters": "Newsletters",
  "/systems": "Systems Setup",
};

export default function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const pageTitle = pageTitles[location.pathname] || "ClientFlow AI";

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-white">ClientFlow AI</h1>
            <p className="text-xs text-slate-400 mt-1">
              Local Newsletter Agency System
            </p>
          </div>

          <nav className="space-y-2 flex-1">
            <NavLink
              to="/dashboard"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-slate-800 text-white border-l-4 border-indigo-400 font-semibold"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/architect-ai"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-slate-800 text-white border-l-4 border-indigo-400 font-semibold"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`
              }
            >
              Architect AI
            </NavLink>
            <NavLink
              to="/prospects"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-slate-800 text-white border-l-4 border-indigo-400 font-semibold"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`
              }
            >
              Prospects
            </NavLink>
            <NavLink
              to="/newsletters"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-slate-800 text-white border-l-4 border-indigo-400 font-semibold"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`
              }
            >
              Newsletters
            </NavLink>
            <NavLink
              to="/systems"
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-slate-800 text-white border-l-4 border-indigo-400 font-semibold"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`
              }
            >
              Systems Setup
            </NavLink>
          </nav>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h2 className="text-2xl font-semibold text-slate-900">
              {pageTitle}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm">
              JG
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-5xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
