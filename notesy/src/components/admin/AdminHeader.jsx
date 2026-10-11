import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import '../../css/adminheader.css'
function AdminHeader() {
  const [collapsed, setCollapsed] = useState(false);
  const [showMobile, setShowMobile] = useState(false);
  const navigate=useNavigate()
  const logout=()=>{
    const email = localStorage.getItem("adminEmail")
    if(email!=null){
      localStorage.removeItem("adminEmail")
      navigate("/adminLogin")

  }}

  return (
    <>
      {/* ===== Top Navbar ===== */}
      <nav className="admin-navbar">
        <div className="nav-left">
          <button
            className="menu-toggle"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className="fa-solid fa-bars"></i>
          </button>
          <span className="brand-title">NOTESY Admin</span>
        </div>

        <div className="nav-right">
          <div className="admin-profile">
            <i className="fa-solid fa-user-circle"></i>
            <span>Admin</span>
          </div>
        </div>
      </nav>

      {/* ===== Sidebar ===== */}
      <div
        className={`admin-sidebar ${collapsed ? "collapsed" : ""} ${
          showMobile ? "show" : ""
        }`}
      >
        <ul>
          <li>
            <Link to="/admindashboard">
              <i className="fa-solid fa-gauge"></i>
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="/allcontacts">
              <i className="fa-solid fa-users"></i>
              <span>AllContacts</span>
            </Link>
          </li>

          <li>
            <Link to="/alluser">
              <i className="fa-solid fa-book"></i>
              <span>Users</span>
            </Link>
          </li>

          <li>
            <Link to="/allfeedback">
              <i className="fa-solid fa-chart-line"></i>
              <span>Feedback</span>
            </Link>
          </li>

          <li>
            <Link to="/profileupload">
              <i className="fa-solid fa-chart-line"></i>
              <span>Profilemanage</span>
            </Link>
          </li>
          <li>
            <Link to="/adminchanepass">
              <i className="fa-solid fa-gear"></i>
              <span>Change Password</span>
            </Link>
          </li>
          <li>
            <Link to="/adminEditProfile">
              <i className="fa-solid fa-gear"></i>
              <span>Edit Profile</span>
            </Link>
          </li>

          <li className="logout">
           <button className="btn btn-link" style={{textDecoration:"none"}} onClick={()=>{logout()}}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Logout</span>
           </button>
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminHeader;