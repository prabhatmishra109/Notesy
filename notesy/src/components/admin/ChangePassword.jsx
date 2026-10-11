import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../css/adminchangepassword.css";
import { label } from "framer-motion/client";
import AdminDashBoard from "./AdminDashBoard2";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import Footer from "../common/Footer";

function ChangePassword() {

  const email = localStorage.getItem("adminEmail");

  const APIURL = `http://localhost:8080/admin/updatePassword/${email}`;

  const [cont, setCont] = useState({
    oldpass: "",
    newpass: "",
    confirmpass: ""
  });

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
const navigate =useNavigate();
  
  useEffect(()=>{
    
    if (email === null)
  navigate("/adminlogin")

  },[])
  const handleChange = (e) => {
    setCont({
      ...cont,
      [e.target.name]: e.target.value
    });
  };

  const submitData = async (e) => {
    e.preventDefault();

    if (cont.newpass !== cont.confirmpass) {
      alert("New Password and Confirm Password must match");
      return;
    }

    try {
      const res = await axios.patch(APIURL, cont);
      alert(res.data);
    } catch (error) {
      console.log(error);
      alert("Error updating password");
    }
  };

  return (

    <>
 <AdminHeader/>
 
    <div className="password-container">

      <div className="password-box">

        <h2>Change Password</h2>

        <form onSubmit={submitData}>

          <div className="input-group"
          
          
          >
         
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

export default ChangePassword;