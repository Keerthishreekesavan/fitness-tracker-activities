import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import Activities from "../pages/Activities";
import ActivityDetail from "../pages/ActivityDetail";
import FilterPage from "../pages/FilterPage";
import StatsPage from "../pages/StatsPage";

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Redirect root to /activities */}
          <Route path="/" element={<Navigate to="/activities" replace />} />

          {/* Mandatory routes */}
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/stats" element={<StatsPage />} />

          {/* Fallback */}
          <Route path="*" element={<h2 style={{ textAlign: "center", padding: "2rem" }}>404 — Page Not Found</h2>} />
        </Routes>
      </MainLayout>
    </Router>
  );
};

export default AppRouter;
