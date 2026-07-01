import { Navigate, Route, Routes } from "react-router-dom";

import { AuthInitializer } from "@/components/auth/AuthInitializer";
import { GuestRoute } from "@/components/auth/GuestRoute";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AuthLayout } from "@/layouts/AuthLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { EndpointDetailsPage } from "@/pages/EndpointDetailsPage";
import { ProjectsPage } from "@/pages/ProjectsPage";

export function AppRoutes() {
  return (
    <AuthInitializer>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route
            path="/endpoints/:endpointId"
            element={<EndpointDetailsPage />}
          />
        </Route>

        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthInitializer>
  );
}
