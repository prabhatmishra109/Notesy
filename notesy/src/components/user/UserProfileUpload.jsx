import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';
import { FaCamera } from 'react-icons/fa';
import Footer from '../common/Footer';
import "../../css/userprofileupload.css"

function UserProfileUpload() {
  const navigate = useNavigate();
  const UPLOADURL = "http://localhost:8080/user/uploadPic";
  const email = localStorage.getItem("adminEmail");

  const [profilePic, setProfilePic] = useState(null);
  const [profileData, setProfileData] = useState({
    email: email,
    description: ""
  });

  
      
      useEffect(()=>{
        
        if (email === null)
      navigate("/userLogin")
    
      },[])

  const fetchData = (e) => {
    const { name, value, files, type } = e.target;
    if (type === "file") setProfilePic(files[0]);
    else setProfileData({ ...profileData, [name]: value });
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "profileImageDetail",
      new Blob([JSON.stringify(profileData)], { type: 'application/json' })
    );
    formData.append("imageFile", profilePic);

    try {
      const serverResponse = await axios.post(UPLOADURL, formData);
      navigate("/userdashboard", {
        state: { imageURL: serverResponse.data.imageURL }
      });
    } catch (err) {
      console.log(err);
      alert("❌ Error uploading profile image. Please try again.");
    }
  }

  // ===== Styles =====


  return (
    <>
      <UserHeader />

      <div className="upload-wrapper">
  <div className="upload-card">

    <div className="upload-header">
      <FaCamera className="upload-icon" />
      <h3>Upload Your Profile</h3>
      <p>
        Personalize your account by adding a profile picture and a short description about yourself. 🌟
      </p>
    </div>

    <form onSubmit={submitForm}>
      <input
        type="file"
        accept="image/*"
        name="profilePic"
        onChange={fetchData}
        className="upload-input"
        required
      />

      <textarea
        name="description"
        rows="4"
        placeholder="Write something about yourself..."
        onChange={fetchData}
        value={profileData.description}
        className="upload-input"
      />

      <button type="submit" className="upload-btn">
        Upload Profile
      </button>
    </form>

  </div>
</div>
      <Footer/>
    </>
  );
}

export default UserProfileUpload;