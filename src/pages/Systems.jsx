import AppLayout from "../components/AppLayout";

export default function Systems() {
  return (
    <AppLayout>
      <div>
        <h1 style={{ fontSize: "20px", marginBottom: "8px" }}>Systems Setup</h1>
        <p style={{ color: "#9ca3af", marginBottom: "16px" }}>
          This is where Architect AI will walk you through Step 0–7 of your
          Luther-style setup: pricing, niches, VAs, automations, and onboarding.
        </p>
        <p style={{ fontSize: "14px" }}>
          Coming next: a guided wizard plus checklists tied into Architect AI,
          n8n workflows, and VA task templates.
        </p>
      </div>
    </AppLayout>
  );
}
