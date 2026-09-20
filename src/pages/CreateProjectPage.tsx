import { useEffect, useState, type FormEvent } from "react";
import { ArrowLeft, FolderKanban, Save } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../services/api";
type Client = { id: number; name: string; company: string };
export function CreateProjectPage() {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [clientId, setClientId] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    api
      .get("/clients")
      .then(({ data }) => setClients(data.data))
      .catch(() => setError("Unable to load clients."));
  }, []);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      await api.post("/projects", {
        name,
        description: description || undefined,
        clientId: Number(clientId),
      });
      navigate("/projects", { replace: true });
    } catch {
      setError("Project could not be created. Check the form and try again.");
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="mx-auto max-w-3xl p-6 sm:p-8 lg:p-10">
      <Link
        className="mb-5 inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-500"
        to="/projects"
      >
        <ArrowLeft size={15} /> Back to projects
      </Link>
      <div className="mb-6">
        <p className="mb-2 text-[11px] text-slate-400">
          Projects / New project
        </p>
        <h1 className="font-display text-3xl font-semibold text-slate-800">
          Create a project
        </h1>
        <p className="mt-2 text-xs text-slate-400">
          Start a new delivery workspace for your team and client.
        </p>
      </div>
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-indigo-50 text-indigo-500">
            <FolderKanban size={21} />
          </div>
          <div>
            <h2 className="font-display text-base font-semibold text-slate-800">
              Project details
            </h2>
            <p className="text-[11px] text-slate-400">
              Projects are automatically assigned to your account.
            </p>
          </div>
        </div>
        <form className="grid gap-5" onSubmit={handleSubmit}>
          <label className="grid gap-2 text-xs font-semibold text-slate-600">
            Project name
            <input
              className="rounded-lg border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="e.g. Website redesign"
              minLength={2}
              maxLength={120}
              required
            />
          </label>
          <label className="grid gap-2 text-xs font-semibold text-slate-600">
            Client
            <select
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              value={clientId}
              onChange={(event) => setClientId(event.target.value)}
              required
            >
              <option value="">Select a client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.name} · {client.company}
                </option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-xs font-semibold text-slate-600">
            Description{" "}
            <span className="font-normal text-slate-400">Optional</span>
            <textarea
              className="resize-y rounded-lg border border-slate-200 px-3 py-2.5 text-xs outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What is this project about?"
              maxLength={2000}
              rows={5}
            />
          </label>
          {error && (
            <p
              className="rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs text-red-600"
              role="alert"
            >
              {error}
            </p>
          )}
          <div className="flex justify-end gap-2 pt-1">
            <Link
              className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs text-slate-600"
              to="/projects"
            >
              Cancel
            </Link>
            <button
              className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-200 disabled:cursor-not-allowed disabled:opacity-50"
              type="submit"
              disabled={saving || clients.length === 0}
            >
              <Save size={16} />
              {saving ? "Creating..." : "Create project"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
