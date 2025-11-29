export default function Newsletters() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-slate-600 mt-1">
          Plan and track your recurring local newsletter issues.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Newsletter Campaigns
          </h3>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium text-sm">
            Create Campaign
          </button>
        </div>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h4 className="font-semibold text-slate-900 mb-2">Template Library</h4>
          <p className="text-sm text-slate-600 mb-4">
            Pre-built newsletter templates for local businesses
          </p>
          <span className="text-xs text-slate-500">Coming soon</span>
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
    </div>
  );
}
