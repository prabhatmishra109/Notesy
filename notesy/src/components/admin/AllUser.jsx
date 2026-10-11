
    
    import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import axios from 'axios'
import ContactDetail from './ContactDetail'
import UserDetail from './UserDetail'
import { useNavigate } from 'react-router-dom'
import Footer from '../common/Footer'


function AllUser() {
    const APLURL="http://localhost:8080/admin/alluser"
    const[userData,setUserData]=useState([{}])
const email = localStorage.getItem("adminEmail");
    const navigate =useNavigate();
  
  useEffect(()=>{
    
    if (email === null)
  navigate("/adminlogin")

  },[])
    useEffect(()=>{
        const fetchData=async () => {
            try{
  const serverresponse=await axios.get(APLURL)
  console.log(serverresponse.data)
  setUserData(serverresponse.data);//updata the contact data state variabble
            }catch(error){
console.log(error)
            }
            
        }


fetchData()

    },[])
  return (
    <>
   <AdminHeader/>
   <h3 style={{textAlign:"center",margin:"70px"}}>User Details</h3>
   <UserDetail userArray={userData}/>
    
    <Footer/>
    </>
  )
}



export default AllUser
