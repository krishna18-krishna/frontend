import type { Task } from "../types/dashboard";
export function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    <div>
      {tasks.slice(0, 4).map((task) => (
        <div
          className="flex flex-wrap items-center gap-3 border-t border-slate-100 py-3.5"
          key={task.id}
        >
          <div className="h-4 w-4 shrink-0 rounded-full border border-slate-300" />
          <div className="min-w-[12rem] flex-1">
            <strong className="block truncate text-xs font-semibold text-slate-800">
              {task.title}
            </strong>
            <small className="mt-1 block text-[10px] text-slate-400">
              {task.project.name} <span className="px-1">·</span> Due{" "}
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </small>
          </div>
          <span
            className={`rounded px-2 py-1 text-[9px] font-bold ${task.priority === "CRITICAL" ? "bg-red-50 text-red-500" : "bg-amber-50 text-amber-600"}`}
          >
            {task.priority}
          </span>
          <span className="rounded bg-indigo-50 px-2 py-1 text-[9px] font-bold text-indigo-500">
            {task.status.replace("_", " ")}
          </span>
        </div>
      ))}
    </div>
  );
}
