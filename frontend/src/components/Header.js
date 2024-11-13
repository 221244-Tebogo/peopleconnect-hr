import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default Header;
