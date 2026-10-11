


// import React, { useEffect, useState } from 'react'
// import UserHeader from './UserHeader'
// import axios from 'axios'
// import '../../css/userdashboard.css'
// import { useLocation, useNavigate } from 'react-router-dom'
// import defaultProfilePic from "../../assets/login.jpg";
// import Footer from '../common/Footer'

// function UserDashBoard() {

//   const navigate = useNavigate();
//   const location = useLocation();

//   // 🔥 1. पहले localStorage से लो
//   let email = localStorage.getItem("adminEmail");

//   // 🔥 2. अगर null है → URL से लो (Google login case)
//   if (!email) {
//     const queryParams = new URLSearchParams(location.search);
//     email = queryParams.get("email");

//     if (email) {
//       localStorage.setItem("adminEmail", email); // 🔥 save for future
//     }
//   }

//   const APIURL = `http://localhost:8080/user/userProfile/${email}`;

//   const [userData, setUserData] = useState({
//     name: "",
//     phone: "",
//     city: ""
//   });

//   const [profilePic, setProfilePic] = useState(defaultProfilePic);

//   // 🔥 3. अगर अभी भी email null है → login page
//   useEffect(() => {
//     if (!email) {
//       navigate("/userLogin");
//     }
//   }, []);

//   // 🔥 4. API call
//   useEffect(() => {

//     const fetchData = async () => {
//       try {
//         const response = await axios.get(APIURL);

//         setUserData(response.data);

//         let imageUrl = defaultProfilePic;

//         if (location.state?.imageURL) {
//           imageUrl = location.state.imageURL;
//         } else if (response.data.profilePic) {
//           imageUrl = `http://localhost:8080/uploads/userprofileimages/${response.data.profilePic}`;
//         }

//         setProfilePic(imageUrl);

//       } catch (error) {
//         console.log("Error fetching user data:", error);
//       }
//     };

//     if (email) fetchData();

//   }, [email]);

//   return (
//     <>
//       <UserHeader />

  

//       <div className="dashboard-container">
//         <div className="profile-card">

//           <img
//             src={profilePic}
//             alt="profile"
//             width="120"
//             style={{ borderRadius: "50%", marginRight: "10px" }}
//           />

//           <h2 className="profile-name">{userData.name}</h2>
//           <p className="profile-email">{email}</p>

//           <div className="profile-details">
//             <div className="detail-box">
//               <span>City</span>
//               <p>{userData.city}</p>
//             </div>

//             <div className="detail-box">
//               <span>Phone</span>
//               <p>{userData.phone}</p>
//             </div>
//           </div>

//           <button className="edit-btn">Edit Profile</button>

//         </div>
//       </div>
//       <Footer/>
//     </>
//   )
// }

// export default UserDashBoard;

import React, { useEffect, useState } from 'react'
import UserHeader from './UserHeader'
import axios from 'axios'
import '../../css/userdashboard.css'
import { useLocation, useNavigate } from 'react-router-dom'
import defaultProfilePic from "../../assets/login.jpg";
import Footer from '../common/Footer'

function UserDashBoard() {

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 SAME LOGIC
  let email = localStorage.getItem("adminEmail");

  if (!email) {
    const queryParams = new URLSearchParams(location.search);
    email = queryParams.get("email");

    if (email) {
      localStorage.setItem("adminEmail", email);
    }
  }

  // 🔥 SAME API
  const APIURL = `http://localhost:8080/user/userProfile/${email}`;

  // 🔥 SAME STATE
  const [userData, setUserData] = useState({
    name: "",
    phone: "",
    city: ""
  });

  // 🔥 SAME STATE
  const [profilePic, setProfilePic] = useState(defaultProfilePic);

  // 🔥 SAME LOGIN CHECK
  useEffect(() => {
    if (!email) {
      navigate("/userLogin");
    }
  }, []);

  // 🔥 SAME API CALL
  useEffect(() => {

    const fetchData = async () => {
      try {

        const response = await axios.get(APIURL);

        setUserData(response.data);

        let imageUrl = defaultProfilePic;

        if (location.state?.imageURL) {
          imageUrl = location.state.imageURL;
        }
        else if (response.data.profilePic) {
          imageUrl = `http://localhost:8080/uploads/userprofileimages/${response.data.profilePic}`;
        }

        setProfilePic(imageUrl);

      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    if (email) fetchData();

  }, [email]);

  return (
    <>
      <UserHeader />

      <div className="dashboard-page">

        {/* HERO SECTION */}

        <div className="dashboard-hero">

          <div className="hero-overlay"></div>

          <div className="hero-content">

            <div className="profile-wrapper">

              <div className="profile-ring">

                <img
                  src={profilePic}
                  alt="profile"
                  className="profile-image"
                />

              </div>

              <div className="profile-info">

                <h1>
                  Welcome Back,
                  <span> {userData.name}</span>
                </h1>

                <p className="email-text">
                  {email}
                </p>

                <div className="smart-badge">
                  <i className="fa-solid fa-brain"></i>
                  AI Powered Smart Dashboard
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* QUICK STATS */}

        <div className="stats-grid">

          <div className="stats-card">

            <div className="stats-icon purple">
              <i className="fa-solid fa-location-dot"></i>
            </div>

            <div>
              <h3>City</h3>
              <p>{userData.city}</p>
            </div>

          </div>

          <div className="stats-card">

            <div className="stats-icon blue">
              <i className="fa-solid fa-phone"></i>
            </div>

            <div>
              <h3>Phone</h3>
              <p>{userData.phone}</p>
            </div>

          </div>

          <div className="stats-card">

            <div className="stats-icon green">
              <i className="fa-solid fa-book"></i>
            </div>

            <div>
              <h3>Notesy AI</h3>
              <p>Smart Notes Processing</p>
            </div>

          </div>

        </div>

        {/* MAIN FEATURE SECTION */}

        <div className="feature-section">

          <div className="section-title">
            <h2>
              <i className="fa-solid fa-bolt"></i>
              Quick Access
            </h2>
          </div>

          <div className="feature-grid">

            {/* USER DASHBOARD */}

            <div
              className="feature-card"
              onClick={() => navigate("/userdashboard")}
            >
              <div className="feature-icon">
                <i className="fa-solid fa-house"></i>
              </div>

              <h3>User Dashboard</h3>

              <p>
                Manage your Notesy dashboard
                and activities.
              </p>
            </div>

            {/* EDIT PROFILE */}

            <div
              className="feature-card"
              onClick={() => navigate("/userEditProfile")}
            >
              <div className="feature-icon">
                <i className="fa-solid fa-user-pen"></i>
              </div>

              <h3>Edit Profile</h3>

              <p>
                Update your personal information
                and settings.
              </p>
            </div>

            {/* PROFILE */}

            <div
              className="feature-card"
              onClick={() => navigate("/userprofileupload")}
            >
              <div className="feature-icon">
                <i className="fa-solid fa-user"></i>
              </div>

              <h3>User Profile</h3>

              <p>
                Upload and manage your
                profile picture.
              </p>
            </div>

            {/* PASSWORD */}

            <div
              className="feature-card"
              onClick={() => navigate("/userchangepassword")}
            >
              <div className="feature-icon">
                <i className="fa-solid fa-lock"></i>
              </div>

              <h3>Change Password</h3>

              <p>
                Keep your account secure
                with password updates.
              </p>
            </div>

            {/* FEEDBACK */}

            <div
              className="feature-card"
              onClick={() => navigate("/feedback")}
            >
              <div className="feature-icon">
                <i className="fa-solid fa-comment-dots"></i>
              </div>

              <h3>Feedback</h3>

              <p>
                Share your valuable feedback
                with Notesy.
              </p>
            </div>

            {/* UPLOAD NOTES */}

            <div
              className="feature-card"
              onClick={() => navigate("/uploadnotes")}
            >
              <div className="feature-icon">
                <i className="fa-solid fa-upload"></i>
              </div>

              <h3>Upload Notes</h3>

              <p>
                Upload notes and process
                them using AI.
              </p>
            </div>

            {/* HISTORY */}

            <div
              className="feature-card"
              onClick={() => navigate("/showHistory")}
            >
              <div className="feature-icon">
                <i className="fa-solid fa-clock-rotate-left"></i>
              </div>

              <h3>Notes History</h3>

              <p>
                Access previously summarized
                notes anytime.
              </p>
            </div>

            {/* SHARE */}

            <div
              className="feature-card"
              onClick={() => navigate("/sharenotes")}
            >
              <div className="feature-icon">
                <i className="fa-solid fa-share-nodes"></i>
              </div>

              <h3>Share Notes</h3>

              <p>
                Share smart summaries
                with other users.
              </p>
            </div>

            {/* VIEW NOTES */}

            <div
              className="feature-card"
              onClick={() => navigate("/viewnotes")}
            >
              <div className="feature-icon">
                <i className="fa-solid fa-eye"></i>
              </div>

              <h3>View Notes</h3>

              <p>
                Read and manage all
                your uploaded notes.
              </p>
            </div>

          </div>

        </div>

        {/* AI INFO SECTION */}

        <div className="ai-banner">

          <div className="ai-left">

            <h2>
              <i className="fa-solid fa-robot"></i>
              AI Powered Learning Platform
            </h2>

            <p>
              Notesy helps students and professionals
              summarize notes, generate audio learning,
              extract keywords, and improve productivity
              using modern AI technology.
            </p>

            <button
              className="explore-btn"
              onClick={() => navigate("/uploadnotes")}
            >
              Explore Features
            </button>

          </div>

          <div className="ai-right">
            <i className="fa-solid fa-brain"></i>
          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default UserDashBoard;