



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./buyerForgotPassword.css";

const BuyerForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   const VITE_API_URL= 'https://realestate-project-1-ayx1.onrender.com'


  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      return Swal.fire("Missing Email", "Enter your registered email.", "warning");
    }

    setLoading(true);
    try {
      // const res = await axios.post("http://localhost:4000/buyer/send-otp", { email });
      const res = await axios.post(`${VITE_API_URL}/buyer/send-otp`, { email });

      if (res.status === 200) {
        Swal.fire("Success", res.data.message, "success");
        setOtpSent(true);
      }
    } catch (err) {
      if (err.response?.status === 404) {
        Swal.fire("Not Found", err.response.data.message, "error");
      } else {
        Swal.fire("Error", err.response?.data?.message || "Something went wrong", "error");
      }
    } finally {
      setLoading(false);
    }
  };


  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp || !newPassword || !confirmPassword) {
      return Swal.fire("Missing Fields", "Please fill all fields.", "warning");
    }
    if (newPassword !== confirmPassword) {
      return Swal.fire("Mismatch", "Passwords do not match.", "error");
    }

    setLoading(true);
    try {
      // const res = await axios.post("http://localhost:4000/buyer/reset-password", {
      const res = await axios.post(`${VITE_API_URL}/buyer/reset-password`, {
        email,
        otp,
        newPassword,
      });

      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Your password has been reset!",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        });

        navigate("/");
      } else {
        alert(res.data.message || "Failed to reset password.");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to reset password.";
      Swal.fire("Error", errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h2>Forgot Password</h2>
        <p className="subtitle">Enter your registered email to reset your password</p>

        <form onSubmit={otpSent ? handleResetPassword : handleSendOtp}>
          {/* Email Input */}
          <div className="pass-forgot-form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder=" "
              disabled={otpSent}
            />
            <label>Enter Your Registered Email</label>
          </div>

          {/* Show after OTP sent */}
          {otpSent && (
            <>
              <div className="pass-forgot-form-group">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>Enter OTP</label>
              </div>

              <div className="pass-forgot-form-group">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>New Password</label>
              </div>

              <div className="pass-forgot-form-group">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder=" "
                />
                <label>Confirm Password</label>
              </div>
            </>
          )}

          <button type="submit" className="reset-btn" disabled={loading}>
            {loading ? "Processing..." : otpSent ? "Reset Password" : "Send OTP"}
          </button>

          <p className="back-to-login">
            Remember your password?{" "}
            <span onClick={() => navigate("/")}>Go back to login</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default BuyerForgotPassword;
