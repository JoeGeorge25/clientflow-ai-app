import { NavLink } from "react-router-dom";

const base =
  "block px-4 py-2 rounded-md text-sm font-medium transition-colors";
const active = "bg-slate-800 text-white";
const inactive = "text-slate-300 hover:bg-slate-700/60";

export default function AppLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-xl font-semibold">ClientFlow AI</h1>
          <p className="text-xs text-slate-400">
            Local Newsletter Agency System
          </p>
        </div>

        <nav className="space-y-2 flex-1">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/architect-ai"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            Architect AI
          </NavLink>
          <NavLink
            to="/prospects"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            Prospects
          </NavLink>
          <NavLink
            to="/newsletters"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            Newsletters
          </NavLink>
          <NavLink
            to="/systems"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            Systems Setup
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 bg-slate-950 p-6 overflow-auto">{children}</main>
    </div>
  );
}
