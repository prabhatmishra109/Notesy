import React, { useEffect, useState } from 'react'
import UserHeader from './UserHeader'
import axios from 'axios'
// import '../../css/userdashboard.css'
import '../../css/usereditprofile.css'
 import Swal from "sweetalert2";

import { useNavigate } from 'react-router-dom'
import Footer from '../common/Footer';

function UserEditProfile() {

  const email = localStorage.getItem("adminEmail")
  const APIURL = `http://localhost:8080/user/userProfile/${email}`
  const EDITAPIURL=`http://localhost:8080/user/editProfile/${email}`

  const [userdata, setUserData] = useState({
    name: "",
    phone: "",
    city: ""
  })
  const navigate =useNavigate();
    
    useEffect(()=>{
      
      if (email === null)
    navigate("/userLogin")
  
    },[])

   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverresponse = await axios.get(APIURL)
        setUserData(serverresponse.data)

         setUserData({
          name:serverresponse.data.name,
          phone:serverresponse.data.phone,
          city:serverresponse.data.city
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

   const fillData=(e)=>{

setUserData({
  ...userdata,[e.target.name]:e.target.value
})

  }

 

  

  //sending data with email for profile updation
const submitData = async (e) => {
  e.preventDefault()
  try {
      

    const serverResponse = await axios.put(EDITAPIURL, userdata);

    console.log(serverResponse.data);
  

Swal.fire({
  title: "Success",
  text: "Profile Updated Successfully",
  icon: "success",
});
  } 
  catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <UserHeader />
      <div className="user-edit-page">

  <div className="user-edit-card">

    {/* Avatar */}
    <div className="user-avatar">
      {userdata.name ? userdata.name.charAt(0).toUpperCase() : "U"}
    </div>

    <h2>Edit Profile</h2>

    <form onSubmit={submitData}>

      <div className="user-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={userdata.name}
          onChange={fillData}
          required
        />
      </div>

      <div className="user-group">
        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={userdata.phone}
          onChange={fillData}
          required
        />
      </div>

      <div className="user-group">
        <label>City</label>
        <input
          type="text"
          name="city"
          value={userdata.city}
          onChange={fillData}
          required
        />
      </div>

      <button className="user-btn">
        Update Profile
      </button>

    </form>

  </div>
</div>
<Footer/>
    </>
  )
}

export default UserEditProfile




