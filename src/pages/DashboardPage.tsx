import { useEffect, useState } from "react";
import { CheckCircle2, Clock3, FolderKanban, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../store/AuthContext";
import { DashboardSections } from "../components/DashboardSections";
import { StatCard } from "../components/StatCard";
import type { ActivityItem, Task } from "../types/dashboard";
const fallbackTasks: Task[] = [
  {
    id: 12,
    title: "Polish onboarding flow",
    project: { name: "Northstar portal" },
    priority: "HIGH",
    status: "IN_PROGRESS",
    dueDate: "2026-09-21",
    isOverdue: false,
  },
  {
    id: 18,
    title: "Review accessibility audit",
    project: { name: "Atlas rebrand" },
    priority: "CRITICAL",
    status: "IN_REVIEW",
    dueDate: "2026-09-19",
    isOverdue: true,
  },
  {
    id: 24,
    title: "Connect billing webhook",
    project: { name: "Meridian commerce" },
    priority: "MEDIUM",
    status: "TODO",
    dueDate: "2026-09-25",
    isOverdue: false,
  },
];
export function DashboardPage() {
  const [tasks, setTasks] = useState(fallbackTasks);
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [summary, setSummary] = useState<{
    projects: number;
    totalTasks: number;
    overdue: number;
  }>({ projects: 0, totalTasks: 0, overdue: 0 });
  const navigate = useNavigate();
  const { user, onlineCount, activityEvents } = useAuth();
  const canCreateProject =
    user?.role === "ADMIN" || user?.role === "PROJECT_MANAGER";
  useEffect(() => {
    api
      .get("/tasks")
      .then((response) => setTasks(response.data.data))
      .catch(() => undefined);
    api
      .get("/activity/recent?limit=4")
      .then((response) => setActivity(response.data.data))
      .catch(() => undefined);
    api
      .get("/dashboard/summary")
      .then((response) => setSummary(response.data.data))
      .catch(() => undefined);
  }, []);
  const liveActivity: ActivityItem[] = activityEvents.map((event) => ({
    id: event.id,
    action: event.action,
    createdAt: String(event.createdAt),
    user: { name: event.userName },
    task: event.task,
  }));
  const visibleActivity = liveActivity.length ? liveActivity : activity;
  return (
    <div className="mx-auto max-w-[1400px] p-6 sm:p-8 lg:p-10">
      <div className="mb-7 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-[11px] text-slate-400">
            Saturday, September 19, 2026
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-800">
            Good morning, {user?.name ?? "there"}{" "}
            <span className="text-amber-400">✦</span>
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Here is what is happening across your workspace today.
          </p>
        </div>
        {canCreateProject && (
          <button
            className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2.5 text-xs font-semibold text-white shadow-lg shadow-indigo-200"
            onClick={() => navigate("/projects/new")}
          >
            <FolderKanban size={17} /> New project
          </button>
        )}
      </div>
      <section className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total projects"
          value={String(summary.projects)}
          change="Database records"
          icon={FolderKanban}
          tone="indigo"
        />
        <StatCard
          label="Active tasks"
          value={String(summary.totalTasks)}
          change="Database records"
          icon={CheckCircle2}
          tone="teal"
        />
        <StatCard
          label="Overdue"
          value={String(summary.overdue)}
          change="Scheduler flagged"
          icon={Clock3}
          tone="coral"
        />
        <StatCard
          label="Team online"
          value={String(onlineCount)}
          change="Socket presence"
          icon={Users}
          tone="amber"
        />
      </section>
      <DashboardSections
        tasks={tasks}
        activity={visibleActivity}
        online={onlineCount}
      />
    </div>
  );
}
