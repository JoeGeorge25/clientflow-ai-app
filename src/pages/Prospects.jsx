import { useState, useEffect } from "react";

export default function Prospects() {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    business_name: "",
    contact_name: "",
    email: "",
    phone: "",
    city: "",
    niche: "",
  });

  useEffect(() => {
    fetchProspects();
  }, []);

  const fetchProspects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/server/prospects.js");
      if (!response.ok) {
        throw new Error("Failed to fetch prospects");
      }
      const data = await response.json();
      setProspects(data.prospects || []);
    } catch (err) {
      console.error("Prospects fetch error:", err);
      setError("Failed to load prospects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.business_name.trim()) {
      alert("Business name is required");
      return;
    }

    try {
      setSubmitting(true);
      const response = await fetch("/server/prospects.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create prospect");
      }

      setFormData({
        business_name: "",
        contact_name: "",
        email: "",
        phone: "",
        city: "",
        niche: "",
      });

      await fetchProspects();
    } catch (err) {
      console.error("Prospects create error:", err);
      alert("Failed to add prospect. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch("/server/prospects.js", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const data = await response.json();
      setProspects((prev) =>
        prev.map((p) => (p.id === id ? data.prospect : p))
      );
    } catch (err) {
      console.error("Prospects update error:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-slate-600 mt-1">
          Manage local businesses in your pipeline.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Add New Prospect
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={handleInputChange}
              placeholder="Business Name *"
              required
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <input
              type="text"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleInputChange}
              placeholder="Contact Name"
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="City"
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            <input
              type="text"
              name="niche"
              value={formData.niche}
              onChange={handleInputChange}
              placeholder="Industry"
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {submitting ? "Adding..." : "Add Prospect"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="text-lg font-semibold text-slate-900">
            Prospect List
          </h3>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              Loading prospects...
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600 text-sm">{error}</div>
          ) : prospects.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-sm">
              No prospects yet. Add your first prospect above.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm font-semibold text-slate-700 border-b border-slate-200">
                    <th className="pb-3">Business</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3">Location</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {prospects.map((prospect) => (
                    <tr key={prospect.id} className="text-sm">
                      <td className="py-3">
                        <div className="font-medium text-slate-900">
                          {prospect.business_name}
                        </div>
                        {prospect.niche && (
                          <div className="text-xs text-slate-500">
                            {prospect.niche}
                          </div>
                        )}
                      </td>
                      <td className="py-3">
                        <div className="text-slate-900">
                          {prospect.contact_name || "—"}
                        </div>
                        {prospect.email && (
                          <div className="text-xs text-slate-500">
                            {prospect.email}
                          </div>
                        )}
                      </td>
                      <td className="py-3 text-slate-600">
                        {prospect.city || "—"}
                      </td>
                      <td className="py-3">
                        <select
                          value={prospect.status}
                          onChange={(e) =>
                            handleStatusChange(prospect.id, e.target.value)
                          }
                          className="px-3 py-1 border border-slate-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="proposal">Proposal</option>
                          <option value="won">Won</option>
                          <option value="lost">Lost</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
