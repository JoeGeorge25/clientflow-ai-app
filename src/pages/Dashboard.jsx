export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-slate-600 mt-1">
          Overview of your local newsletter agency system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="text-sm font-medium text-slate-500 mb-2">
            Active Prospects
          </div>
          <div className="text-3xl font-bold text-slate-900">0</div>
          <div className="text-xs text-slate-500 mt-2">
            Businesses in pipeline
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="text-sm font-medium text-slate-500 mb-2">
            Newsletter Issues Sent
          </div>
          <div className="text-3xl font-bold text-slate-900">0</div>
          <div className="text-xs text-slate-500 mt-2">Total sent this month</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="text-sm font-medium text-slate-500 mb-2">
            Open Rate (Last 30 Days)
          </div>
          <div className="text-3xl font-bold text-slate-900">0%</div>
          <div className="text-xs text-slate-500 mt-2">Average engagement</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Quick Start
        </h3>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-semibold">1.</span>
            <span>Add prospects to your pipeline from the Prospects page</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-semibold">2.</span>
            <span>Plan your newsletter strategy with Architect AI</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-semibold">3.</span>
            <span>Create and schedule newsletters for your clients</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-600 font-semibold">4.</span>
            <span>Set up integrations and automations in Systems Setup</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
