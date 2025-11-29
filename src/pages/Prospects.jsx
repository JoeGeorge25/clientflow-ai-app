import { useEffect, useState } from "react";

export default function Prospects() {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    business_name: "",
    email: "",
    phone: "",
    niche: "",
    city: "",
    state: "",
    website: "",
  });

  async function loadProspects() {
    setLoading(true);
    const res = await fetch("/server/prospects.js");
    const data = await res.json();
    setProspects(data.prospects || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProspects();
  }, []);

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.business_name.trim()) return;

    await fetch("/server/prospects.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      business_name: "",
      email: "",
      phone: "",
      niche: "",
      city: "",
      state: "",
      website: "",
    });
    loadProspects();
  }

  return (
    <div>
      <h1 style={{ fontSize: "20px", marginBottom: "8px" }}>Prospects</h1>
      <p style={{ color: "#9ca3af", marginBottom: "16px" }}>
        Capture and track local businesses for your newsletter offer. Later
        we'll connect this to n8n scrapers and bulk import.
      </p>

      <form
        onSubmit={onSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "8px",
          marginBottom: "20px",
          background: "#020617",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #1f2937",
        }}
      >
        <input
          name="business_name"
          placeholder="Business name *"
          value={form.business_name}
          onChange={onChange}
          style={inputStyle}
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          style={inputStyle}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={onChange}
          style={inputStyle}
        />
        <input
          name="niche"
          placeholder="Niche (e.g. dentist)"
          value={form.niche}
          onChange={onChange}
          style={inputStyle}
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={onChange}
          style={inputStyle}
        />
        <input
          name="state"
          placeholder="State/Province"
          value={form.state}
          onChange={onChange}
          style={inputStyle}
        />
        <input
          name="website"
          placeholder="Website"
          value={form.website}
          onChange={onChange}
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            padding: "10px 16px",
            borderRadius: "6px",
            border: "none",
            background: "#4f46e5",
            color: "white",
            fontWeight: 500,
            marginTop: "4px",
          }}
        >
          Add Prospect
        </button>
      </form>

      {loading ? (
        <p style={{ color: "#9ca3af" }}>Loading prospects…</p>
      ) : prospects.length === 0 ? (
        <p style={{ color: "#9ca3af" }}>
          No prospects yet. Add a few businesses to get started.
        </p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "13px",
          }}
        >
          <thead>
            <tr style={{ textAlign: "left", color: "#9ca3af" }}>
              <th style={thStyle}>Business</th>
              <th style={thStyle}>Contact</th>
              <th style={thStyle}>Niche</th>
              <th style={thStyle}>Location</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {prospects.map((p) => (
              <tr key={p.id} style={{ borderTop: "1px solid #1f2937" }}>
                <td style={tdStyle}>{p.business_name}</td>
                <td style={tdStyle}>
                  {p.email || p.phone ? (
                    <>
                      {p.email && <div>{p.email}</div>}
                      {p.phone && <div>{p.phone}</div>}
                    </>
                  ) : (
                    <span style={{ color: "#6b7280" }}>—</span>
                  )}
                </td>
                <td style={tdStyle}>{p.niche || "—"}</td>
                <td style={tdStyle}>
                  {p.city || p.state ? `${p.city || ""} ${p.state || ""}` : "—"}
                </td>
                <td style={tdStyle}>{p.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const inputStyle = {
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #374151",
  background: "#020617",
  color: "#e5e7eb",
  fontSize: "13px",
};

const thStyle = { padding: "8px 6px" };
const tdStyle = { padding: "8px 6px", color: "#e5e7eb" };
