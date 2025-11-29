export default function ArchitectAI() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-slate-600 mt-1">
          Plan and design your local newsletter agency system.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 mb-2">
          Chat Interface
        </h3>
        <p className="text-slate-600 text-center max-w-md">
          The AI-powered chat interface will appear here. Ask questions about
          your newsletter strategy, get advice on client acquisition, and plan
          your agency workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h4 className="font-semibold text-slate-900 mb-2">
            Strategy Planning
          </h4>
          <p className="text-sm text-slate-600">
            Get personalized advice on structuring your newsletter agency and
            scaling your client base.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h4 className="font-semibold text-slate-900 mb-2">
            Content Generation
          </h4>
          <p className="text-sm text-slate-600">
            Generate newsletter content ideas, subject lines, and engaging copy
            for your local business clients.
          </p>
        </div>
      </div>
    </div>
  );
}
