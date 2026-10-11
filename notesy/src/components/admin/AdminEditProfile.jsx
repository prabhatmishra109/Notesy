import React, { useEffect, useState, } from 'react'
import AdminHeader from './AdminHeader'
import axios from 'axios'
//import '../../css/admindashboard.css'
import {ToastContainer,toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom'

import "../../css/admineditprofile.css"
import Footer from '../common/Footer';

function AdminEditProfile() {

  const email = localStorage.getItem("adminEmail")
  const APIURL = `http://localhost:8080/admin/adminProfile/${email}`
  const EDITAPIURL=`http://localhost:8080/admin/editProfile/${email}`

  const [admindata, setAdminData] = useState({
    name: "",
    phone: ""
   
  })
  const navigate=useNavigate()
 
   
   useEffect(()=>{
     
     if (email === null)
   navigate("/adminlogin")
 
   },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverresponse = await axios.get(APIURL)
        // setAdminData(serverresponse.data)


        setAdminData({
          name:serverresponse.data.name,
          phone:serverresponse.data.phone
        })
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const fillData=(e)=>{

setAdminData({
  ...admindata,[e.target.name]:e.target.value
})

  }



  //sending data with email for profile updation
const submitData = async (e) => {
  e.preventDefault()
  try {
    

    const response = await axios.put(EDITAPIURL, admindata);

    console.log(response);
    // alert("data updated successfully")


    toast.success("Profile Updated Successfully")

    setTimeout(()=>{
      navigate("/admindashboard")
    },2000)
  } 
  catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <AdminHeader />
    <div className="admin-edit-page">
  <div className="edit-card">

    <h2>Edit Profile</h2>

    <form onSubmit={submitData}>

      <div className="edit-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={admindata.name}
          onChange={fillData}
          required
        />
      </div>

      <div className="edit-group">
        <label>Phone Number</label>
        <input
          type="text"
          name="phone"
          value={admindata.phone}
          onChange={fillData}
          required
        />
      </div>

      <button className="edit-btn">
        Update Profile
      </button>

    </form>

  </div>
</div>

     <Footer/>
    </>
  )
}

export default AdminEditProfile