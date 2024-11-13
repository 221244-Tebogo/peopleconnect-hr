import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.svg";
import "./NotFound.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="page-not-found">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Oops! Page Not Found</h1>
      <p>The page you're looking for doesn't exist or may have been moved.</p>
      <button className="btn-primary" onClick={() => navigate("/")}>
        Go to Homepage
      </button>
    </div>
  );
};

export default PageNotFound;
