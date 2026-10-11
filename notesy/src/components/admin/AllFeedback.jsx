 import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import axios from 'axios'
import FeedbackDetail from './FeedbackDetail'
import '../../css/allfeedback.css'
import { useNavigate } from 'react-router-dom'
import Footer from '../common/Footer'

function AllFeedback() {
  const email = localStorage.getItem("adminEmail");
  const APIURL = "http://localhost:8080/admin/allFeedback"
  const [feedbackData, setFeedbackData] = useState([])
  const navigate =useNavigate();
    
    useEffect(()=>{
      
      if (email === null)
    navigate("/adminlogin")
  
    },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(APIURL)
        setFeedbackData(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  //function for delete contact

    // const deleteFeedback=async(id)=>{
     
    //    const DELETEAPLURL=`http://localhost:8080/admin/deleteFeedback/${id}`

    //    try {
    //            const serverresponse= axios.delete(DELETEAPLURL)
    //            console.log(serverresponse);

    //            const updatedArray=feedbackData.filter((fobj)=>{
    //             return fobj.id!=id

    //            })

    //            setFeedbackData(updatedArray)//modify state variable value
               
    //    } catch (error) {
    //     console.log(error)
    //    }

   const deleteFeedback = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/admin/deleteFeedback/${id}`);

    const updatedArray = feedbackData.filter(
      (f) => f.id !== id
    );

    setFeedbackData(updatedArray);

  } catch (error) {
    console.log(error);
  }
};
 

  return (
    <>
      <AdminHeader />

      <div className="feedback-page">

        

        <div className="feedback-container">
          <FeedbackDetail feedbackArray={feedbackData} 
           deleteByid  ={deleteFeedback}/>
        </div>

      </div>
      <Footer/>
    </>
  )
}

export default AllFeedback