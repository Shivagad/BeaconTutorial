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
import Home from './Pages/Home'
import EventGalary from './dashboard/dashboardpages/EventGalary';
import Contact from './Pages/Contact'
import Event from './Pages/Event';
import Admin from './dashboard/dashboardpages/Admin';
import Testimonial from './dashboard/dashboardpages/Testimonial';
import Login from './Pages/Login';
import MainTestimonial from './Pages/Testimonial'
import About from './Pages/About'
import Scholarships from './Pages/Scholarships'
import AdminScholarship from './dashboard/dashboardpages/Scholarship';
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/event-gallery" element={<Event/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/scholarship" element={<Scholarships/>} />
        <Route path="/about" element={<About />} />
         <Route path="/testimonial" element={<MainTestimonial />} />
        <Route path="/all-results" element={<Results/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="10th-results" element={<TenthResults />} />
          <Route path="admin" element={<Admin />} />
          <Route path="testimonial" element={<Testimonial />} />
          <Route path="event-galary" element={<EventGalary/>} />
          <Route path="12th-results" element={<TwelthResult/>} />
          <Route path="poster" element={<Poster/>} />
          <Route path="cet-results" element={<CETResult/>}/>
          <Route path="jee-results" element={<JEEResult/>}/>
          <Route path="scholarship" element={<AdminScholarship/>}/>
          <Route path="neet-results" element={<NEETResult/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

