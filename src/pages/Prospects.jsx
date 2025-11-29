import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";

const inputStyle = {
  padding: "8px 10px",
  borderRadius: "6px",
  border: "1px solid #374151",
  background: "#020617",
  color: "#e5e7eb",
  fontSize: "13px",
};

const thStyle = { padding: "8px 6px", textAlign: "left", fontSize: "12px" };
const tdStyle = { padding: "8px 6px", fontSize: "13px", color: "#e5e7eb" };

export default function Prospects() {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    business_name: "",
    contact_name: "",
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
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.business_name.trim()) return;

    setSaving(true);
    await fetch("/server/prospects.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);

    setForm({
      business_name: "",
      contact_name: "",
      email: "",
      phone: "",
      niche: "",
      city: "",
      state: "",
      website: "",
    });

    loadProspects();
  }

  async function updateStatus(id, status) {
    await fetch("/server/prospects.js", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    loadProspects();
  }

  return (
    <AppLayout>
      <div>
        <h1 style={{ fontSize: "20px", marginBottom: "6px" }}>Prospects</h1>
        <p style={{ color: "#9ca3af", marginBottom: "18px", fontSize: "14px" }}>
          Store and manage local businesses for your newsletter offer. This is
          the starting point for building your $50k/month pipeline.
        </p>

        {/* Add Prospect Form */}
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
            name="contact_name"
            placeholder="Contact name"
            value={form.contact_name}
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
            placeholder="State / Province"
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
            disabled={saving}
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
            {saving ? "Saving..." : "Add Prospect"}
          </button>
        </form>

        {/* Prospects Table */}
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
              <tr style={{ borderBottom: "1px solid #1f2937" }}>
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
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 500 }}>{p.business_name}</div>
                    {p.website && (
                      <a
                        href={p.website}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          fontSize: "11px",
                          color: "#60a5fa",
                          textDecoration: "none",
                        }}
                      >
                        {p.website}
                      </a>
                    )}
                  </td>
                  <td style={tdStyle}>
                    {p.contact_name && <div>{p.contact_name}</div>}
                    {p.email && (
                      <div style={{ fontSize: "12px" }}>{p.email}</div>
                    )}
                    {p.phone && (
                      <div style={{ fontSize: "12px" }}>{p.phone}</div>
                    )}
                    {!p.contact_name && !p.email && !p.phone && (
                      <span style={{ color: "#6b7280" }}>—</span>
                    )}
                  </td>
                  <td style={tdStyle}>{p.niche || "—"}</td>
                  <td style={tdStyle}>
                    {p.city || p.state ? `${p.city || ""} ${p.state || ""}` : "—"}
                  </td>
                  <td style={tdStyle}>
                    <select
                      value={p.status || "new"}
                      onChange={(e) => updateStatus(p.id, e.target.value)}
                      style={{
                        ...inputStyle,
                        padding: "4px 8px",
                        fontSize: "12px",
                      }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="client">Client</option>
                      <option value="lost">Lost</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AppLayout>
  );
}
