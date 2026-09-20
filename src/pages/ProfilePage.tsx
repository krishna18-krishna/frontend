import { LogOut, Mail, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return null;
  }

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="mx-auto max-w-4xl p-6 sm:p-8 lg:p-10">
      <div className="mb-8">
        <p className="mb-2 text-[11px] text-slate-400">Account</p>
        <h1 className="font-display text-3xl font-semibold text-slate-800">
          Profile
        </h1>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#ece9ff] text-xl font-bold text-indigo-700">
            {user.name.slice(0, 2).toUpperCase()}
          </div>

          <div className="min-w-0">
            <h2 className="font-display text-[32px] font-semibold leading-none text-slate-800">
              {user.name}
            </h2>
            <div className="mt-2 inline-flex rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-600">
              {user.role === "ADMIN"
                ? "ADMIN"
                : user.role === "PROJECT_MANAGER"
                  ? "PROJECT MANAGER"
                  : "DEVELOPER"}
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <Mail size={16} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                Email
              </span>
            </div>
            <p className="text-sm font-medium text-slate-700">{user.email}</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2 text-slate-500">
              <ShieldCheck size={16} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em]">
                Role
              </span>
            </div>
            <p className="text-sm font-medium text-slate-700">
              {user.role === "ADMIN"
                ? "Administrator"
                : user.role === "PROJECT_MANAGER"
                  ? "Project Manager"
                  : "Developer"}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-600"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </section>
    </div>
  );
}
