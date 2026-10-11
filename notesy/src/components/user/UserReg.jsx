import React, { useState } from "react";
import "../../css/userreg.css";
import Footer from "../common/Footer";
import Header2 from "../common/Header2";
import Swal from 'sweetalert2'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserReg() {

  const APIURLs="http://localhost:8080/user/registration"
 const navigate=useNavigate()
 
    const [data,setData]=useState({name:"",email:"",phone:"",city:"",password:""})
    const[validate,setvalidate]=useState(false)
    const fetchData=(e)=>{
  const{name,value}=e.target;//object des  namemeans control name
  
  const alphaRegex=/^[A-Za-z\s]*$/;
  const numberRegex=/^[0-9]*$/;
  
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
          try{

  const serverResponse=await axios.post(APIURLs,data)
  console.log("send by spring boot"+serverResponse);
console.log(serverResponse.data);
Swal.fire("Register Sucessfully")
navigate("/userLogin")

}catch(error){
  console.log(error)  
}

        }

        //code to checkemail exist or not


        const checkEmail= async(email) => {
          const APIURLcheckEmail=`http://localhost:8080/user/checkEmail/${email}`
          try {
            const serverresponse=await axios.get(APIURLcheckEmail)
            console.log(serverresponse.data);
            if (serverresponse.data==='exists') {
            Swal.fire("Email Already Exists")
              document.getElementById("email").value="";
              


            }
            
          } catch (error) {
            console.log(error);
            
          }
        }

  return (
    <>
    <Header2/>
      <div className="register-main">

        <div className="register-wrapper">

          {/* LEFT SIDE */}
          <div className="register-left">
            <h1>Welcome to NOTESY</h1>
            <p>
              Join India's smart academic notes platform.
              Organize, share and access study materials easily.
            </p>
            <img src="download (1).jpg" alt="register" />
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="register-right">

            <h2>Create Account</h2>

            <form onSubmit={submitForm}noValidate className={`needs-validation ${validate?'was-validated':''}`}>

              <div className="form-group">
                <input type="text"
                  name="name"
                  placeholder="Full Name"
                  value={data.name}
                  onChange={fetchData}
                  required />
                     <div className="invalid-feedback">
        Please Enter Name
      </div>
              </div>

              <div className="form-group">
                <input type="email"
                id="email"
                  name="email"
                  placeholder="Email Address"
                  value={data.email}
                  onChange={fetchData}
                  onBlur={()=>{
checkEmail(data.email)
                  }}
                  required />
                     <div className="invalid-feedback">
        Please Enter Email
      </div>
              </div>

              <div className="form-group">
                <input type="password"
                  name="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={fetchData}
                  required />
                     <div className="invalid-feedback">
        Please Enter Password
      </div>
              </div>

              <div className="form-group">
                <input type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={data.phone}
                  onChange={fetchData}
                  required />
                     <div className="invalid-feedback">
        Please Enter Phone
      </div>
              </div>

              <div className="form-group">
                <select
                  name="city"
                  value={data.city}
                  onChange={fetchData}
                  required>
                  <option value="">Select City</option>
                  <option>Delhi</option>
                  <option>Mumbai</option>
                  <option>Lucknow</option>
                  <option>Kanpur</option>
                  <option>Varanasi</option>
                </select>
                   <div className="invalid-feedback">
        Please Enter city
      </div>
              </div>

              <button type="submit" className="register-btn">
                Register Now
              </button>

            </form>
          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default UserReg;
