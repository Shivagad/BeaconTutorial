import React,{useState,useEffect} from 'react';
import { Trophy } from 'lucide-react';
import ResultSection from '../Components/ResultSection';
import axios from 'axios';
import Navbar from '../Components/Navbar';

const sectionColors = [
  'bg-blue-50',
  'bg-purple-50',
  'bg-pink-50',
  'bg-orange-50',
  'bg-emerald-50'
];

const Results =()=> {

  const [examData, setExamData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:4000/server/tenth/result') // Replace with your API endpoint
      .then(response => {
        if (response.data.success) {
          console.log(response.data.data)
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

  if (loading) return <div>Loading exam results...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
    <Navbar/>
    <div className="w-full min-h-screen bg-gray-50">

      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy size={48} className="text-yellow-300" />
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
      <main>
      <div className={`w-full pt-24 py-12`}>
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

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-indigo-200 text-lg">
            © 2024 Academic Excellence Institute. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}

export default Results;

