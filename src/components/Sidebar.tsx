import {
  Activity,
  BriefcaseBusiness,
  CheckCircle2,
  FolderKanban,
  LayoutDashboard,
  Users,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

type SidebarProps = { open: boolean; onClose: () => void; taskCount: number };
type NavItem = {
  label: string;
  path: string;
  Icon: typeof LayoutDashboard;
  roles: Array<"ADMIN" | "PROJECT_MANAGER" | "DEVELOPER">;
};

const nav: NavItem[] = [
  { label: "Overview", path: "/dashboard", Icon: LayoutDashboard, roles: ["ADMIN", "PROJECT_MANAGER", "DEVELOPER"] },
  { label: "Projects", path: "/projects", Icon: FolderKanban, roles: ["ADMIN", "PROJECT_MANAGER"] },
  { label: "Tasks", path: "/tasks", Icon: CheckCircle2, roles: ["ADMIN", "PROJECT_MANAGER", "DEVELOPER"] },
  { label: "Clients", path: "/clients", Icon: BriefcaseBusiness, roles: ["ADMIN", "PROJECT_MANAGER"] },
  { label: "Activity", path: "/activity", Icon: Activity, roles: ["ADMIN", "PROJECT_MANAGER", "DEVELOPER"] },
  { label: "Team", path: "/team", Icon: Users, roles: ["ADMIN"] },
];

export function Sidebar({ open, onClose, taskCount }: SidebarProps) {
  const { user } = useAuth();
  const visibleNav = nav.filter((item) => user?.role && item.roles.includes(user.role));

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex h-screen w-[min(86vw,20rem)] flex-col overflow-hidden border-r border-slate-200 bg-white px-4 py-6 shadow-xl transition-transform duration-200 lg:w-60 lg:translate-x-0 lg:shadow-none ${open ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="flex items-center gap-2 px-3 font-display text-[21px] font-bold tracking-tight text-slate-800">
        <div className="grid h-7 w-7 place-items-center rounded-lg bg-indigo-500 text-base text-white">
          V
        </div>
        <span>
          velozity<span className="text-orange-500">.</span>
        </span>
        <button
          className="ml-auto grid rounded-md p-1 text-slate-500 lg:hidden"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>
      </div>
      <p className="mb-2 mt-7 px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        Workspace
      </p>
      <nav className="mt-1 flex flex-1 flex-col gap-1">
        {visibleNav.map(({ label, path, Icon }) => (
          <NavLink
            key={path}
            to={path}
            onClick={onClose}
            className={({ isActive }) =>
              `my-0.5 flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] transition-colors ${isActive ? "bg-indigo-50 font-semibold text-indigo-600" : "text-slate-500 hover:bg-slate-50"}`
            }
          >
            <Icon size={18} />
            <span>{label}</span>
            {label === "Tasks" && (
              <em className="ml-auto rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] not-italic text-indigo-600">
                {taskCount}
              </em>
            )}
          </NavLink>
        ))}

        <NavLink
          to="/profile"
          onClick={onClose}
          className={({ isActive }) =>
            `mt-auto mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 transition-colors ${isActive ? "border-indigo-200 bg-indigo-50" : "hover:bg-slate-100"}`
          }
        >
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[#f5e7c9] text-[11px] font-bold text-[#8c5a00]">
              {user?.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <strong className="block text-xs font-semibold text-slate-800">
                {user?.name}
              </strong>
              <small className="block text-[10px] uppercase tracking-[0.18em] text-slate-400">
                {user?.role.replace("_", " ")}
              </small>
            </div>
          </div>
        </NavLink>
      </nav>
    </aside>
  );
}
