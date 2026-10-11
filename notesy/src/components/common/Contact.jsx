
import Swal from 'sweetalert2'
import Footer from "./Footer";
import Header2 from "./Header2";
import '../../css/contact.css'
import React, { useState } from "react";
import axios from 'axios';

function Contact() {
  const APIURL="http://localhost:8080/addContact"


  const [data,setData]=useState({name:"",email:"",phone:"",question:""})
  const[validate,setvalidate]=useState(false)
  const fetchData=(e)=>{
const{name,value}=e.target;//object des  namemeans control name

const alphaRegex=/^[A-Za-z\s]*$/;
const numberRegex=/^[0-9]*$/;
if (name === "phone") {
  if (!/^\d*$/.test(value)) {
    Swal.fire({
      title: "Format Error!!",
      text: "Only digits are allowed",
      icon: "error"
    });
    return;
  }

  // 👇 yaha main fix hai (max 10 digit)
  if (value.length > 10) {
    return;
  }
}
if((name==="name") && !alphaRegex.test(value))
  {
  // alert("only alphabets are allowed")
  
Swal.fire({
  title: "Format Error!!😒😒?",
  text: "Only alphbets are allowed?",
  icon: "error"
});
return;
  }
  if((name==="phone") && !numberRegex.test(value))
  {
  // alert("only digit are allowed")
  Swal.fire({
  title: "Format Error!!😒😒?",
  text: "Only digits are allowed?",
  icon: "error"
});
return;
  }

setData({...data,[name]:value})//value is inputed value and name is controlvalue

}

  //seting values in statevariable


  
    const submitForm=async(e)=>{
  // alert("in function")
  e.preventDefault()
  console.log(e.currentTarget)
  const form=e.currentTarget
  
  if (!form.checkValidity()) {
          e.preventDefault()
          e.stopPropagation()
        }
        setvalidate(true)
       if (!/^\d{10}$/.test(data.phone)) {
  Swal.fire({
    title: "Invalid Phone",
    text: "Phone number must be exactly 10 digits",
    icon: "error"
  });
  return;
}
//code for backend processing
try{

  const serverResponse=await axios.post(APIURL,data)
  console.log("send by spring boot"+serverResponse);
console.log(serverResponse.data);
// alert(serverResponse.data);

  Swal.fire({
  title: "contact staus",
  text: serverResponse.data,
  icon: "Sucess"
  
});

}catch(error){
  console.log(error)  
}
//Clear all the control(text field)
setData({name:"",email:"",phone:"",question:""})



    }

  return (
   <>
   <Header2/>
    <div className="main-container">

      <div className="card-container">

        {/* //Left Side Image */}
         <div className="left-side">
           <div>
            <h2>Welcome Back 👋</h2>
             <p>Contact yourself and explore amazing features with us.</p>
           </div>
         </div>

        {/* Right Side Form */}
        <div className="right-side">

          <h2 className="form-title">Contact</h2>

          <form onSubmit={submitForm} noValidate className={`needs-validation ${validate?'was-validated':''}`}>

            <div className="input-group">
              <i className="fa-solid fa-user icon "></i>
              <input type="text" placeholder="Full Name" required name="name" value={data.name} onChange={fetchData}/>
                            <div className="invalid-feedback">
        Please Enter Name
      </div>
            </div>

            <div className="input-group">
              <i className="fa-solid fa-envelope icon"></i>
              <input type="email" placeholder="Email Address" name="email" value={data.email} onChange={fetchData} required />
                      <div className="invalid-feedback">
        Please Enter Email
      </div>
            </div>
        

            <div className="input-group">
              <i className="fa-solid fa-phone icon"></i>
              <input type="text" placeholder="Phone Number" name="phone" value={data.phone} onChange={fetchData}  required/>
                            <div className="invalid-feedback">
        Please Enter phone
      </div>
            </div>

           

            <div className="input-group">
              <i className="fa-solid fa-location-dot icon"></i>
              <textarea rows="4" placeholder="Enter Question" name="question" value={data.question} onChange={fetchData} required  
  ></textarea>
                            <div className="invalid-feedback">
        Please Enter question
      </div>
            </div>

            <button className="register-btn">
              <i className="fa-solid fa-paper-plane"></i> Submit
            </button>

          </form>

        </div>

      </div>
 
       
       
    


      </div>
        <div  className="container">
<iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3558.4885685886024!2d81.05647677553287!3d26.887985426661896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sBBD%20univercity!5e0!3m2!1sen!2sin!4v1770980706888!5m2!1sen!2sin"  style={{border:"0",width:"100%",height:"300px"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
    
    <Footer/>
    </>
  );
}

export default Contact;
