import React from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./auth/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/User";
import Settings from "./pages/Setting";
import Projects from "./pages/Projects";
import RankProjects from "./pages/Project Prioritization/RankProjects";
import PrioritizeProjects from "./pages/Project Prioritization/PrioritizeProjects";
import ReportBuilder from "./pages/Report Manager/ReportBuilder";
import ImplementationModule from "./pages/Implementation Module/ImplementationModule";
import CostedAnnualizedPlan from "./pages/Implementation Module/CostedAnnualizedPlan";
import Create from "./pages/Implementation Module/myc/Create";
import MYCPost from "./pages/Implementation Reports/MYCPost";
import MYCReports from "./pages/Implementation Reports/MYCReports";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  // Non-Admin Routes (routes that do not require AdminLayout)
  const nonAdminRoutes = [{ path: "/login", element: <Login /> }];
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            {/* Render Non-Admin Routes */}
            {nonAdminRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/rank-projects" element={<RankProjects />} />
                <Route
                  path="/prioritize-projects"
                  element={<PrioritizeProjects />}
                />
                <Route path="/report-builder" element={<ReportBuilder />} />
                <Route
                  path="/implementation-module"
                  element={<ImplementationModule />}
                />
                <Route
                  path="/implementation-module/:code/costed-annualized-plan"
                  element={<CostedAnnualizedPlan />}
                />
                <Route
                  path="/implementation-module/create/:id"
                  element={<Create />}
                />
                <Route path="/myc-reports" element={<MYCReports />} />
                <Route path="/myc-post" element={<MYCPost />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
