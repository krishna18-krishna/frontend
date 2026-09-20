import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { ResourcePage } from "./pages/ResourcePage";
import { CreateProjectPage } from "./pages/CreateProjectPage";
import { ProfilePage } from "./pages/ProfilePage";
import { RequireAuth } from "./components/RequireAuth";
import { AuthProvider } from "./store/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route element={<DashboardLayout taskCount={3} />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/projects" element={<ResourcePage />} />
              <Route path="/projects/new" element={<CreateProjectPage />} />
              <Route path="/tasks" element={<ResourcePage />} />
              <Route path="/clients" element={<ResourcePage />} />
              <Route path="/activity" element={<ResourcePage />} />
              <Route path="/team" element={<ResourcePage />} />
              <Route path="/notifications" element={<ResourcePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
