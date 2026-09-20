import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
export function RequireAuth() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading)
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 text-sm text-slate-500">
        Checking your session...
      </div>
    );
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
