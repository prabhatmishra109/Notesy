


import React from 'react'
import Header2 from '../common/Header2'
import axios from 'axios'
import { useState,useEffect } from 'react'
import FetchFeedbackDetails from './FetchFeedbackDetails'
import Footer from '../common/Footer'
function FetchFeedback() {
  const APIURL="http://localhost:8080/fetchFeedback"
        const [feeddata,setFeedData]=useState([{}])
        useEffect(()=>{
            const fetchData=async()=>{
                try{
                    const serverResponse=await axios.get(APIURL)
                    console.log(serverResponse.data);
                    setFeedData(serverResponse.data)//update the contactdata state variable
                }
                catch(error)
                {
                    console.log(error);
                }
            }
            fetchData()
        },[])
    return (
    <>
        <Header2/>
        {/* <h1 style={{textAlign:"center"}}>All registered users of Tripease</h1> */}
        <FetchFeedbackDetails feedArray={feeddata} />
        <Footer/>
    </>
  )
}

export default FetchFeedback