import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

type DashboardLayoutProps = { taskCount: number };
export function DashboardLayout({ taskCount }: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        taskCount={taskCount}
      />
      {mobileOpen && (
        <button
          className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        />
      )}
      <main className="ml-0 min-h-screen overflow-y-auto lg:ml-60">
        <Topbar onOpenMenu={() => setMobileOpen(true)} />
        <Outlet />
      </main>
    </div>
  );
}
