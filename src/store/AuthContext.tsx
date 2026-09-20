import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api, setAccessToken } from "../services/api";
import { connectSocket, disconnectSocket } from "../socket/client";

type User = { id: number; name: string; email: string; role: "ADMIN" | "PROJECT_MANAGER" | "DEVELOPER" };
export type Notification = { id: number; userId: number; taskId: number | null; type: string; message: string; isRead: boolean; createdAt: string };
export type LiveActivity = { id: number; taskId: number; projectId: number; userId: number; userName: string; action: string; oldStatus: string | null; newStatus: string | null; createdAt: string; task?: { title: string } };
type AuthContextValue = { user: User | null; loading: boolean; notifications: Notification[]; unreadCount: number; onlineCount: number; activityEvents: LiveActivity[]; login: (email: string, password: string) => Promise<void>; logout: () => Promise<void>; markNotificationRead: (id: number) => Promise<void>; markAllNotificationsRead: () => Promise<void> };
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null); const [loading, setLoading] = useState(true); const [notifications, setNotifications] = useState<Notification[]>([]); const [onlineCount, setOnlineCount] = useState(0); const [activityEvents, setActivityEvents] = useState<LiveActivity[]>([]);
  function startRealtime(token: string) { const socket = connectSocket(token); socket.on("presence:updated", (payload: { onlineCount: number }) => setOnlineCount(payload.onlineCount)); socket.on("activity:catchup", (events: Array<LiveActivity & { user?: { name: string } }>) => setActivityEvents(events.map((event) => ({ ...event, userName: event.userName ?? event.user?.name ?? "Unknown" })))); socket.on("activity:updated", (event: LiveActivity) => setActivityEvents((current) => [event, ...current].slice(0, 20))); socket.on("notification:new", (notification: Notification) => setNotifications((current) => [notification, ...current])); }
  useEffect(() => { let active = true; api.post("/auth/refresh", undefined, { validateStatus: (status) => status === 200 || status === 401 }).then(async ({ status, data }) => { if (!active) return; if (status === 200) { const token = data.data.accessToken; setAccessToken(token); setUser((await api.get("/auth/me")).data.data); setNotifications((await api.get("/notifications")).data.data); startRealtime(token); } else setAccessToken(null); }).catch(() => setAccessToken(null)).finally(() => { if (active) setLoading(false); }); return () => { active = false; disconnectSocket(); }; }, []);
  async function login(email: string, password: string) { const { data } = await api.post("/auth/login", { email, password }); setAccessToken(data.data.accessToken); setUser(data.data.user); setNotifications((await api.get("/notifications")).data.data); startRealtime(data.data.accessToken); }
  async function logout() { try { await api.post("/auth/logout"); } finally { disconnectSocket(); setAccessToken(null); setUser(null); setNotifications([]); setActivityEvents([]); } }
  async function markNotificationRead(id: number) { await api.patch(`/notifications/${id}/read`); setNotifications((current) => current.map((item) => item.id === id ? { ...item, isRead: true } : item)); }
  async function markAllNotificationsRead() { await api.post("/notifications/read-all"); setNotifications((current) => current.map((item) => ({ ...item, isRead: true }))); }
  return <AuthContext.Provider value={{ user, loading, notifications, unreadCount: notifications.filter((item) => !item.isRead).length, onlineCount, activityEvents, login, logout, markNotificationRead, markAllNotificationsRead }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error("useAuth must be used inside AuthProvider"); return context; }
