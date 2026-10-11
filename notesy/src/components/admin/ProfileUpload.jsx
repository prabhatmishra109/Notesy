import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../admin/AdminHeader';
import Footer from '../common/Footer';

function ProfileUpload() {

  const fileRef = useRef(null);
  const navigate = useNavigate();
  const UPLOADURL = "http://localhost:8080/admin/uploadPic";

  const email = localStorage.getItem("adminEmail");

  const [profilePic, setProfilePic] = useState(null);
  const [profileData, setProfileData] = useState({
    email: email,
    description: ""
  });

  
  useEffect(()=>{
    
    if (email === null)
  navigate("/adminlogin")

  },[])
  // Handle input changes
  const fetchData = (e) => {
    const { name, value, files, type } = e.target;
    const maxSize = 2 * 1024 * 1024; // 2MB
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    if (type === "file") {
      const file = files[0];

      if (!allowedTypes.includes(file.type)) {
        alert("Only PNG, JPG, and WebP images are allowed");
        fileRef.current.value = "";
        setProfilePic(null);
        return;
      }

      if (file.size > maxSize) {
        alert("File size must be less than 2MB");
        fileRef.current.value = "";
        setProfilePic(null);
        return;
      }

      setProfilePic(file);
    } else {
      setProfileData({ ...profileData, [name]: value });
    }
  }

  // Submit form
  const submitForm = async (e) => {
    e.preventDefault();

    if (!profilePic) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "profileImageDetail",
      new Blob([JSON.stringify(profileData)], { type: 'application/json' })
    );
    formData.append("imageFile", profilePic);

    try {
      const serverResponse = await axios.post(UPLOADURL, formData);
      navigate("/admindashboard", {
        state: { imageURL: serverResponse.data.imageURL }
      });
    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    }
  }

  // ===== Styles =====
  const wrapperStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f8f9fa",
    paddingTop: "10px"
  };

  const cardStyle = {
    width: "450px",
    borderRadius: "15px",
    overflow: "hidden",
    background: "white",
    boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
    padding: "30px"
  };

  const headerStyle = {
    textAlign: "center",
    fontWeight: "600",
    fontSize: "22px",
    marginBottom: "25px",
    color: "#6a11cb"
  };

  const inputStyle = {
    borderRadius: "10px",
    padding: "12px",
    border: "1px solid #ced4da"
  };

  const buttonStyle = {
    background: "linear-gradient(90deg,#6a11cb,#a78bfa)",
    border: "none",
    padding: "12px 30px",
    borderRadius: "30px",
    fontWeight: "600",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease"
  };

  return (
    <>
      <AdminHeader />

      <div style={wrapperStyle}>
        <div style={cardStyle}>

          <h3 style={headerStyle}>Upload Profile Picture</h3>

          <form onSubmit={submitForm}>
            {/* File Input */}
            <div className="mb-3">
              <label className="form-label fw-bold">Select Image</label>
              <input
                type="file"
                accept="image/*"
                name="profilePic"
                className="form-control"
                onChange={fetchData}
                required
                ref={fileRef}
                style={inputStyle}
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="form-label fw-bold">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="4"
                placeholder="Write something about your profile..."
                onChange={fetchData}
                value={profileData.description}
                style={inputStyle}
              />
            </div>

            {/* Submit Button */}
            <div className="d-flex justify-content-center">
              <button type="submit" style={buttonStyle}>
                Upload Image
              </button>
            </div>

          </form>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default ProfileUpload;