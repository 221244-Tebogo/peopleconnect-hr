import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

const EditTraining = ({ onClose, onSave, assignmentToEdit }) => {
  const [taskData, setTaskData] = useState({
    employee: assignmentToEdit?.employee || "",
    training: assignmentToEdit?.training || "",
    sessions: assignmentToEdit?.sessions || [],
  });

  const [employees, setEmployees] = useState([]);
  const [trainingPrograms, setTrainingPrograms] = useState([]);
  const [selectedDates, setSelectedDates] = useState([
    assignmentToEdit?.sessions?.[0]?.date
      ? new Date(assignmentToEdit.sessions[0].date)
      : null,
    assignmentToEdit?.sessions?.[assignmentToEdit.sessions.length - 1]?.date
      ? new Date(
          assignmentToEdit.sessions[assignmentToEdit.sessions.length - 1].date
        )
      : null,
  ]);
  console.log("Assignment ID for update:", assignmentToEdit?._id);

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

  // Update the time values for each session
  const handleTimeChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSessions = taskData.sessions.map((session, i) =>
      i === index ? { ...session, [name]: value } : session
    );
    setTaskData((prevData) => ({ ...prevData, sessions: updatedSessions }));
  };

  // Render fields for start and end times within each session
  {
    taskData.sessions.map((session, index) => (
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
    ));
  }

  // Update taskData with selected dates and times
  const handleDateChange = (dates) => {
    setSelectedDates(dates);
    if (dates[0] && dates[1]) {
      // Update taskData.sessions with formatted date range
      const sessions = [];
      let date = new Date(dates[0]);
      while (date <= dates[1]) {
        sessions.push({
          date: date.toISOString().split("T")[0], // Ensure yyyy-MM-dd format
          startTime: "", // Optional: can be edited separately
          endTime: "",
        });
        date.setDate(date.getDate() + 1);
      }
      setTaskData((prevData) => ({ ...prevData, sessions }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all sessions have startTime and endTime
    const validSessions = taskData.sessions.every(
      (session) => session.startTime && session.endTime
    );

    if (!validSessions) {
      alert("All sessions must have start and end times.");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5002/api/training/assign/${assignmentToEdit._id}`,
        taskData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onSave();
      onClose();
    } catch (error) {
      console.error("Error updating assignment:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Training Assignment</h2>
        <form onSubmit={handleSubmit}>
          <label>Employee:</label>
          <select
            name="employee"
            value={taskData.employee}
            onChange={handleChange}
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
            name="training"
            value={taskData.training}
            onChange={handleChange}
            required
          >
            <option value="">Select Training Program</option>
            {trainingPrograms.map((tp) => (
              <option key={tp._id} value={tp._id}>
                {tp.name}
              </option>
            ))}
          </select>

          <label>Select Training Dates:</label>
          <DatePicker
            selected={selectedDates[0]}
            onChange={handleDateChange}
            startDate={selectedDates[0]}
            endDate={selectedDates[1]}
            selectsRange
            inline
          />

          <button type="submit" className="btn btn-primary mt-2">
            Save
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn btn-secondary mt-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTraining;
