import React, { useState, useEffect } from "react";
import { Trophy } from 'lucide-react';
import ResultSection from '../Components/ResultSection';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import results from '../../public/images/results.png'

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
          // console.log(response.data.data);
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
        <div className="bg-[#4E77BB] pt-12 pb-20 relative shadow-md">
          <div className="max-w-4xl mx-auto text-center px-4">
            <div className="flex justify-center mb-3">
              <img
                src={results}
                className="h-16 w-16 filter invert brightness-0 contrast-200"
              ></img>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Academic Excellence Showcase
            </h1>
            <p className="text-white text-center max-w-2xl mx-auto">
              Celebrating the outstanding achievements of our students across various
              competitive examinations and academic milestones.
            </p>
          </div>
          {/* Wave SVG */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 100" className="w-full h-auto">
              <path
                fill="#fff"
                fillOpacity="1"
                d="M0,32L80,37.3C160,43,320,53,480,58.7C640,64,800,64,960,58.7C1120,53,1280,43,1360,37.3L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"
              ></path>
            </svg>
          </div>
        </div>

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
