import React from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/User";
import Settings from "./pages/Setting";
import Projects from "./pages/Projects";
import RankProjects from "./pages/Project Prioritization/RankProjects";
import PrioritizeProjects from "./pages/Project Prioritization/PrioritizeProjects";
import ReportBuilder from "./pages/Report Manager/ReportBuilder";
import ImplementationModule from "./pages/Implementation Module/ImplementationModule";
import CostedAnnualizedPlan from "./pages/Implementation Module/CostedAnnualizedPlan";
import Create from "./pages/Implementation Module/myc/Create"

function App() {
  return (
    <div className="App">
      <Router>
        <AdminLayout>
          <Routes>
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
            <Route path="/implementation-module/create/:id" element={<Create />} />
          </Routes>
        </AdminLayout>
      </Router>
    </div>
  );
}

export default App;
