import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import logo from "../assets/Logo.svg";

const API_BASE_URL = "http://localhost:5002/api/auth";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    role: "",
    userType: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin
      ? `${API_BASE_URL}/login`
      : `${API_BASE_URL}/register`;
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { ...formData };

    try {
      const response = await axios.post(endpoint, payload, {
        headers: { "Content-Type": "application/json" },
      });

      const { token, role } = response.data;
      if (token && role) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        setTimeout(() => {
          switch (role) {
            case "hr":
              navigate("/hr/dashboard");
              break;
            case "manager":
              navigate("/manager/dashboard");
              break;
            case "employee":
              navigate("/employee/dashboard");
              break;
            default:
              navigate("/dashboard");
          }
        }, 0);
      } else {
        setError("Authentication failed. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.response?.data?.message || "Error occurred. Please try again."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      className="auth-page d-flex flex-column align-items-center justify-content-center text-center"
      style={{ color: "white" }}
    >
      <img src={logo} alt="Logo" className="auth-logo mb-4" />
      {isLoggedIn ? (
        <div>
          <h1 style={{ color: "white" }}>Controlled Area Access</h1>
          <p style={{ color: "white" }}>
            You have successfully logged in. Please proceed to your dashboard
            for secure access to app features.
          </p>
          <button onClick={handleLogout} className="btn btn-primary mt-3">
            Confirm Access
          </button>
        </div>
      ) : (
        <div>
          <div className="auth-toggle mb-3">
            <button
              onClick={() => setIsLogin(true)}
              className={`btn ${
                isLogin ? "btn-primary" : "btn-outline-primary"
              } m-1`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`btn ${
                !isLogin ? "btn-primary" : "btn-outline-primary"
              } m-1`}
            >
              Register
            </button>
          </div>
          <form onSubmit={handleSubmit} className="text-center">
            {!isLogin && (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="First Name"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  style={{ color: "black", backgroundColor: "transparent" }}
                  className="mb-2 form-control"
                />
                <input
                  type="text"
                  name="surname"
                  placeholder="Last Name"
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
                  required
                  style={{ color: "white", backgroundColor: "transparent" }}
                  className="mb-2 form-control"
                />
              </>
            )}
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              style={{ color: "white", backgroundColor: "transparent" }}
              className="mb-2 form-control"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              style={{ color: "white", backgroundColor: "transparent" }}
              className="mb-2 form-control"
            />
            {!isLogin && (
              <>
                <label style={{ color: "white" }}>Select Role:</label>
                <select
                  name="role"
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                  style={{ color: "white", backgroundColor: "transparent" }}
                  className="mb-2 form-control"
                >
                  <option value="">Select Role</option>
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>

                <label style={{ color: "white" }}>Select Employee Type:</label>
                <div className="userType-selection" style={{ color: "white" }}>
                  <label>
                    <input
                      type="radio"
                      name="userType"
                      value="office"
                      onChange={(e) =>
                        setFormData({ ...formData, userType: e.target.value })
                      }
                      required
                    />
                    Office
                  </label>
                  <label className="ms-3">
                    <input
                      type="radio"
                      name="userType"
                      value="shift"
                      onChange={(e) =>
                        setFormData({ ...formData, userType: e.target.value })
                      }
                      required
                    />
                    Shift
                  </label>
                </div>
              </>
            )}
            <button type="submit" className="btn btn-primary mt-3">
              {isLogin ? "Login" : "Register"}
            </button>
            {error && (
              <p className="error" style={{ color: "red" }}>
                {error}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Authentication;
