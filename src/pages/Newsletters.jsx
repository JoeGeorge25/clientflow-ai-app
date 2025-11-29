import AppLayout from "../components/AppLayout";

export default function Newsletters() {
  return (
    <AppLayout>
      <div>
        <h1 style={{ fontSize: "20px", marginBottom: "8px" }}>Newsletters</h1>
        <p style={{ color: "#9ca3af", marginBottom: "16px" }}>
          This module will generate and store 52-week newsletter packs per
          client, plus scheduling and white-label export.
        </p>
        <p style={{ fontSize: "14px" }}>
          Next steps: newsletter templates, client selection, AI generation form,
          and export options (HTML, PDF, GHL email).
        </p>
      </div>
    </AppLayout>
  );
}
