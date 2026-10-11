import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../css/userheader.css'


function UserHeader() {
  const [isOpen, setIsOpen] = useState(false);
   const navigate=useNavigate()
    const logout=()=>{
      const email = localStorage.getItem("adminEmail")
      if(email!=null){
        localStorage.removeItem("adminEmail")
        navigate("/userLogin")
  
    }}
  

  return (
    <>
      {/* Navbar */}
      <nav
        className="navbar navbar-dark fixed-top px-3"
       style={{ backgroundColor: "#c5c0da", height: "60px" }}
      >
        <div className="container-fluid d-flex justify-content-between">
          <span className="navbar-brand mb-0 h5 text-white">
            User Dashboard
          </span>

          <button
            className="btn text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-bars fs-4"></i>
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        className="user-sidebar"
        style={{
          right: isOpen ? "0" : "-250px",
        }}
      >
        {/* User Section */}
        <div className="text-center text-white mb-4">
          <i className="fa-solid fa-user-circle fs-1 mb-2"></i>
          <h6>Hello User</h6>
        </div>

        {/* Menu */}
        <ul className="nav flex-column px-3">
          <li className="nav-item mb-2">
            <Link to="/userdashboard" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-house me-2"></i> UserDashBoard 
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/userEditProfile" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-house me-2"></i> Edit Profile
            </Link>
          </li>
           <li className="nav-item mb-2">
            <Link to="/userprofileupload" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-house me-2"></i> user Profile
            </Link>
          </li>
             <li className="nav-item mb-2">
            <Link to="/userchangepassword" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-house me-2"></i> Change Password
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/feedback" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-comment-dots me-2"></i> Feedback
            </Link>
          </li>

          <li className="nav-item mb-2">
            <Link to="/uploadnotes" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-user-pen me-2"></i> Uplode Notes
            </Link>
          </li>
         
           <li className="nav-item mb-2">
            <Link to="/showHistory" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-user-pen me-2"></i> Notes History
            </Link>
          </li>

           <li className="nav-item mb-2">
            <Link to="/sharenotes" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-user-pen me-2"></i> Share Notes
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/viewnotes" className="nav-link menu-item text-white" onClick={() => setIsOpen(false)}>
              <i className="fa-solid fa-user-pen me-2"></i> View Notes
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/userLogin" className="nav-link menu-item text-white" style={{textDecoration:"none"}} onClick={()=>{logout()}}>
              <i className="fa-solid fa-right-from-bracket me-2"></i> Logout
            </Link>
          </li>

        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.3)",
            zIndex: 998,
          }}
        />
      )}

   
    </>
  );
}
export default UserHeader