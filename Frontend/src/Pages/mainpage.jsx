import React from 'react';
import { Trophy } from 'lucide-react';
import { examData } from './data/students';
import ResultSection from './components/ResultSection';

const sectionColors = [
  'bg-blue-50',
  'bg-purple-50',
  'bg-pink-50',
  'bg-orange-50',
  'bg-emerald-50'
];

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
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
        <div>
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
  );
}

export default App;

