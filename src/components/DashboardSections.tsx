import { useNavigate } from "react-router-dom";
import { ActivityFeed } from "./ActivityFeed";
import { PanelHeading } from "./PanelHeading";
import { Person } from "./Person";
import { TaskList } from "./TaskList";
import type { ActivityItem, Task } from "../types/dashboard";
export function DashboardSections({
  tasks,
  activity,
  online,
}: {
  tasks: Task[];
  activity: ActivityItem[];
  online: number;
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid gap-5 xl:grid-cols-[1.35fr_1fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <PanelHeading
            title="My task pulse"
            subtitle="Priority items across every active project"
            action="View all"
            onAction={() => navigate("/tasks")}
          />
          <TaskList tasks={tasks} />
        </section>
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <PanelHeading
            title="Recent activity"
            subtitle="Live workspace updates"
            live
          />
          <ActivityFeed items={activity} />
        </section>
      </div>
      <section className="mt-5 grid gap-5 xl:grid-cols-[1.35fr_1fr]">
        <div className="relative rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <PanelHeading
            title="Delivery health"
            subtitle="Project completion over the last 30 days"
          />
          <strong className="absolute right-5 top-5 font-display text-xl text-slate-800">
            72%{" "}
            <small className="font-sans text-[10px] font-normal text-emerald-600">
              +8.4%
            </small>
          </strong>
          <div className="mt-8 h-32 rounded bg-gradient-to-t from-indigo-50 to-transparent">
            <div
              className="h-full w-full border-b-2 border-indigo-400"
              style={{
                clipPath:
                  "polygon(0 75%, 15% 60%, 29% 66%, 42% 44%, 56% 50%, 69% 28%, 82% 37%, 100% 7%, 100% 10%, 82% 40%, 69% 31%, 56% 53%, 42% 47%, 29% 69%, 15% 63%, 0 77%)",
              }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[9px] text-slate-400">
            <span>Aug 21</span>
            <span>Aug 28</span>
            <span>Sep 04</span>
            <span>Sep 11</span>
            <span>Sep 19</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <PanelHeading
            title="Team presence"
            subtitle={`${online} people working right now`}
            live
          />
          <div className="grid gap-3">
            <Person
              initials="MP"
              name="Maya Patel"
              role="Product design"
              color="blue"
            />
            <Person
              initials="DC"
              name="Diego Chen"
              role="Engineering"
              color="green"
            />
            <Person
              initials="PS"
              name="Priya Shah"
              role="Project manager"
              color="orange"
            />
          </div>
          <button
            className="mt-5 w-full rounded-md border border-slate-200 py-2 text-[11px] text-slate-600"
            onClick={() => navigate("/team")}
          >
            View team directory
          </button>
        </div>
      </section>
    </>
  );
}
