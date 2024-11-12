import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";

const EditTraining = ({ onClose, onSave, assignmentToEdit }) => {
  const [taskData, setTaskData] = useState(assignmentToEdit || {});
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:5002/api/training/assign/${assignmentToEdit._id}`,
        taskData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onSave(response.data.assignment);
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
            value={taskData.employee}
            onChange={(e) =>
              setTaskData({ ...taskData, employee: e.target.value })
            }
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
            value={taskData.training}
            onChange={(e) =>
              setTaskData({ ...taskData, training: e.target.value })
            }
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
            onChange={(dates) => setSelectedDates(dates)}
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
