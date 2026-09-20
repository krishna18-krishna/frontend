import type { LucideIcon } from "lucide-react";
type StatCardProps = {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  tone: "indigo" | "teal" | "coral" | "amber";
};
const tones = {
  indigo: "bg-indigo-50 text-indigo-500",
  teal: "bg-emerald-50 text-emerald-500",
  coral: "bg-red-50 text-red-400",
  amber: "bg-amber-50 text-amber-500",
};
export function StatCard({
  label,
  value,
  change,
  icon: Icon,
  tone,
}: StatCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${tones[tone]}`}
      >
        <Icon size={19} />
      </div>
      <div className="grid gap-1">
        <p className="text-[11px] text-slate-400">{label}</p>
        <strong className="font-display text-2xl font-semibold text-slate-800">
          {value}
        </strong>
        <small className="text-[10px] text-emerald-600">{change}</small>
      </div>
    </div>
  );
}
