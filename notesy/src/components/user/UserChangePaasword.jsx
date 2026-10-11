import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/userchangepassword.css";
import UserHeader from "./UserHeader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Footer from "../common/Footer";

function UserChangePassword() {
  const email = localStorage.getItem("adminEmail"); // user email from localStorage
  const APIURL = `http://localhost:8080/user/updatePassword/${email}`;

  const [cont, setCont] = useState({
    oldpass: "",
    newpass: "",
    confirmpass: ""
  });
  const navigate =useNavigate();
  
  useEffect(()=>{
    
    if (email === null)
  navigate("/userLogin")

  },[])

  // Eye toggle state
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setCont({
      ...cont,
      [e.target.name]: e.target.value
    });
  };

  const submitData = async (e) => {
    e.preventDefault();

    // Validate new password vs confirm password
    if (cont.newpass !== cont.confirmpass) {
      Swal.fire("New Password and Confirm Password must match");
      return;
    }

    try {
      const res = await axios.patch(APIURL, cont);
      if (res.status === 200) {
        alert(res.data); // Success message from backend
        setCont({ oldpass: "", newpass: "", confirmpass: "" }); // clear fields
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Axios error:", error.message);
      Swal.fire("Error updating password");
    }
  };

  return (
    <>
    <UserHeader/>
    <div className="password-container">
      <div className="password-box">
        <h2>Change Password</h2>

        <form onSubmit={submitData}>

          <div className="input-group">
            <input
              type={showOld ? "text" : "password"}
              name="oldpass"
              placeholder="Old Password"
              value={cont.oldpass}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowOld(!showOld)}>👁</span>
          </div>

          <div className="input-group">
            <input
              type={showNew ? "text" : "password"}
              name="newpass"
              placeholder="New Password"
              value={cont.newpass}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowNew(!showNew)}>👁</span>
          </div>

          <div className="input-group">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmpass"
              placeholder="Confirm Password"
              value={cont.confirmpass}
              onChange={handleChange}
              required
            />
            <span onClick={() => setShowConfirm(!showConfirm)}>👁</span>
          </div>

          <button type="submit">Submit</button>

        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default UserChangePassword;