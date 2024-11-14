// // frontend/EmployeeLeave.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Form, Button, Container, Card, Spinner } from "react-bootstrap";

// const EmployeeLeave = () => {
//   const [leaveData, setLeaveData] = useState({
//     leaveType: "Annual",
//     startDate: "",
//     endDate: "",
//     reason: "",
//   });
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [numberOfDays, setNumberOfDays] = useState(0);
//   const [leaveBalance, setLeaveBalance] = useState({ annual: 0, sick: 0 });
//   const [leaveHistory, setLeaveHistory] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setLeaveData({ ...leaveData, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const calculateNumberOfDays = (start, end) => {
//     const startDate = new Date(start);
//     const endDate = new Date(end);
//     const diffTime = Math.abs(endDate - startDate);
//     return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Including start day
//   };

//   useEffect(() => {
//     if (leaveData.startDate && leaveData.endDate) {
//       const days = calculateNumberOfDays(
//         leaveData.startDate,
//         leaveData.endDate
//       );
//       setNumberOfDays(days);
//     }
//   }, [leaveData.startDate, leaveData.endDate]);

//   useEffect(() => {
//     const fetchLeaveData = async () => {
//       try {
//         const [balanceResponse, historyResponse] = await Promise.all([
//           axios.get("http://localhost:5002/api/leaves/balance", {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }),
//           axios.get("http://localhost:5002/api/leaves/history", {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }),
//         ]);

//         setLeaveBalance({
//           annual: balanceResponse.data.annualLeaveBalance,
//           sick: balanceResponse.data.sickLeaveBalance,
//         });
//         setLeaveHistory(historyResponse.data);
//       } catch (error) {
//         console.error("Error fetching leave data:", error);
//       }
//     };

//     fetchLeaveData();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.keys(leaveData).forEach((key) =>
//       formData.append(key, leaveData[key])
//     );
//     formData.append("numberOfDays", numberOfDays); // Send the number of days
//     if (file) formData.append("document", file);

//     setLoading(true);
//     try {
//       await axios.post("http://localhost:5002/api/leaves/apply", formData, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       alert("Leave application submitted successfully");
//     } catch (error) {
//       console.error("Error applying for leave:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <Container className="mt-4">
//       <Card className="p-4">
//         <h2>Apply for Leave</h2>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="leaveType">
//             <Form.Label>Leave Type</Form.Label>
//             <Form.Control
//               as="select"
//               name="leaveType"
//               value={leaveData.leaveType}
//               onChange={handleChange}
//               required
//             >
//               <option value="Annual">Annual Leave</option>
//               <option value="Sick">Sick Leave</option>
//               <option value="Maternity">Maternity Leave</option>
//               <option value="Unpaid">Unpaid Leave</option>
//             </Form.Control>
//           </Form.Group>

//           <Form.Group controlId="startDate" className="mt-3">
//             <Form.Label>Start Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="startDate"
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <Form.Group controlId="endDate" className="mt-3">
//             <Form.Label>End Date</Form.Label>
//             <Form.Control
//               type="date"
//               name="endDate"
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>

//           <p className="mt-3">
//             <strong>Days of Leave:</strong> {numberOfDays} days
//           </p>

//           {leaveData.leaveType !== "Annual" && (
//             <>
//               <Form.Group controlId="reason" className="mt-3">
//                 <Form.Label>Reason for Leave</Form.Label>
//                 <Form.Control
//                   type="text"
//                   name="reason"
//                   placeholder="Reason for leave"
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//               <Form.Group controlId="document" className="mt-3">
//                 <Form.Label>Upload Supporting Document</Form.Label>
//                 <Form.Control
//                   type="file"
//                   onChange={handleFileChange}
//                   accept=".pdf,.png,.jpg"
//                 />
//               </Form.Group>
//             </>
//           )}

//           <Button type="submit" className="mt-3" disabled={loading}>
//             {loading ? (
//               <Spinner animation="border" size="sm" />
//             ) : (
//               "Submit Leave"
//             )}
//           </Button>
//         </Form>

//         <h3 className="mt-4">Leave Balance</h3>
//         <p>
//           <strong>Annual Leave:</strong> {leaveBalance.annual} days
//         </p>
//         <p>
//           <strong>Sick Leave:</strong> {leaveBalance.sick} days
//         </p>

//         <h3 className="mt-4">Leave History</h3>
//         <ul>
//           {leaveHistory.map((leave) => (
//             <li key={leave._id}>
//               {leave.leaveType} from {leave.startDate} to {leave.endDate} -{" "}
//               <strong>{leave.status}</strong> ({leave.numberOfDays} days)
//             </li>
//           ))}
//         </ul>
//       </Card>
//     </Container>
//   );
// };

// export default EmployeeLeave;

// frontend/EmployeeLeave.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";

const EmployeeLeave = () => {
  const [leaveData, setLeaveData] = useState({
    leaveType: "Annual",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [leaveBalance, setLeaveBalance] = useState({ annual: 0, sick: 0 });
  const [leaveHistory, setLeaveHistory] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveData({ ...leaveData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const calculateNumberOfDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  useEffect(() => {
    if (leaveData.startDate && leaveData.endDate) {
      const days = calculateNumberOfDays(
        leaveData.startDate,
        leaveData.endDate
      );
      setNumberOfDays(days);
    }
  }, [leaveData.startDate, leaveData.endDate]);

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const [balanceResponse, historyResponse] = await Promise.all([
          axios.get("http://localhost:5002/api/leaves/balance", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get("http://localhost:5002/api/leaves/history", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        setLeaveBalance({
          annual: balanceResponse.data.annualLeaveBalance,
          sick: balanceResponse.data.sickLeaveBalance,
        });
        setLeaveHistory(historyResponse.data);
      } catch (error) {
        console.error("Error fetching leave data:", error);
      }
    };

    fetchLeaveData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(leaveData).forEach((key) =>
      formData.append(key, leaveData[key])
    );
    formData.append("numberOfDays", numberOfDays);
    if (file) formData.append("document", file);

    setLoading(true);
    try {
      await axios.post("http://localhost:5002/api/leaves/apply", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Leave application submitted successfully");
    } catch (error) {
      console.error("Error applying for leave:", error);
    }
    setLoading(false);
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        <h2>Apply for Leave</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="leaveType">
            <Form.Label>Leave Type</Form.Label>
            <Form.Control
              as="select"
              name="leaveType"
              value={leaveData.leaveType}
              onChange={handleChange}
              required
            >
              <option value="Annual">Annual Leave</option>
              <option value="Sick">Sick Leave</option>
              <option value="Maternity">Maternity Leave</option>
              <option value="Unpaid">Unpaid Leave</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="startDate" className="mt-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="endDate" className="mt-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <p className="mt-3">
            <strong>Days of Leave:</strong> {numberOfDays} days
          </p>

          <Button type="submit" className="mt-3" disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              "Submit Leave"
            )}
          </Button>
        </Form>

        <h3 className="mt-4">Leave Balance</h3>
        <p>
          <strong>Annual Leave:</strong> {leaveBalance.annual} days
        </p>
        <p>
          <strong>Sick Leave:</strong> {leaveBalance.sick} days
        </p>

        <h3 className="mt-4">Leave History</h3>
        <ul>
          {leaveHistory.map((leave) => (
            <li key={leave._id}>
              {leave.leaveType} from {leave.startDate} to {leave.endDate} -{" "}
              <strong>{leave.status}</strong> ({leave.numberOfDays} days)
            </li>
          ))}
        </ul>
      </Card>
    </Container>
  );
};

export default EmployeeLeave;
