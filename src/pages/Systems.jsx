export default function Systems() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-slate-600 mt-1">
          Connect tools, automations, and integrations.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Email Service
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          Connect your email service provider to send newsletters
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button className="p-4 border border-slate-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left">
            <div className="font-medium text-slate-900 mb-1">SendGrid</div>
            <div className="text-xs text-slate-500">Not connected</div>
          </button>
          <button className="p-4 border border-slate-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left">
            <div className="font-medium text-slate-900 mb-1">Mailchimp</div>
            <div className="text-xs text-slate-500">Not connected</div>
          </button>
          <button className="p-4 border border-slate-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left">
            <div className="font-medium text-slate-900 mb-1">ConvertKit</div>
            <div className="text-xs text-slate-500">Not connected</div>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">
          Automation
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          Set up workflow automations to streamline your processes
        </p>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
            <div>
              <div className="font-medium text-slate-900">
                Welcome Email Sequence
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Automatically send welcome emails to new prospects
              </div>
            </div>
            <button className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              Configure
            </button>
          </div>
          <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
            <div>
              <div className="font-medium text-slate-900">
                Follow-up Reminders
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Get notified when to follow up with prospects
              </div>
            </div>
            <button className="px-4 py-2 text-sm border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
              Configure
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Reporting</h3>
        <p className="text-sm text-slate-600 mb-4">
          Connect analytics and reporting tools
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button className="p-4 border border-slate-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left">
            <div className="font-medium text-slate-900 mb-1">
              Google Analytics
            </div>
            <div className="text-xs text-slate-500">Not connected</div>
          </button>
          <button className="p-4 border border-slate-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left">
            <div className="font-medium text-slate-900 mb-1">
              Custom Dashboard
            </div>
            <div className="text-xs text-slate-500">Not configured</div>
          </button>
        </div>
      </div>
    </div>
  );
}
