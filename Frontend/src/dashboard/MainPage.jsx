import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://beacon-tutorial.vercel.app/server/admin/analysis")
      .then((res) => {
        // Log the response to check the data
        console.log("API Response:", res.data.analysis);
  
        // Sort exams by date in descending order, then reverse the order
        const sorted = res.data.analysis
          .sort((a, b) => new Date(b.date) - new Date(a.date))
  
        console.log("Sorted and Reversed Data:", sorted);
  
        // Set the latest 6 exams after sorting and reversing
        setData(sorted.slice(0, 6)); // Picking the latest 6
      })
      .catch((err) => console.error("Error fetching data:", err));
  }, []);
  
  

  const getSubjectBarData = (exam) => {
    const subjectData = [];

    if (exam.avgPhysics != null) subjectData.push(["Physics", exam.avgPhysics]);
    if (exam.avgChemistry != null) subjectData.push(["Chemistry", exam.avgChemistry]);
    if (exam.avgMaths != null) subjectData.push(["Maths", exam.avgMaths]);
    if (exam.avgBiology != null) subjectData.push(["Biology", exam.avgBiology]);

    return {
      labels: subjectData.map(([subject]) => subject),
      datasets: [
        {
          label: "Average Score",
          data: subjectData.map(([, score]) => score),
          backgroundColor: [
            "rgba(251,191,36,0.6)",
            "rgba(34,197,94,0.6)",
            "rgba(59,130,246,0.6)",
            "rgba(244,63,94,0.6)",
          ].slice(0, subjectData.length),
          borderColor: [
            "rgb(251,191,36)",
            "rgb(34,197,94)",
            "rgb(59,130,246)",
            "rgb(244,63,94)",
          ].slice(0, subjectData.length),
          borderWidth: 1,
        },
      ],
    };
  };

  // Function to handle and format date properly
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      console.error("Invalid date format:", dateString);
      return "Invalid Date";  // Fallback if the date is invalid
    }
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 pl-72">
      <h2 className="text-3xl font-semibold mb-6">📊 Exam-wise Student Analysis</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((exam, i) => (
          <div key={i} className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-semibold mb-3">{exam.exam}</h3>
            <p className="text-gray-700 mb-4">
              🧑‍🎓 <strong>Total Students Appeared:</strong> {exam.totalStudents}
            </p>
            <p className="text-gray-500 mb-4">
              📅 <strong>Exam Date:</strong> {formatDate(exam.date)}
            </p>
            <Bar data={getSubjectBarData(exam)} />
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="text-center text-gray-500 text-lg mt-10">
          No exam data available yet.
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
