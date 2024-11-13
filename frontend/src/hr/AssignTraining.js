import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AssignTraining = ({ onClose, onSave }) => {
  const [taskData, setTaskData] = useState({
    employee: "",
    trainingTask: "",
    sessions: [],
  });
  const [employees, setEmployees] = useState([]);
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEmployeesAndPrograms = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No authorization token found");

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
    if (dates && dates[0] && dates[1]) {
      const start = dates[0];
      const end = dates[1];
      const sessions = [];
      for (
        let date = new Date(start);
        date <= end;
        date.setDate(date.getDate() + 1)
      ) {
        sessions.push({
          date: new Date(date).toISOString().split("T")[0],
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
    const token = localStorage.getItem("token");
    try {
      await axios.post("http://localhost:5002/api/training/assign", taskData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onSave();
      onClose();
    } catch (error) {
      console.error("Error assigning training:", error);
      alert("Failed to assign training. Please try again.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Assign Training</h2>
        <form onSubmit={handleSubmit}>
          <label>Employee:</label>
          <select
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

          <label>Training Program:</label>
          <select
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

          <label>Select Dates:</label>
          <DatePicker
            selected={selectedDates[0]}
            onChange={handleDateChange}
            startDate={selectedDates[0]}
            endDate={selectedDates[1]}
            selectsRange
            inline
          />

          {taskData.sessions.map((session, index) => (
            <div key={index}>
              <h5>{session.date}</h5>
              <label>Start Time:</label>
              <input
                type="time"
                name="startTime"
                value={session.startTime}
                onChange={(e) => handleTimeChange(e, index)}
              />
              <label>End Time:</label>
              <input
                type="time"
                name="endTime"
                value={session.endTime}
                onChange={(e) => handleTimeChange(e, index)}
              />
            </div>
          ))}

          <button type="submit">Assign</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignTraining;
