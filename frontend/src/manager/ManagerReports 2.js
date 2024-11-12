import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import ManagerSidebar from "../components/sidebar/ManagerSidebar";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const ManagerReports = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    axios
      .get("/api/manager/reports")
      .then((res) => setReportData(res.data))
      .catch((err) => console.log("Error fetching report data:", err));
  }, []);

  const chartData = {
    labels: reportData.map((item) => item.label),
    datasets: [
      {
        label: "Manager Metrics",
        data: reportData.map((item) => item.value),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Manager Report Metrics",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Counts",
        },
      },
    },
  };

  return (
    <div className="app-container">
      <ManagerSidebar />
      <div className="main-content">
        <h2>Manager Reports</h2>
        <p>
          Overview of key metrics such as employee leave, shift scheduling, and
          career development.
        </p>
        <div style={{ width: "70%", margin: "auto" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="stats-section" style={{ marginTop: "20px" }}>
          <h3>Statistics Summary</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Report</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={index}>
                  <td>{item.label}</td>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerReports;
