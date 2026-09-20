import { Bell, ChevronDown, Menu, Search } from "lucide-react";
import { useState } from "react";
import { LogoutButton } from "./LogoutButton";
import { useAuth } from "../store/AuthContext";
type TopbarProps = { onOpenMenu: () => void };
export function Topbar({ onOpenMenu }: TopbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const {
    user,
    notifications,
    unreadCount,
    onlineCount,
    markNotificationRead,
    markAllNotificationsRead,
  } = useAuth();
  return (
    <header className="sticky top-0 z-30 flex h-[70px] items-center border-b border-slate-200 bg-white px-5 lg:px-10">
      <button
        className="mr-2 grid rounded-md p-1 text-slate-500 lg:hidden"
        onClick={onOpenMenu}
        aria-label="Open navigation"
      >
        <Menu size={20} />
      </button>
      <div className="flex min-w-0 flex-1 items-center gap-2 text-slate-300">
        <Search size={17} />
        <input
          className="w-full max-w-sm border-0 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
          placeholder="Search projects, tasks, people..."
          aria-label="Search"
        />
      </div>
      <div className="relative flex items-center gap-2 sm:gap-5">
        <span className="hidden items-center gap-1.5 text-[11px] text-emerald-600 sm:flex">
          <i className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {onlineCount ? `${onlineCount} online` : "Live"}
        </span>
        <button
          className="relative grid rounded-md p-1 text-slate-500"
          onClick={() => setNotificationsOpen((value) => !value)}
          aria-label="Notifications"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <b className="absolute -right-1 -top-1 min-w-3.5 rounded-full border-2 border-white bg-red-400 px-0.5 text-[8px] text-white">
              {unreadCount}
            </b>
          )}
        </button>
        <div className="hidden items-center gap-3 sm:flex">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#f5e7c9] text-[11px] font-bold text-[#8c5a00]">
            {user?.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex items-center gap-2">
            <div className="min-w-0">
              <strong className="block text-xs font-semibold text-slate-800">
                {user?.name}
              </strong>
              <small className="block text-[10px] uppercase tracking-[0.18em] text-slate-400">
                {user?.role.replace("_", " ")}
              </small>
            </div>
            <ChevronDown size={14} className="text-slate-500" />
          </div>
        </div>
        <LogoutButton />
      </div>
      {notificationsOpen && (
        <div className="absolute right-4 top-14 z-50 max-h-96 w-80 overflow-y-auto rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
          <div className="mb-2 flex items-center justify-between">
            <strong className="text-sm">Notifications</strong>
            <button
              className="text-[10px] text-indigo-600"
              onClick={() => void markAllNotificationsRead()}
            >
              Mark all read
            </button>
          </div>
          {notifications.length ? (
            notifications.map((notification) => (
              <button
                className={`flex w-full gap-2 border-t border-slate-100 py-3 text-left ${notification.isRead ? "opacity-50" : ""}`}
                key={notification.id}
                onClick={() => void markNotificationRead(notification.id)}
              >
                <i className="mt-1 h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                <span className="grid gap-1 text-xs">
                  <strong>{notification.message}</strong>
                  <small className="text-slate-400">
                    {new Date(notification.createdAt).toLocaleString()}
                  </small>
                </span>
              </button>
            ))
          ) : (
            <p className="border-t border-slate-100 py-4 text-xs text-slate-400">
              No notifications
            </p>
          )}
        </div>
      )}
    </header>
  );
}
