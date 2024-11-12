import React, { useState, useEffect } from "react";
import axios from "axios";
import ManagerSidebar from "../components/sidebar/ManagerSidebar";

const ManagerTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team members (employees assigned to this manager)
  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5002/api/team", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeam(response.data);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setError("Failed to load team members.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="app-container">
      <ManagerSidebar />
      <div className="main-content">
        <h2>My Team</h2>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {team.map((employee) => (
              <tr key={employee._id}>
                <td>
                  {employee.name} {employee.surname}
                </td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagerTeam;
