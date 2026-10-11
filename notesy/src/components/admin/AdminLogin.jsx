// import React, { useState } from "react";
// import Header2 from "../common/Header2";
// import Footer from "../common/Footer";
// import "../../css/admin_login.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import Swal from "sweetalert2";

// function AdminLogin() {
//   const navigate = useNavigate();
//   const APIURL = "http://localhost:8080/admin/login";

//   const [data, setData] = useState({ email: "", password: "" });
//   const [showPassword, setShowPassword] = useState(false);
//   const [remember, setRemember] = useState(false);

//   const fetchData = (e) => {
//     const { name, value } = e.target;
//     setData({ ...data, [name]: value });
//   };

//   const submitForm = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post(APIURL, data);

//       if (res.data === "Success") {
//         if (remember) {
//           localStorage.setItem("adminEmail", data.email);
//         }

//         Swal.fire({
//           icon: "success",
//           title: "Login Successful",
//           timer: 1500,
//           showConfirmButton: false,
//         });

//         setTimeout(() => navigate("/admindashboard"), 1500);
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Invalid Email or Password",
//         });
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: "error",
//         title: "Server Error",
//       });
//     }
//   };

//   return (
//     <>
//       <Header2 />


//   <div className="admin-login-page">
//     <div className="login-wrapper">
//         <div className="login-card">

//           {/* LEFT */}
//           <div className="left-panel">
//             <h2>Admin Panel</h2>
//             <p>Secure Login Access</p>
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
//               alt="admin"
//             />
//           </div>

//           {/* RIGHT */}
//           <div className="right-panel">
//             <h2>Login</h2>

//             <form onSubmit={submitForm}>

//               <div className="input-box">
//                 <input
//                   type="email"
//                   name="email"
//                   required
//                   onChange={fetchData}
//                 />
//                 <label>Email</label>
//               </div>

//               <div className="input-box password-box">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   required
//                   onChange={fetchData}
//                 />
//                 <label>Password</label>

//                 <span onClick={() => setShowPassword(!showPassword)}>
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>

//               <div className="options">
//                 <input
//                   type="checkbox"
//                   checked={remember}
//                   onChange={() => setRemember(!remember)}
//                 />
//                 <label> Remember Me</label>
//               </div>

//               <button className="login-btn"> Admin Login</button>

//             </form>
//           </div>

//         </div>
//       </div>
//       </div>

//       <Footer />
//     </>
//   );
// }

// export default AdminLogin;

import React, { useState } from "react";
import Header2 from "../common/Header2";
import Footer from "../common/Footer";
import "../../css/admin_login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";

function AdminLogin() {
  const navigate = useNavigate();
  const APIURL = "http://localhost:8080/admin/login";

  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  const fetchData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(APIURL, data);

      if (res.data === "Success") {

        // 🔥 FIX 1: हमेशा save करो (important)
        localStorage.setItem("adminEmail", data.email);

        // optional (remember flag)
        if (remember) {
          localStorage.setItem("rememberAdmin", "true");
        }

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => navigate("/admindashboard"), 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid Email or Password",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
      });
    }
  };

  return (
    <>
      <Header2 />

      <div className="admin-login-page">
        <div className="login-wrapper">
          <div className="login-card">

            {/* LEFT */}
            <div className="left-panel">
              <h2>Admin Panel</h2>
              <p>Secure Login Access</p>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
                alt="admin"
              />
            </div>

            {/* RIGHT */}
            <div className="right-panel">
              <h2>Login</h2>

              <form onSubmit={submitForm}>

                <div className="input-box">
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={fetchData}
                  />
                  <label>Email</label>
                </div>

                <div className="input-box password-box">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    onChange={fetchData}
                  />
                  <label>Password</label>

                  <span onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <div className="options">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                  />
                  <label> Remember Me</label>
                </div>

                {/* 🔥 FIX 2: type="submit" add */}
                <button type="submit" className="login-btn">
                  Admin Login
                </button>

              </form>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AdminLogin;