import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import axios from 'axios'
import ContactDetail from './ContactDetail'
import { useNavigate } from 'react-router-dom'
import Footer from '../common/Footer'


function AllContact() {
    const email = localStorage.getItem("adminEmail");
    const APLURL="http://localhost:8080/admin/allContacts"
   
    const[contactData,setContactData]=useState([{}])
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
  setContactData(serverresponse.data);//updata the contact data state variabble
            }catch(error){
console.log(error)
            }
            
        }


fetchData()

    },[])//useeffect closed

    //function for delete contact

    const deleteContact=async(id)=>{
     
       const DELETEAPLURL=`http://localhost:8080/admin/deleteContact/${id}`

       try {
               const serverresponse= axios.delete(DELETEAPLURL)
               console.log(serverresponse);

               const updatedArray=contactData.filter((cobj)=>{
                return cobj.id!=id

               })

               setContactData(updatedArray)//modify state variable value
               
       } catch (error) {
        console.log(error)
       }

    }




  return (
    <>
   <AdminHeader/>
   <h3 style={{textAlign:"center",margin:"70px"}}>User Details</h3>
   <ContactDetail contactArray={contactData}
                      deleteByid  ={deleteContact}
                      />
    
    <Footer/>
    </>
  )
}

export default AllContact
