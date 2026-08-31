export default function GovernmentDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900">
          Government Dashboard
        </h1>

        <p className="mt-3 text-slate-600">
          Welcome to Samadhan Government Portal
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Total Challenges</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">248</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Under Review</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">32</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Accepted</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">86</p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <p className="text-sm text-slate-500">Active Projects</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">24</p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-bold text-slate-900">
            Government Actions
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <button className="rounded-xl bg-slate-900 px-5 py-4 text-left font-semibold text-white">
              Review Challenges
            </button>

            <button className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-left font-semibold text-slate-900">
              Assign Challenge
            </button>

            <button className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-left font-semibold text-slate-900">
              Assign Project
            </button>

            <button className="rounded-xl border border-slate-200 bg-white px-5 py-4 text-left font-semibold text-slate-900">
              Track Projects
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
