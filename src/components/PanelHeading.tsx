type PanelHeadingProps = {
  title: string;
  subtitle: string;
  action?: string;
  onAction?: () => void;
  live?: boolean;
};
export function PanelHeading({
  title,
  subtitle,
  action,
  onAction,
  live,
}: PanelHeadingProps) {
  return (
    <div className="mb-5 flex items-start justify-between">
      <div>
        <h2 className="font-display text-[15px] font-semibold text-slate-800">
          {title}
        </h2>
        <p className="mt-1 text-[11px] text-slate-400">{subtitle}</p>
      </div>
      {live ? (
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-600">
          <i className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live
        </div>
      ) : action ? (
        <button className="text-[11px] text-indigo-500" onClick={onAction}>
          {action} <span className="text-sm">→</span>
        </button>
      ) : null}
    </div>
  );
}
