import React from 'react';
import { ChevronRight, Users, BookOpen, Clock } from 'lucide-react';
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

function AboutUs() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh]">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url("https://via.placeholder.com/1500x800")',
            backgroundPosition: 'center right'
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full flex items-center max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white max-w-2xl">
            "Chase your dreams with passion and determination, for they hold the key to your future success"
          </h1>
        </div>
      </section>

      {/* About Beacon */}
      <section className="py-20 bg-purple-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">"BEACON" – A Guiding Signal</h2>
            <div className="text-gray-900 space-y-4">
              <p className="text-left">The idea behind Beacon Tutorials was to provide a guiding signal to students who aspire to pursue careers in science and engineering. The name "Beacon" symbolizes the institute's commitment to guiding students towards academic excellence and professional success.</p>
              <p className="text-left">The journey of Beacon Tutorials began with a group of passionate educators who came together to provide quality coaching and mentoring to students preparing for competitive exams like JEE Mains, NEET, and Board exams. They recognized the need for personalized attention and customized study plans to help students achieve their full potential.</p>
              <p className="text-left">With this vision in mind, Beacon Tutorials was established, starting from a small classroom with just a handful of students. The institute's founding team was committed to providing a nurturing & motivating learning environment that focused on each student's individual needs. As the institute's reputation grew, so did its infrastructure and faculty. Today, Beacon Tutorials has become a leading coaching institute, with a team of highly qualified and experienced teachers, state-of-the-art facilities, and a proven track record of success.</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://via.placeholder.com/500x300" 
              alt="Beacon Tutorials Facility" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Director's Message */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img 
              src="https://via.placeholder.com/500x300" 
              alt="Sanjeev Pawar - Director" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-orange-900">Sanjeev Pawar</h2>
            <h3 className="text-xl text-orange-700">Director</h3>
            <div className="text-orange-800 space-y-4">
              <p className="text-left">It is my honour to WELCOME you to the scholastic school named- "BEACON" -a guiding signal. As tag line denotes the meaning of the name "BEACON", similarly my aim to establish this institution designates to offer an ideal platform for achieving your precognitive dreams.</p>
              <p className="text-left">I assure you that we foster a proactive student-teacher relationship which would help every student to solve their doubt at ground level.</p>
              <p className="text-left">Our teaching methodology forms the basis of conceptual study followed by persistent practice of the same topic. We look for elaborative lectures that will provoke the students to build their interest in the subject.</p>
              <p className="text-left">I, along with my team ensure to guide each aspirant not only to qualify for the examinations but also to stay in this highly competitive changing world. This would help them to deal with their real-life situations in future.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-mid text-gray-900 mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "One-to-one guidance from well-experienced teaching staff.",
              "Personal Scheduled timetable for each.",
              "Separate batches according to the examinations.",
              "Daily followup of absent students via SMS and calls. Exam marks via SMS",
              "Day boarding facility.",
              "Student-friendly environment.",
              "Separate batches according to the examinations.",
              "Well organized library for students.",
              "Regular career guidance sessions.",
              "Discipline & dedicated staff."
            ].map((point, index) => (
              <div 
                key={index}
                className="flex items-center space-x-3 p-4 rounded-lg bg-gray-50 hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <ChevronRight className="text-blue-600 flex-shrink-0" />
                <p className="text-gray-700 text-left">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-mid text-gray-900 mb-12">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-purple-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="flex justify-center mb-4">
                <Users size={48} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-purple-900 mb-2">1000+ Students</h3>
              <p className="text-purple-700">Trusted by thousands of students for their academic journey</p>
            </div>
            <div className="bg-purple-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="flex justify-center mb-4">
                <BookOpen size={48} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-purple-900 mb-2">10+ Courses</h3>
              <p className="text-purple-700">Comprehensive courses covering various subjects</p>
            </div>
            <div className="bg-purple-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center">
              <div className="flex justify-center mb-4">
                <Clock size={48} className="text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-purple-900 mb-2">15+ Years Experience</h3>
              <p className="text-purple-700">Years of excellence in education</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </>
  );
}

export default AboutUs;
