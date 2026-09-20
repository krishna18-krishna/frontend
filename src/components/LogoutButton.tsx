import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
export function LogoutButton() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }
  return (
    <button
      className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-[10px] text-slate-600 hover:border-red-200 hover:text-red-500"
      onClick={handleLogout}
    >
      <LogOut size={15} />
      <span className="hidden sm:inline">Sign out</span>
    </button>
  );
}
