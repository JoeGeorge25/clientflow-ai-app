export default function Dashboard() {
  return (
    <div>
      <h1 style={{ fontSize: "22px", marginBottom: "8px" }}>
        ClientFlow AI Dashboard
      </h1>
      <p style={{ color: "#9ca3af", marginBottom: "16px" }}>
        Welcome. Use Architect AI to design and run your local newsletter
        agency powered by Luther's model.
      </p>

      <ul style={{ fontSize: "14px", color: "#d1d5db", lineHeight: 1.6 }}>
        <li>
          👉 <b>Architect AI</b> – chat with your in-app system architect.
        </li>
        <li>
          👉 <b>Prospects</b> – load/scrape local leads and prepare outreach.
        </li>
        <li>
          👉 <b>Newsletters</b> – generate 52-week newsletter packs.
        </li>
        <li>
          👉 <b>Systems Setup</b> – configure VAs, n8n flows, and automations.
        </li>
      </ul>
    </div>
  );
}
