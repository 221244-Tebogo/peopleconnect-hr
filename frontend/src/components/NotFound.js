import React from "react";
import { Link } from "react-router-dom";
// import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>
        It seems that the page you are looking for does not exist. It might have
        been moved or deleted.
      </p>
      <div className="button-container">
        <Link to="/" className="button">
          Home
        </Link>
        <Link to="/contact" className="button">
          Contact Us
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
