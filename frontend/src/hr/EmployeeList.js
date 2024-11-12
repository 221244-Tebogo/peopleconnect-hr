import React, { useState, useEffect } from "react";
import axios from "axios";
import HRSidebar from "../components/sidebar/HRSidebar";
import { Modal, Button } from "react-bootstrap";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    surname: "",
    email: "",
    role: "employee",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5002/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(response.data);
        setUserRole(localStorage.getItem("role"));
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to load employee data.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleModalShow = (employee = null) => {
    setEditEmployee(employee);
    if (employee) {
      setNewEmployee({
        name: employee.name,
        surname: employee.surname,
        email: employee.email,
        role: employee.role,
      });
    } else {
      setNewEmployee({
        name: "",
        surname: "",
        email: "",
        role: "employee",
      });
    }
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditEmployee(null);
  };

  const handleSaveEmployee = async () => {
    const token = localStorage.getItem("token");
    try {
      if (editEmployee) {
        await axios.put(
          `http://localhost:5002/api/users/${editEmployee._id}`,
          newEmployee,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEmployees((prev) =>
          prev.map((emp) =>
            emp._id === editEmployee._id ? { ...emp, ...newEmployee } : emp
          )
        );
      } else {
        const response = await axios.post(
          "http://localhost:5002/api/users",
          newEmployee,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEmployees([...employees, response.data]);
      }
      handleModalClose();
    } catch (error) {
      console.error("Error saving employee:", error);
      alert("Failed to save employee.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5002/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmployees(employees.filter((emp) => emp._id !== id));
    } catch (err) {
      console.error("Error deleting employee:", err);
      alert("Failed to delete employee.");
    }
  };

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <HRSidebar />
      <div className="main-content">
        <h2>Employee List</h2>

        {userRole === "hr" && (
          <Button variant="primary" onClick={() => handleModalShow()}>
            Add New Employee
          </Button>
        )}

        <table className="table table-striped table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Role</th>
              {userRole === "hr" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {currentEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.surname}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
                {userRole === "hr" && (
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleModalShow(employee)}
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(employee._id)}
                      size="sm"
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-between">
          <Button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <span>Page {currentPage}</span>
          <Button
            onClick={handleNextPage}
            disabled={currentEmployees.length < employeesPerPage}
          >
            Next
          </Button>
        </div>

        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editEmployee ? "Edit Employee" : "Add New Employee"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              placeholder="First Name"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
              className="form-control mb-2"
            />
            <input
              type="text"
              placeholder="Surname"
              value={newEmployee.surname}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, surname: e.target.value })
              }
              className="form-control mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, email: e.target.value })
              }
              className="form-control mb-2"
            />
            <select
              value={newEmployee.role}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, role: e.target.value })
              }
              className="form-control mb-2"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
              <option value="hr">HR</option>
            </select>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveEmployee}>
              {editEmployee ? "Update Employee" : "Add Employee"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default EmployeeList;
