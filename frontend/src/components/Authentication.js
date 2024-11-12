// frontend/components/Authentication.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:5002/api/auth";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    role: "",
    userType: "", // Added userType field
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
    <div className="auth-page">
      {isLoggedIn ? (
        <div>
          <h1>Welcome, you've just logged in</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <div className="auth-toggle">
            <button
              onClick={() => setIsLogin(true)}
              className={isLogin ? "active" : ""}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={!isLogin ? "active" : ""}
            >
              Register
            </button>
          </div>
          <form onSubmit={handleSubmit}>
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
                />
                <input
                  type="text"
                  name="surname"
                  placeholder="Last Name"
                  onChange={(e) =>
                    setFormData({ ...formData, surname: e.target.value })
                  }
                  required
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
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            {!isLogin && (
              <>
                <label>Select Role:</label>
                <select
                  name="role"
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  required
                >
                  <option value="">Select Role</option>
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>

                <label>Select Employee Type:</label>
                <div className="userType-selection">
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
                  <label>
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
            <button type="submit">{isLogin ? "Login" : "Register"}</button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      )}
    </div>
  );
};

export default Authentication;
