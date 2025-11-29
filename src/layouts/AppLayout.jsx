import { NavLink } from "react-router-dom";

const sidebarLinkStyle = ({ isActive }) => ({
  display: "block",
  padding: "10px 14px",
  borderRadius: "6px",
  marginBottom: "6px",
  textDecoration: "none",
  fontSize: "14px",
  color: isActive ? "#ffffff" : "#d1d5db",
  background: isActive ? "#4f46e5" : "transparent",
});

export default function AppLayout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        background: "#020617",
        color: "#e5e7eb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "230px",
          padding: "16px",
          borderRight: "1px solid #1f2933",
          background: "#020617",
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
          height: "100vh",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            Architect AI
          </div>
          <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
            ClientFlow AI Control Hub
          </div>
        </div>

        <nav>
          <div style={{ fontSize: "11px", textTransform: "uppercase", color: "#6b7280", marginBottom: "6px" }}>
            Main
          </div>
          <NavLink to="/" style={sidebarLinkStyle} end>
            Dashboard
          </NavLink>
          <NavLink to="/chat" style={sidebarLinkStyle}>
            Architect AI
          </NavLink>

          <div
            style={{
              fontSize: "11px",
              textTransform: "uppercase",
              color: "#6b7280",
              margin: "14px 0 6px",
            }}
          >
            Workflows
          </div>
          <NavLink to="/prospects" style={sidebarLinkStyle}>
            Prospects
          </NavLink>
          <NavLink to="/newsletters" style={sidebarLinkStyle}>
            Newsletters
          </NavLink>
          <NavLink to="/systems" style={sidebarLinkStyle}>
            Systems Setup
          </NavLink>
        </nav>

        <div
          style={{
            marginTop: "auto",
            fontSize: "11px",
            color: "#6b7280",
            position: "absolute",
            bottom: "16px",
          }}
        >
          v0.1 • Luther model
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          padding: "16px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {children}
      </main>
    </div>
  );
}
