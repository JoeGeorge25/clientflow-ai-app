import { Link, useLocation } from "wouter";

export default function AppLayout({ children }) {
  const [location] = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/" },
    { name: "Architect AI", path: "/chat" },
    { name: "Prospects", path: "/prospects" },
    { name: "Newsletters", path: "/newsletters" },
    { name: "Systems Setup", path: "/systems" },
  ];

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: "#0f172a",
      color: "#e2e8f0",
      fontFamily: "Inter, sans-serif",
    }}>

      {/* Sidebar */}
      <aside style={{
        width: "220px",
        background: "#1e293b",
        padding: "20px",
        borderRight: "1px solid #334155"
      }}>
        <h2 style={{ marginBottom: "20px", fontSize: "18px", fontWeight: 600 }}>
          ClientFlow AI
        </h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {navItems.map(item => {
            const active = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  style={{
                    padding: "10px 12px",
                    borderRadius: "6px",
                    background: active ? "#334155" : "transparent",
                    color: active ? "#fff" : "#cbd5e1",
                    cursor: "pointer",
                    fontSize: "14px",
                    transition: "0.2s",
                  }}
                >
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: "30px",
        overflowY: "auto"
      }}>
        {children}
      </main>
    </div>
  );
}
