type PersonProps = {
  initials: string;
  name: string;
  role: string;
  color: "blue" | "green" | "orange";
};
const colors = {
  blue: "bg-indigo-100 text-indigo-600",
  green: "bg-emerald-100 text-emerald-600",
  orange: "bg-orange-100 text-orange-600",
};
export function Person({ initials, name, role, color }: PersonProps) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`relative grid h-8 w-8 place-items-center rounded-full text-[9px] font-bold ${colors[color]}`}
      >
        {initials}
        <i className="absolute bottom-0 right-0 h-2 w-2 rounded-full border-2 border-white bg-emerald-500" />
      </div>
      <div className="grid gap-0.5">
        <strong className="text-[11px] text-slate-700">{name}</strong>
        <small className="text-[10px] text-slate-400">{role}</small>
      </div>
    </div>
  );
}
