import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './dashboard/Layout';
import TenthResults from './dashboard/dashboardpages/TenthResults';
import TwelthResult from './dashboard/dashboardpages/TwelthResults';
import CETResult from './dashboard/dashboardpages/CETResults';
import JEEResult from './dashboard/dashboardpages/JEEResult';
import NEETResult from './dashboard/dashboardpages/NEETResult';
import Poster from './dashboard/dashboardpages/Poster';
import Results from './Pages/Results';
import Navbar from './Pages/Navbar'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard/10th-results" replace />} />
        <Route path="navbar" element={<Navbar/>} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="10th-results" element={<TenthResults />} />
          {/* Add other routes as needed */}
          <Route path="12th-results" element={<TwelthResult/>} />
          <Route path="poster" element={<Poster/>} />
          <Route path="cet-results" element={<CETResult/>}/>
          <Route path="jee-results" element={<JEEResult/>}/>
          <Route path="neet-results" element={<NEETResult/>}/>
          <Route path="students" element={<div className="p-6 mr-64">Students Page (Coming Soon)</div>} />
          <Route path="analytics" element={<div className="p-6 mr-64">Analytics Page (Coming Soon)</div>} />
        </Route>
        <Route path="/all-results" element={<Results/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

