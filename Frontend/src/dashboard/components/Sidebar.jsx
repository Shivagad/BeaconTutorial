import React from 'react';
import { NavLink } from 'react-router-dom';
import { GraduationCap, Award, Users, BarChart,FileImage,Album } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Users, label: '10th Results', path: '/dashboard/10th-results' },
    { icon: Users, label: '12th Results', path: '/dashboard/12th-results' },
    { icon: Users, label: 'MHT-CET Results', path: '/dashboard/cet-results' },
    { icon: Users, label: 'JEE Results', path: '/dashboard/jee-results' },
    { icon: Users, label: 'NEET Results', path: '/dashboard/neet-results' },
    { icon: FileImage, label: 'Poster', path: '/dashboard/poster' },
    { icon: Album, label: 'Event Galary', path: '/dashboard/event-galary' },

  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white p-4 shadow-lg">
      <div className="flex items-center justify-center mb-8 pt-4">
        <GraduationCap className="w-8 h-8 mr-2" />
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
      <nav>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-3 mb-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;