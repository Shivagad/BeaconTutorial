import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const Faculty = () => {
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [filteredFaculty, setFilteredFaculty] = useState({});
  const [currentPage, setCurrentPage] = useState({});
  const facultyPerPage = 6;
  const subjectRefs = useRef({}); 

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await axios.get('http://localhost:4000/server/faculty/getfaculty/all');
        const facultyData = response.data.data;
        const subjectWiseFaculty = {};

        facultyData.forEach((faculty) => {
          faculty.subjects.forEach((subject) => {
            const normalizedSubject = subject.toLowerCase();
            if (!subjectWiseFaculty[normalizedSubject]) subjectWiseFaculty[normalizedSubject] = [];
            subjectWiseFaculty[normalizedSubject].push(faculty);
          });
        });

        setFacultyMembers(facultyData);
        setFilteredFaculty(subjectWiseFaculty);

        const initialPages = {};
        Object.keys(subjectWiseFaculty).forEach((subject) => {
          initialPages[subject] = 0;
          subjectRefs.current[subject] = React.createRef(); // Initialize ref
        });
        setCurrentPage(initialPages);
      } catch (error) {
        console.error('Error fetching faculty:', error);
      }
    };

    fetchFaculty();
  }, []);

  const capitalizeSubject = (subject) => subject.charAt(0).toUpperCase() + subject.slice(1);

  const handlePrevPage = (subject) => {
    setCurrentPage((prev) => {
      const newPage = Math.max(prev[subject] - 1, 0);
      scrollToSubject(subject);
      return { ...prev, [subject]: newPage };
    });
  };

  const handleNextPage = (subject, totalPages) => {
    setCurrentPage((prev) => {
      const newPage = Math.min(prev[subject] + 1, totalPages - 1);
      scrollToSubject(subject);
      return { ...prev, [subject]: newPage };
    });
  };

  // Function to scroll to the subject section
  const scrollToSubject = (subject) => {
    if (subjectRefs.current[subject]) {
      subjectRefs.current[subject].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <section 
          className="relative h-[40vh] flex flex-col items-center justify-center bg-cover bg-center text-center px-4"
          style={{ backgroundImage: 'url(/images/faculty_bg.avif)' }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Meet Our Faculty</h1>
            <p className="mt-2 text-lg text-gray-200 max-w-2xl">
              Get to know the passionate and experienced educators dedicated to shaping the future of our students. 
              Our faculty members bring expertise, innovation, and commitment to excellence in education.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {Object.keys(filteredFaculty).map((subject) => {
            const facultyList = filteredFaculty[subject];
            const totalPages = Math.ceil(facultyList.length / facultyPerPage);
            const currentFaculty = facultyList.slice(
              currentPage[subject] * facultyPerPage,
              (currentPage[subject] + 1) * facultyPerPage
            );

            return (
              <div key={subject} ref={subjectRefs.current[subject]} className="mb-12 bg-white p-6 rounded-2xl shadow-lg">
                <h2 className="text-3xl font-bold text-center text-[#4E77BB] mb-6">
                  {capitalizeSubject(subject)} Faculty
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {currentFaculty.map((faculty) => (
                    <div key={faculty._id} className="bg-white rounded-xl shadow-md transform hover:scale-105 transition-transform duration-500 border-2 border-[#4E77BB]">
                      <div className="mx-auto mt-4 w-32 h-32 overflow-hidden rounded-full flex items-center justify-center border-4 border-[#4E77BB]">
                        <img src={faculty.profileImage} alt={faculty.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="font-semibold text-lg mb-2">{faculty.name}</h3>
                        <p className="text-gray-600">Email: {faculty.email}</p>
                        <p className="text-gray-600">Phone: {faculty.phone}</p>
                        <p className="text-gray-600">Qualification: {faculty.qualification}</p>
                        <p className="text-gray-600">Subjects: {faculty.subjects.join(', ')}</p>
                        <p className="text-gray-600">Bio: {faculty.bio || 'N/A'}</p>
                        <p className="text-gray-700">Joined: {new Date(faculty.joiningDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center mt-6">
                    <button
                      onClick={() => handlePrevPage(subject)}
                      disabled={currentPage[subject] === 0}
                      className="p-2 rounded-full bg-indigo-100 text-indigo-700 disabled:opacity-50 hover:bg-indigo-200 transition-colors mx-2"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <span className="text-gray-700 font-medium">
                      Page {currentPage[subject] + 1} of {totalPages}
                    </span>
                    <button
                      onClick={() => handleNextPage(subject, totalPages)}
                      disabled={currentPage[subject] === totalPages - 1}
                      className="p-2 rounded-full bg-indigo-100 text-indigo-700 disabled:opacity-50 hover:bg-indigo-200 transition-colors mx-2"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Faculty;
