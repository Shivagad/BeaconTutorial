import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/AuthProvider";
import axios from "axios";
import { Bar } from "react-chartjs-2"; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StudentResult = () => {
  const { currentUser } = useAuth();
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [showNoResult, setShowNoResult] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      document.body.style.zoom = "67%";
    }
  }, []);

  useEffect(() => {
    if (currentUser?.email) {
      axios
        .get(`https://beacon-tutorial.vercel.app/server/student/getexamanalysis/${currentUser.email}`)
        .then((response) => {
            console.log(response);
          if (response.data.success) {
            setResults(response.data.averages); 
          } else {
            console.error("Error fetching results:", response.data.message);
            setShowNoResult(true); 
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching results:", error);
          setLoading(false);
          setShowNoResult(true); 
        });
    }
  }, [currentUser?.email]);

  const chartData = {
    labels: ['Physics', 'Chemistry', 'Maths', 'Biology'],
    datasets: [
      {
        label: 'Average Marks',
        data: [
          results.physics || 0,
          results.chemistry || 0,
          results.maths || 0,
          results.biology || 0
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h2>Student Exam Results</h2>
      {loading ? (
        <div>Loading...</div>
      ) : showNoResult ? (
        <div>No results found for this student.</div>
      ) : (
        <div>
          <h3>Last 5 Exam Averages</h3>
          <ul>
            <li>Physics: {results.physics || "N/A"}</li>
            <li>Chemistry: {results.chemistry || "N/A"}</li>
            <li>Maths: {results.maths || "N/A"}</li>
            <li>Biology: {results.biology || "N/A"}</li>
          </ul>

          {/* Bar Chart Display */}
          <div>
            <h3>Subject-wise Average Marks</h3>
            <Bar data={chartData} options={{ responsive: true, scales: { y: { beginAtZero: true } } }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentResult;
