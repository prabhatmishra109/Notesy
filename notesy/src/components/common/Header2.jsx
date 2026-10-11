import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../css/Header2.css";

const Header2 = () => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 70);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
<>
  {/* Top Info Bar */}
  <div className="ultra-topbar">
    🚀 Notesy AI – Smart Notes Sharing, Summarizing & Collaboration Platform
  </div>

  <nav className={`navbar navbar-expand-lg fixed-top ultra-navbar ${scroll ? "ultra-scroll" : ""}`}>
    <div className="container">

      {/* Logo */}
      <NavLink className="navbar-brand ultra-brand" to="/">
        <i className="fa-solid fa-book-open icon"></i> Notesy
      </NavLink>

      {/* Toggle */}
      <button
        className="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarUltra"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarUltra">

        {/* Center Links */}
        <ul className="navbar-nav mx-auto text-center">

          <li className="nav-item">
            <NavLink to="/homepage" className="nav-link ultra-link">
              <i className="fa-solid fa-house icon"></i> Home
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/about" className="nav-link ultra-link">
              <i className="fa-solid fa-circle-info icon"></i> About
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/contact" className="nav-link ultra-link">
              <i className="fa-solid fa-envelope icon"></i> Contact
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/fetchfeedback" className="nav-link ultra-link">
              <i className="fa-solid fa-comment-dots icon"></i> All Feedback
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/help2" className="nav-link ultra-link">
              <i className="fa-solid fa-circle-question icon"></i> Help
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink to="/privacy" className="nav-link ultra-link">
              <i className="fa-solid fa-shield-halved icon"></i> Privacy
            </NavLink>
          </li>

        </ul>

        {/* Right Buttons */}
        <div className="d-flex gap-3 justify-content-center">

          <NavLink to="/userreg" className="btn ultra-register">
            <i className="fa-solid fa-user-plus icon"></i> Register
          </NavLink>

          <NavLink to="/userLogin" className="btn ultra-login">
            <i className="fa-solid fa-right-to-bracket icon"></i> Login
          </NavLink>

        </div>

      </div>
    </div>
  </nav>
</>
  );
};

export default Header2;