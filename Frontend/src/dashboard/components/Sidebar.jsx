import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GraduationCap,BarChart, Users, FileImage, Album, UserCog, User, MessageSquareQuote, ScrollText, BookOpenText, HelpCircle, LayoutDashboard, CalendarDays, BarChart3, Megaphone } from 'lucide-react';
import { useAuth } from '../../Context/AuthProvider';

const Sidebar = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    // { icon: BarChart, label: 'Result Analysis', path: '/dashboard/mainpage' },
    { icon: GraduationCap, label: '10th Results', path: '/dashboard/10th-results' },
    { icon: GraduationCap, label: '12th Results', path: '/dashboard/12th-results' },
    { icon: GraduationCap, label: 'MHT-CET Results', path: '/dashboard/cet-results' },
    { icon: GraduationCap, label: 'JEE Results', path: '/dashboard/jee-results' },
    { icon: GraduationCap, label: 'Other Exam Results', path: '/dashboard/otherexams' },
    { icon: GraduationCap, label: 'NEET Results', path: '/dashboard/neet-results' },
    { icon: FileImage, label: 'Poster', path: '/dashboard/poster' },
    { icon: Album, label: 'Event Gallery', path: '/dashboard/event-gallery' },
    { icon: UserCog, label: 'Manage Admins', path: '/dashboard/admin' },
    { icon: Users, label: 'Manage Students', path: '/dashboard/coursescard' },
    { icon: MessageSquareQuote, label: 'Testimonial', path: '/dashboard/testimonial' },
    { icon: ScrollText, label: 'Scholarship', path: '/dashboard/scholarship' },
    { icon: HelpCircle, label: 'Inquiry', path: '/dashboard/inquiry' },
    { icon: BookOpenText, label: 'Blog', path: '/dashboard/blog' },
    { icon: LayoutDashboard, label: 'Manage Course', path: '/dashboard/courses' },
    { icon: User, label: 'Manage Faculty', path: '/dashboard/faculty' },
    { icon: BarChart3, label: 'Stat', path: '/dashboard/stat' },
    { icon: CalendarDays, label: 'Batch Start Date', path: '/dashboard/batches' },
    { icon: Megaphone, label: 'Ads', path: '/dashboard/adsbackend' },
  ];
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white p-4 shadow-lg flex flex-col">
      <div>
        <div className="flex items-center justify-center mb-8 pt-4">
          <GraduationCap className="w-8 h-8 mr-2" />
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="text-red-700 flex items-center rounded-lg ml-20 mb-5 hover:text-blue-600"
        >
          Logout
        </button>
      </div>
      {/* Navigation section becomes scrollable if items overflow */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center p-3 mb-2 rounded-lg transition-colors ${
                isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'
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
