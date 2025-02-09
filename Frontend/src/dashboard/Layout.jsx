import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './dashboardcomponents/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
       <Sidebar />
     
      <main className="min-h-screen">
      <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

