import React, { useEffect, useState } from "react";
import "../../css/feedback.css";
import { FaStar } from "react-icons/fa";
import axios from "axios";

import UserHeader from "./UserHeader";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Footer from "../common/Footer";

function Feedback() {

  const userEmail = localStorage.getItem("adminEmail");
  const APIURL = "http://localhost:8080/user/feedback"; // your spring boot API

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [error, setError] = useState("");
const navigate =useNavigate();
    
    useEffect(()=>{
      
      if (userEmail === null)
    navigate("/userLogin")
  
    },[])
  const submitForm = async (e) => {
    e.preventDefault();

    if (!review || rating === 0) {
      setError("Please write review and select rating ⭐");
      return;
    }

    setError("");

    const data = {
      email: userEmail,
      review: review,
      rating: rating,
    };

    try {
      const response = await axios.post(APIURL, data);
      console.log("Response from Spring Boot:", response.data);
    Swal.fire("Feedback submit Successfully");

      setReview("");
      setRating(0);

    } catch (err) {
      console.log(err);
      alert("Error while submitting feedback ❌");
    }
  };

  return (
    <>
   <UserHeader/>
     
      
     

      <div className="feedback-container">
        <form className="feedback-card" onSubmit={submitForm}>

          <h3 className="title">Rate Us</h3>

          {error && <p className="error">{error}</p>}

          <div className="form-group">
            <label>Email ID</label>
            <input
              type="email"
              value={userEmail}
              readOnly
              className="readonly-input"
            />
          </div>

          <div className="form-group">
            <label>Your Review</label>
            <textarea
              placeholder="Write your feedback here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </div>

          <div className="star-section">
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label key={index}>
                  <input
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                  />
                  <FaStar
                    className="star"
                    size={30}
                    color={
                      currentRating <= (hover || rating)
                        ? "#ffc107"
                        : "#e4e5e9"
                    }
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
          </div>

          <button type="submit" className="submit-btn">
            Submit Feedback
          </button>

        </form>
      </div>

   <Footer/>
    </>
  );
}

export default Feedback;
