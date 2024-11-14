import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard"; // Import the CSS file for custom styles

const AssignTraining = ({ onClose, onSave }) => {
  const [taskData, setTaskData] = useState({
    employee: "",
    trainingTask: "",
    sessions: [],
  });
  const [employees, setEmployees] = useState([]);
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [selectedDates, setSelectedDates] = useState([null, null]);

  useEffect(() => {
    const fetchEmployeesAndPrograms = async () => {
      const token = localStorage.getItem("token");
      try {
        const [employeesRes, programsRes] = await Promise.all([
          axios.get("http://localhost:5002/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5002/api/training/programs", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setEmployees(employeesRes.data);
        setTrainingPrograms(programsRes.data);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchEmployeesAndPrograms();
  }, []);

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
    if (dates[0] && dates[1]) {
      const sessions = [];
      for (
        let date = new Date(dates[0]);
        date <= dates[1];
        date.setDate(date.getDate() + 1)
      ) {
        sessions.push({
          date: date.toISOString().split("T")[0],
          startTime: "",
          endTime: "",
        });
      }
      setTaskData((prevData) => ({ ...prevData, sessions }));
    }
  };

  const handleTimeChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSessions = taskData.sessions.map((session, i) =>
      i === index ? { ...session, [name]: value } : session
    );
    setTaskData((prevData) => ({ ...prevData, sessions: updatedSessions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validSessions = taskData.sessions.every(
      (session) => session.startTime && session.endTime
    );

    if (!validSessions) {
      alert("All sessions must have a start time and end time.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5002/api/training/assign", taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSave();
      onClose();
    } catch (error) {
      console.error("Error assigning training:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content p-4 rounded bg-white shadow">
        <h2 className="mb-4 text-primary">Assign Training</h2>
        <form onSubmit={handleSubmit}>
          {/* Employee and Program Selection */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label>Employee:</label>
              <select
                className="form-select"
                name="employee"
                onChange={(e) =>
                  setTaskData({ ...taskData, employee: e.target.value })
                }
                required
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name} {emp.surname}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-6">
              <label>Training Program:</label>
              <select
                className="form-select"
                name="trainingTask"
                onChange={(e) =>
                  setTaskData({ ...taskData, trainingTask: e.target.value })
                }
                required
              >
                <option value="">Select Training</option>
                {trainingPrograms.map((prog) => (
                  <option key={prog._id} value={prog.name}>
                    {prog.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date Range Picker */}
          <div className="mb-3">
            <label>Select Dates:</label>
            <DatePicker
              selected={selectedDates[0]}
              onChange={handleDateChange}
              startDate={selectedDates[0]}
              endDate={selectedDates[1]}
              selectsRange
              inline
            />
          </div>

          {/* Sessions Table */}
          {taskData.sessions.length > 0 && (
            <div className="sessions-container mb-3">
              <h5 className="text-secondary">Sessions</h5>
              <table className="users-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {taskData.sessions.map((session, index) => (
                    <tr key={index}>
                      <td>{session.date}</td>
                      <td>
                        <input
                          type="time"
                          name="startTime"
                          value={session.startTime}
                          onChange={(e) => handleTimeChange(e, index)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <input
                          type="time"
                          name="endTime"
                          value={session.endTime}
                          onChange={(e) => handleTimeChange(e, index)}
                          className="form-control"
                        />
                      </td>
                      <td>
                        <button className="delete-button">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Buttons */}
          <div className="d-flex justify-content-between mt-4">
            <button type="submit" className="btn btn-primary">
              Assign
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTraining;
