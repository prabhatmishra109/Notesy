


import React, { useState } from "react";
import Header2 from "../common/Header2";
import Footer from "../common/Footer";
import axios from "axios";
import "../../css/style.css";
import '../../css/user_login.css'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UserLogin() {

  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [validate, setvalidate] = useState(false);

  // 🔥 Forgot password states
  const [isForgot, setIsForgot] = useState(false);
  const [step, setStep] = useState(1); // 1=email, 2=otp, 3=new password
  const [otpData, setOtpData] = useState({ email: "", otp: "", password: "" });

  const fetchData = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const params = new URLSearchParams(window.location.search);
const email = params.get("email");

console.log(email);

  const fetchOtpData = (e) => {
    const { name, value } = e.target;
    setOtpData({ ...otpData, [name]: value });
  };

  // ================= LOGIN =================
  const submitForm = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
    }
    setvalidate(true);

    try {
      const res = await axios.post("http://localhost:8080/user/login", data);

      if (res.data === "Success") {
        localStorage.setItem("adminEmail", data.email);
        navigate("/userdashboard");
      } else {
        Swal.fire("Invalid Email or Password");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ================= SEND OTP =================
  const sendOtp = async () => {
    try {
      await axios.post(`http://localhost:8080/user/sendOtp/${otpData.email}`);
      Swal.fire("OTP sent to your email");
      setStep(2);
    } catch {
      Swal.fire("Email not found");
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    try {
      await axios.post("http://localhost:8080/user/verifyOtp", {
        email: otpData.email,
        otp: otpData.otp
      });
      Swal.fire("OTP Verified");
      setStep(3);
    } catch {
      Swal.fire("Invalid OTP");
    }
  };

  // ================= RESET PASSWORD =================
  const resetPassword = async () => {
    try {
      await axios.post("http://localhost:8080/user/resetPassword", {
        email: otpData.email,
        password: otpData.password
      });
      Swal.fire("Password Updated Successfully");
      setIsForgot(false);
      setStep(1);
    } catch {
      Swal.fire("Error updating password");
    }
  };

  return (
  <>
    <Header2 />

    <div className="login-main">
      <div className="login-wrapper">

        

        {/* RIGHT SIDE FORM */}
        <div className="login-form">

          <h2 className="login-heading">Welcome Back 👋 Login</h2>

          {/* ================= GOOGLE LOGIN ================= */}
          {!isForgot && (
            <button
              className="login-btn google-btn"
              onClick={() =>
                window.location.href =
                  "http://localhost:8080/oauth2/authorization/google"
              }
            >
              Continue with Google
            </button>
          )}

          {/* ================= LOGIN FORM ================= */}
          {!isForgot && (
            <form
              onSubmit={submitForm}
              noValidate
              className={`needs-validation ${validate ? "was-validated" : ""}`}
            >

              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={data.email}
                  onChange={fetchData}
                  required
                />
                <div className="invalid-feedback">Enter Email</div>
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={fetchData}
                  required
                />
                <div className="invalid-feedback">Enter Password</div>
              </div>

              <button type="submit" className="login-btn">
                Sign In
              </button>

              {/* LINKS */}
              <div className="extra-links">
                <a href="#" onClick={() => setIsForgot(true)}>
                  Forgot Password?
                </a>
              </div>

              <div className="extra-links">
                <a href="/userreg">Create Account</a>
              </div>
            </form>
          )}

          {/* ================= FORGOT PASSWORD ================= */}
          {isForgot && (
            <div>

              {step === 1 && (
                <>
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      onChange={fetchOtpData}
                    />
                  </div>

                  <button className="login-btn" onClick={sendOtp}>
                    Send OTP
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="form-group">
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      onChange={fetchOtpData}
                    />
                  </div>

                  <button className="login-btn" onClick={verifyOtp}>
                    Verify OTP
                  </button>
                </>
              )}

              {step === 3 && (
                <>
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter New Password"
                      onChange={fetchOtpData}
                    />
                  </div>

                  <button className="login-btn" onClick={resetPassword}>
                    Reset Password
                  </button>
                </>
              )}

              <div className="extra-links">
                <a href="#" onClick={() => setIsForgot(false)}>
                  Back to Login
                </a>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>

    <Footer />
  </>
);
}

export default UserLogin;