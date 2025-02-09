import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './dashboard/Layout';
import TenthResults from './dashboard/dashboardpages/TenthResults';
import TwelthResult from './dashboard/dashboardpages/TwelthResults';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/10th-results" replace />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="10th-results" element={<TenthResults />} />
          {/* Add other routes as needed */}
          <Route path="12th-results" element={<TwelthResult/>} />
          <Route path="students" element={<div className="p-6 mr-64">Students Page (Coming Soon)</div>} />
          <Route path="analytics" element={<div className="p-6 mr-64">Analytics Page (Coming Soon)</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

