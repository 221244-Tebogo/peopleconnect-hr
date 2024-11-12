import React from "react";
import HRSidebar from "../components/sidebar/HRSidebar";
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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  // Data for each report
  const reportData = [
    { label: "Total Employees", value: 250 },
    { label: "Leave Taken This Month", value: 40 },
    { label: "Available Training Programs", value: 12 },
  ];

  // Chart data configuration
  const data = {
    labels: reportData.map((item) => item.label),
    datasets: [
      {
        label: "Report Metrics",
        data: reportData.map((item) => item.value),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "HR Employee Metrics",
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
      <HRSidebar />
      <div className="main-content">
        <h2>Employee Reports</h2>
        <p>
          Reports on employee numbers, leave taken, and available training
          programs.
        </p>

        {/* Bar Chart */}
        <div style={{ width: "70%", margin: "auto" }}>
          <Bar data={data} options={options} />
        </div>

        {/* Written Statistics */}
        <div className="stats-section" style={{ marginTop: "20px" }}>
          <h3>Statistics Summary</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Report</th>
                <th scope="col">Details</th>
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

export default Reports;
