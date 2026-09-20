import type { ActivityItem } from "../types/dashboard";
type ActivityRowProps = {
  initials: string;
  name: string;
  action: string;
  detail: string;
};
function ActivityRow({ initials, name, action, detail }: ActivityRowProps) {
  return (
    <div className="flex gap-2.5 border-t border-slate-100 py-3">
      <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-indigo-100 text-[9px] font-bold text-indigo-600">
        {initials}
      </div>
      <div className="grid gap-1">
        <strong className="text-[11px] text-slate-700">
          {name} <span className="font-normal text-slate-500">{action}</span>
        </strong>
        <small className="text-[10px] text-slate-400">{detail}</small>
      </div>
    </div>
  );
}
export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  const fallback = [
    [
      "MP",
      "Maya Patel",
      "moved a task to In Review",
      "Accessibility audit · 8 min ago",
    ],
    [
      "DC",
      "Diego Chen",
      "completed a milestone",
      "Northstar portal · 24 min ago",
    ],
    ["PS", "Priya Shah", "joined the workspace", "Team · 1 hr ago"],
  ];
  return (
    <div>
      {items.length
        ? items.map((item) => (
            <ActivityRow
              key={item.id}
              initials={item.user.name.slice(0, 2).toUpperCase()}
              name={item.user.name}
              action={item.action}
              detail={item.task?.title ?? "Workspace update"}
            />
          ))
        : fallback.map(([initials, name, action, detail]) => (
            <ActivityRow
              key={initials}
              initials={initials}
              name={name}
              action={action}
              detail={detail}
            />
          ))}
    </div>
  );
}
