// import React, { useEffect, useState } from 'react'
// import AdminHeader from './AdminHeader'
// import axios from 'axios'
// import '../../css/admindashboard.css'
// import { useLocation, useNavigate } from 'react-router-dom'//fetch the value of state value

// //it used to fetch the value of state object arrtibute
// import defaultProfilePic from "../../assets/login.jpg";
// import Footer from '../common/Footer'

// function AdminDashBoard() {

//   const email = localStorage.getItem("adminEmail")
//   const location = useLocation();
//   const APIURL = `http://localhost:8080/admin/adminProfile/${email}`

//   const [admindata, setAdminData] = useState({
//     name: "",
//     phone: ""
//   })
//   const [profilePic, setProfilePic] = useState(defaultProfilePic);
// //check email all time 
  
//  const navigate =useNavigate();
  
//   useEffect(()=>{
    
//     if (email === null)
//   navigate("/adminlogin")

//   },[])
//  useEffect(() => {

//     const fetchData = async () => {

//       try {

//         const response = await axios.get(APIURL);

//         setAdminData(response.data);

//         let imageUrl = defaultProfilePic;

//         //If image came from navigation (after upload)
//         if (location.state?.imageURL) {
//           imageUrl = location.state.imageURL;
//         }

//         //  If image exists in database
//         else if (response.data.profilePic) {
//           imageUrl = `http://localhost:8080/uploads/profileimages/${response.data.profilePic}`;
//         }

//         setProfilePic(imageUrl);

//       } catch (error) {
//         console.log("Error fetching admin data:", error);
//       }

//     };

//     fetchData();

//   }, []);

//   return (
//     <>
//       <AdminHeader />
//       <div className="admin-dashboard-page">

//       <div className="admin-main">

//         <div className="admin-card">
          
//           <img
//             src={profilePic}
//             alt="profile"
//             width="120"
//             style={{ borderRadius: "50%", marginRight: "10px" }}
//           />

         

//           <h2 className="admin-name">{admindata.name}</h2>
//           <span className="admin-badge">Administrator</span>

//           <div className="admin-details">

//             <div className="admin-box">
//               <h4>Email</h4>
//               <p>{email}</p>
//             </div>

//             <div className="admin-box">
//               <h4>Phone</h4>
//               <p>{admindata.phone}</p>
//             </div>

//           </div>

//           <div className="admin-actions">
//             <button className="admin-btn">Manage Users</button>
//             <button className="admin-btn logout">Logout</button>
//           </div>

//         </div>
// </div>
//       </div>
//     <Footer/>
//     </>
//   )
// }

// export default AdminDashBoard

import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import axios from 'axios'
import '../../css/admindashboard.css'
import { useLocation, useNavigate } from 'react-router-dom'
import defaultProfilePic from "../../assets/login.jpg";
import Footer from '../common/Footer'

function AdminDashBoard() {

  // 🔥 SAME LOGIC
  const email = localStorage.getItem("adminEmail")

  const location = useLocation();

  // 🔥 SAME API
  const APIURL = `http://localhost:8080/admin/adminProfile/${email}`

  // 🔥 SAME STATE
  const [admindata, setAdminData] = useState({
    name: "",
    phone: ""
  })

  // 🔥 SAME STATE
  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  const navigate = useNavigate();

  // 🔥 SAME LOGIN CHECK
  useEffect(() => {

    if (email === null)
      navigate("/adminlogin")

  }, [])

  // 🔥 SAME API CALL
  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await axios.get(APIURL);

        setAdminData(response.data);

        let imageUrl = defaultProfilePic;

        if (location.state?.imageURL) {
          imageUrl = location.state.imageURL;
        }

        else if (response.data.profilePic) {
          imageUrl = `http://localhost:8080/uploads/profileimages/${response.data.profilePic}`;
        }

        setProfilePic(imageUrl);

      } catch (error) {
        console.log("Error fetching admin data:", error);
      }

    };

    fetchData();

  }, []);

  return (
    <>
      <AdminHeader />

      <div className="admin-dashboard-page">

        {/* HERO SECTION */}

        <div className="admin-hero-section">

          <div className="admin-overlay"></div>

          <div className="admin-hero-content">

            <div className="admin-profile-wrapper">

              <div className="admin-profile-ring">

                <img
                  src={profilePic}
                  alt="profile"
                  className="admin-profile-image"
                />

              </div>

              <div className="admin-profile-info">

                <h1>
                  Welcome Back,
                  <span> {admindata.name}</span>
                </h1>

                <p className="admin-email">
                  {email}
                </p>

                <div className="admin-badge">
                  <i className="fa-solid fa-shield-halved"></i>
                  Notesy Super Administrator
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* STATS SECTION */}

        <div className="admin-stats-grid">

          <div className="admin-stats-card">

            <div className="stats-icon purple">
              <i className="fa-solid fa-users"></i>
            </div>

            <div>
              <h3>Manage Users</h3>
              <p>Monitor all platform users</p>
            </div>

          </div>

          <div className="admin-stats-card">

            <div className="stats-icon blue">
              <i className="fa-solid fa-comments"></i>
            </div>

            <div>
              <h3>Feedback</h3>
              <p>Review user feedback</p>
            </div>

          </div>

          <div className="admin-stats-card">

            <div className="stats-icon green">
              <i className="fa-solid fa-brain"></i>
            </div>

            <div>
              <h3>AI Platform</h3>
              <p>Smart Notes Management</p>
            </div>

          </div>

        </div>

        {/* QUICK ACCESS */}

        <div className="admin-feature-section">

          <div className="admin-section-title">

            <h2>
              <i className="fa-solid fa-bolt"></i>
              Admin Quick Access
            </h2>

          </div>

          <div className="admin-feature-grid">

            {/* DASHBOARD */}

            <div
              className="admin-feature-card"
              onClick={() => navigate("/admindashboard")}
            >

              <div className="feature-icon">
                <i className="fa-solid fa-gauge"></i>
              </div>

              <h3>Dashboard</h3>

              <p>
                Access the complete admin
                overview and monitoring panel.
              </p>

            </div>

            {/* CONTACTS */}

            <div
              className="admin-feature-card"
              onClick={() => navigate("/allcontacts")}
            >

              <div className="feature-icon">
                <i className="fa-solid fa-address-book"></i>
              </div>

              <h3>All Contacts</h3>

              <p>
                View and manage user
                contact messages easily.
              </p>

            </div>

            {/* USERS */}

            <div
              className="admin-feature-card"
              onClick={() => navigate("/alluser")}
            >

              <div className="feature-icon">
                <i className="fa-solid fa-users"></i>
              </div>

              <h3>All Users</h3>

              <p>
                Monitor all registered users
                on the Notesy platform.
              </p>

            </div>

            {/* FEEDBACK */}

            <div
              className="admin-feature-card"
              onClick={() => navigate("/allfeedback")}
            >

              <div className="feature-icon">
                <i className="fa-solid fa-comment-dots"></i>
              </div>

              <h3>Feedback</h3>

              <p>
                Analyze ratings and
                platform improvement suggestions.
              </p>

            </div>

            {/* PROFILE */}

            <div
              className="admin-feature-card"
              onClick={() => navigate("/profileupload")}
            >

              <div className="feature-icon">
                <i className="fa-solid fa-user"></i>
              </div>

              <h3>Profile Manage</h3>

              <p>
                Upload and manage
                administrator profile.
              </p>

            </div>

            {/* PASSWORD */}

            <div
              className="admin-feature-card"
              onClick={() => navigate("/adminchanepass")}
            >

              <div className="feature-icon">
                <i className="fa-solid fa-lock"></i>
              </div>

              <h3>Change Password</h3>

              <p>
                Secure your admin account
                with password updates.
              </p>

            </div>

            {/* EDIT PROFILE */}

            <div
              className="admin-feature-card"
              onClick={() => navigate("/adminEditProfile")}
            >

              <div className="feature-icon">
                <i className="fa-solid fa-user-pen"></i>
              </div>

              <h3>Edit Profile</h3>

              <p>
                Update administrator details
                and information.
              </p>

            </div>

            {/* LOGOUT */}

            <div
              className="admin-feature-card logout-card"
              onClick={() => {
                localStorage.removeItem("adminEmail");
                navigate("/adminLogin");
              }}
            >

              <div className="feature-icon logout-icon">
                <i className="fa-solid fa-right-from-bracket"></i>
              </div>

              <h3>Logout</h3>

              <p>
                Safely logout from
                Notesy admin panel.
              </p>

            </div>

          </div>

        </div>

        {/* AI PANEL */}

        <div className="admin-ai-panel">

          <div className="admin-ai-left">

            <h2>
              <i className="fa-solid fa-robot"></i>
              Notesy AI Administration
            </h2>

            <p>
              Control user management, monitor
              AI summaries, feedback systems,
              and platform activities from
              one powerful admin dashboard.
            </p>

            <button
              className="admin-explore-btn"
              onClick={() => navigate("/alluser")}
            >
              Explore Dashboard
            </button>

          </div>

          <div className="admin-ai-right">
            <i className="fa-solid fa-brain"></i>
          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default AdminDashBoard;