import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { PanelHeading } from "../components/PanelHeading";
import { api } from "../services/api";
type Row = Record<string, unknown>;
const titles: Record<string, string> = {
  "/projects": "Projects",
  "/tasks": "Tasks",
  "/clients": "Clients",
  "/activity": "Activity",
  "/team": "Team directory",
  "/notifications": "Notifications",
};
function text(value: unknown) {
  return typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
    ? String(value)
    : "-";
}
function nestedText(value: unknown, key: string) {
  return value && typeof value === "object" && key in value
    ? text((value as Row)[key])
    : "-";
}
export function ResourcePage() {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const title = titles[pathname] ?? "Workspace";
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  useEffect(() => {
    let mounted = true;
    const endpoint =
      pathname === "/activity"
        ? "/activity/recent?limit=50"
        : pathname === "/notifications"
          ? "/notifications"
          : pathname === "/team"
            ? "/users"
            : pathname;
    api
      .get(endpoint, { params: Object.fromEntries(searchParams.entries()) })
      .then(({ data }) => {
        if (mounted) {
          setError("");
          setRows(Array.isArray(data.data) ? (data.data as Row[]) : []);
          if (data.pagination) setPagination(data.pagination);
        }
      })
      .catch(() => {
        if (mounted) setError("Unable to load this workspace data.");
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [pathname, searchParams]);
  const updateFilter = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    setSearchParams(next);
  };
  const page = Number(searchParams.get("page") ?? pagination.page);
  return (
    <div className="mx-auto max-w-[1400px] p-6 sm:p-8 lg:p-10">
      <div className="mb-7">
        <p className="mb-2 text-[11px] text-slate-400">
          Global Solutions workspace
        </p>
        <h1 className="font-display text-3xl font-semibold text-slate-800">
          {title}
        </h1>
        <p className="mt-2 text-xs text-slate-400">
          Live records from the protected PostgreSQL API.
        </p>
      </div>
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <PanelHeading
          title={`${title} workspace`}
          subtitle={`${pagination.total || rows.length} records loaded from the database`}
          live
        />
        {pathname === "/tasks" && (
          <div className="mb-5 grid gap-3 rounded-lg bg-slate-50 p-3 sm:grid-cols-4">
            <select
              className="rounded-md border border-slate-200 bg-white px-2 py-2 text-xs"
              value={searchParams.get("status") ?? ""}
              onChange={(event) => updateFilter("status", event.target.value)}
            >
              <option value="">All statuses</option>
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="IN_REVIEW">In Review</option>
              <option value="DONE">Done</option>
            </select>
            <select
              className="rounded-md border border-slate-200 bg-white px-2 py-2 text-xs"
              value={searchParams.get("priority") ?? ""}
              onChange={(event) => updateFilter("priority", event.target.value)}
            >
              <option value="">All priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="CRITICAL">Critical</option>
            </select>
            <input
              className="rounded-md border border-slate-200 bg-white px-2 py-2 text-xs"
              type="date"
              value={searchParams.get("from") ?? ""}
              onChange={(event) => updateFilter("from", event.target.value)}
            />
            <input
              className="rounded-md border border-slate-200 bg-white px-2 py-2 text-xs"
              type="date"
              value={searchParams.get("to") ?? ""}
              onChange={(event) => updateFilter("to", event.target.value)}
            />
          </div>
        )}
        {loading ? (
          <div className="grid min-h-44 place-items-center text-xs text-slate-400">
            Loading records...
          </div>
        ) : error ? (
          <div className="grid min-h-44 place-items-center text-xs text-red-500">
            {error}
          </div>
        ) : rows.length === 0 ? (
          <div className="grid min-h-44 place-items-center text-xs text-slate-400">
            No items to display
          </div>
        ) : (
          <>
            <DataTable pathname={pathname} rows={rows} />
            {pagination.pages > 1 && (
              <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
                <span>
                  Page {page} of {pagination.pages}
                </span>
                <div className="flex gap-2">
                  <button
                    className="rounded border border-slate-200 px-3 py-1.5 disabled:opacity-40"
                    disabled={page <= 1}
                    onClick={() => updateFilter("page", String(page - 1))}
                  >
                    Previous
                  </button>
                  <button
                    className="rounded border border-slate-200 px-3 py-1.5 disabled:opacity-40"
                    disabled={page >= pagination.pages}
                    onClick={() => updateFilter("page", String(page + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
function DataTable({ pathname, rows }: { pathname: string; rows: Row[] }) {
  const columns =
    pathname === "/projects"
      ? ["name", "client", "tasks"]
      : pathname === "/tasks"
        ? ["title", "project", "priority", "status", "dueDate"]
        : pathname === "/clients"
          ? ["name", "company", "email", "projects"]
          : pathname === "/activity"
            ? ["action", "task", "createdAt"]
            : pathname === "/team"
              ? ["name", "email", "role", "createdAt"]
              : pathname === "/notifications"
                ? ["message", "type", "isRead", "createdAt"]
                : ["name", "email", "role"];
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[620px] border-collapse text-left">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                className="border-b border-slate-100 bg-slate-50 px-3 py-3 text-[10px] uppercase tracking-wider text-slate-400"
                key={column}
              >
                {column.replace(/([A-Z])/g, " $1")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              className="hover:bg-indigo-50/30"
              key={text(row.id) !== "-" ? text(row.id) : index}
            >
              {columns.map((column) => (
                <td
                  className="border-b border-slate-100 px-3 py-3.5 text-[11px] text-slate-500"
                  key={column}
                >
                  {column === "client" ||
                  column === "project" ||
                  column === "task" ||
                  column === "user"
                    ? nestedText(row[column], "name") ||
                      nestedText(row[column], "title")
                    : text(row[column])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
