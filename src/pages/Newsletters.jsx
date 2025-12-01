import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Newsletters() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const [templates, setTemplates] = useState([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const [templateError, setTemplateError] = useState(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [savingTemplate, setSavingTemplate] = useState(false);

  const [formData, setFormData] = useState({
    campaign_name: "",
    subject_line: "",
    send_datetime: "",
    audience_segment: "",
    status: "draft",
    preview_text: "",
    body_html: "",
    body_text: "",
    template_id: null,
  });

  useEffect(() => {
    fetchCampaigns();
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setIsLoadingTemplates(true);
      setTemplateError(null);
      const { data, error } = await supabase
        .from("newsletter_templates")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (err) {
      console.error("[Templates] Fetch error:", err);
      setTemplateError("Failed to load templates");
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("newsletter_campaigns")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (err) {
      console.error("[Newsletters] Fetch error:", err);
      setMessage({ type: "error", text: "Failed to load campaigns" });
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
    if (!formData.campaign_name.trim() || !formData.subject_line.trim() || !formData.send_datetime) {
      setMessage({ type: "error", text: "Please fill in all required fields" });
      return;
    }

    try {
      setSubmitting(true);
      setMessage(null);

      const { error } = await supabase
        .from("newsletter_campaigns")
        .insert([formData]);

      if (error) throw error;

      setFormData({
        campaign_name: "",
        subject_line: "",
        send_datetime: "",
        audience_segment: "",
        status: "draft",
        preview_text: "",
        body_html: "",
        body_text: "",
        template_id: null,
      });

      setShowForm(false);
      setMessage({ type: "success", text: "Campaign created successfully!" });
      await fetchCampaigns();
    } catch (err) {
      console.error("[Newsletters] Create error:", err);
      setMessage({ type: "error", text: "Failed to create campaign" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from("newsletter_campaigns")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setCampaigns((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      setMessage({ type: "success", text: "Status updated successfully!" });
    } catch (err) {
      console.error("[Newsletters] Update error:", err);
      setMessage({ type: "error", text: "Failed to update status" });
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "draft":
        return "bg-slate-100 text-slate-700";
      case "scheduled":
        return "bg-blue-100 text-blue-700";
      case "sent":
        return "bg-green-100 text-green-700";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  const handleUseTemplate = (template) => {
    setFormData((prev) => ({
      ...prev,
      subject_line: template.subject_line,
      preview_text: template.preview_text || "",
      body_html: template.body_html,
      body_text: template.body_text || "",
      template_id: template.id,
    }));
    setShowTemplateModal(false);
    setMessage({
      type: "success",
      text: `Template "${template.name}" applied to campaign`,
    });
    if (!showForm) {
      setShowForm(true);
    }
  };

  const handleSaveAsTemplate = async () => {
    if (!formData.subject_line.trim()) {
      setMessage({
        type: "error",
        text: "Subject line is required to save as template",
      });
      return;
    }

    try {
      setSavingTemplate(true);
      setMessage(null);

      const templateData = {
        name: formData.campaign_name || formData.subject_line,
        subject_line: formData.subject_line,
        preview_text: formData.preview_text,
        body_html: formData.body_html,
        body_text: formData.body_text,
      };

      const { error } = await supabase
        .from("newsletter_templates")
        .insert([templateData]);

      if (error) throw error;

      setMessage({
        type: "success",
        text: "Template saved successfully!",
      });
      await fetchTemplates();
    } catch (err) {
      console.error("[Templates] Save error:", err);
      setMessage({ type: "error", text: "Failed to save template" });
    } finally {
      setSavingTemplate(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-slate-600 mt-1">
          Plan and track your recurring local newsletter issues.
        </p>
      </div>

      {message && (
        <div
          className={`rounded-lg p-4 ${
            message.type === "success"
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            <span className="text-sm font-medium">{message.text}</span>
          </div>
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Create New Campaign
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  name="campaign_name"
                  value={formData.campaign_name}
                  onChange={handleInputChange}
                  placeholder="e.g., March Newsletter"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Subject Line *
                </label>
                <input
                  type="text"
                  name="subject_line"
                  value={formData.subject_line}
                  onChange={handleInputChange}
                  placeholder="e.g., March Events & Special Offers"
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Send Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="send_datetime"
                  value={formData.send_datetime}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="sent">Sent</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Audience Segment
                </label>
                <input
                  type="text"
                  name="audience_segment"
                  value={formData.audience_segment}
                  onChange={handleInputChange}
                  placeholder="e.g., All restaurant clients, Downtown businesses"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Preview Text
                </label>
                <input
                  type="text"
                  name="preview_text"
                  value={formData.preview_text}
                  onChange={handleInputChange}
                  placeholder="e.g., Check out this month's featured content"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email Content (HTML)
                </label>
                <textarea
                  name="body_html"
                  value={formData.body_html}
                  onChange={handleInputChange}
                  placeholder="Enter your email HTML content..."
                  rows={6}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Plain Text Version
                </label>
                <textarea
                  name="body_text"
                  value={formData.body_text}
                  onChange={handleInputChange}
                  placeholder="Enter plain text version..."
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {submitting ? "Creating..." : "Create Campaign"}
              </button>
              <button
                type="button"
                onClick={handleSaveAsTemplate}
                disabled={savingTemplate}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {savingTemplate ? "Saving..." : "Save as Template"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setFormData({
                    campaign_name: "",
                    subject_line: "",
                    send_datetime: "",
                    audience_segment: "",
                    status: "draft",
                    preview_text: "",
                    body_html: "",
                    body_text: "",
                    template_id: null,
                  });
                }}
                className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors font-medium text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Newsletter Campaigns
          </h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            {showForm ? "Hide Form" : "Create Campaign"}
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-slate-500 text-sm">Loading campaigns...</div>
          </div>
        ) : campaigns.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-slate-900 mb-2">
              No campaigns yet
            </h4>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              Create your first newsletter campaign to start sending engaging
              content to your local business clients.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm font-semibold text-slate-700 border-b border-slate-200">
                  <th className="pb-3">Campaign</th>
                  <th className="pb-3">Send Date</th>
                  <th className="pb-3">Audience</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="text-sm">
                    <td className="py-3">
                      <div className="font-medium text-slate-900">
                        {campaign.campaign_name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {campaign.subject_line}
                      </div>
                    </td>
                    <td className="py-3 text-slate-600">
                      {formatDateTime(campaign.send_datetime)}
                    </td>
                    <td className="py-3 text-slate-600">
                      {campaign.audience_segment || "—"}
                    </td>
                    <td className="py-3">
                      <select
                        value={campaign.status}
                        onChange={(e) =>
                          handleStatusChange(campaign.id, e.target.value)
                        }
                        className={`px-3 py-1 rounded-full text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusBadgeColor(
                          campaign.status
                        )}`}
                      >
                        <option value="draft">Draft</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="sent">Sent</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h4 className="font-semibold text-slate-900 mb-2">Template Library</h4>
          <p className="text-sm text-slate-600 mb-4">
            Pre-built newsletter templates for local businesses
          </p>
          <button
            onClick={() => setShowTemplateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            Browse Templates
          </button>
          {templates.length > 0 && (
            <p className="text-xs text-slate-500 mt-2">
              {templates.length} template{templates.length !== 1 ? "s" : ""}{" "}
              available
            </p>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h4 className="font-semibold text-slate-900 mb-2">Schedule Manager</h4>
          <p className="text-sm text-slate-600 mb-4">
            Plan and automate your newsletter sending schedule
          </p>
          <span className="text-xs text-slate-500">Coming soon</span>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h4 className="font-semibold text-slate-900 mb-2">Analytics</h4>
          <p className="text-sm text-slate-600 mb-4">
            Track opens, clicks, and engagement metrics
          </p>
          <span className="text-xs text-slate-500">Coming soon</span>
        </div>
      </div>

      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-slate-900">
                Template Library
              </h3>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {isLoadingTemplates ? (
                <div className="text-center py-12">
                  <div className="text-slate-500 text-sm">
                    Loading templates...
                  </div>
                </div>
              ) : templateError ? (
                <div className="text-center py-12">
                  <div className="text-red-600 text-sm">{templateError}</div>
                </div>
              ) : templates.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-slate-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">
                    No templates yet
                  </h4>
                  <p className="text-slate-600 text-sm max-w-md mx-auto">
                    Create your first template by saving a campaign as a
                    template using the "Save as Template" button.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className="border border-slate-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">
                          {template.name}
                        </h4>
                        {template.industry && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {template.industry}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                        <strong>Subject:</strong> {template.subject_line}
                      </p>
                      {template.preview_text && (
                        <p className="text-xs text-slate-500 mb-3 line-clamp-2">
                          {template.preview_text}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400">
                          Created {formatDate(template.created_at)}
                        </span>
                        <button
                          onClick={() => handleUseTemplate(template)}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-xs"
                        >
                          Use Template
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
