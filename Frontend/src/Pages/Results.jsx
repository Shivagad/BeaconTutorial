import React, { useState, useEffect } from "react";
import { Trophy } from 'lucide-react';
import ResultSection from '../Components/ResultSection';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const sectionColors = [
  'bg-blue-50',
  'bg-orange-50',
  'bg-blue-50',
  'bg-orange-50',
  'bg-blue-50'
];

const Results = () => {
  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('https://beacon-tutorial.vercel.app/server/tenth/result')
      .then(response => {
        if (response.data.success) {
          console.log(response.data.data);
          setExamData(response.data.data);
        } else {
          setError('Error fetching exam data');
        }
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (error) {
    return (
      <>
        <Navbar />
        <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-red-500 text-xl">{error}</p>
        </div>
        <Footer />
      </>
    );
  }

  // Skeleton for header and result sections
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="w-full min-h-screen bg-gray-50">
          {/* Header Skeleton */}
          <header className="bg-gradient-to-r from-[#4e77bb] to-[#3d76d4] text-white py-12 px-4 -mb-20">
            <div className="max-w-7xl mx-auto flex flex-col items-center">
              <div className="flex items-center justify-center gap-3 mb-6">
          
                <Skeleton height={50} width="60%" />
              </div>
              <Skeleton height={30} width="70%" />
              <div className="mt-4">
                <Skeleton height={20} width="50%" />
              </div>
            </div>
          </header>
          {/* Main Content Skeleton */}
          <main className="-mb-20">
            <div className="w-full pt-24 py-12">
              {Array(3).fill(0).map((_, index) => (
                <div key={index} className="mb-12">
                  <div className="mb-6">
                    <Skeleton height={40} width="60%" className="mx-auto" />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                    {Array(10).fill(0).map((_, idx) => (
                      <Skeleton key={idx} height={150} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-[#4e77bb] to-[#3d76d4] text-white py-12 px-4 -mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Trophy className="w-20 h-20 sm:w-32 text-yellow-300" />
              <h1 className="text-5xl font-bold text-center">
                Academic Excellence Showcase
              </h1>
            </div>
            <p className="text-center text-indigo-100 text-lg max-w-3xl mx-auto">
              Celebrating the outstanding achievements of our students across various
              competitive examinations and academic milestones.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className='-mb-20'>
          <div className="w-full pt-24 py-12">
            {examData.map((section, index) => (
              <ResultSection
                key={index}
                title={section.title}
                students={section.students}
                bgColor={sectionColors[index]}
              />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Results;
