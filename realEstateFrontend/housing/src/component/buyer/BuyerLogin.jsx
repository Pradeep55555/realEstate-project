


import React, { useState } from "react";
import { Modal } from "antd";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import { auth, googleProvider, githubProvider, signInWithPopup } from "../../firebase";

import "./buyerLogin.css";

export default function BuyerLogin({ open, onClose, onSwitchToSignup }) {

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

 const VITE_API_URL= 'https://realestate-project-1-ayx1.onrender.com'


  const navigate = useNavigate();

  //  Normal Login Submit  ***//  buyer fill information 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { identifier, password };

    try {
      // const res = await fetch("http://localhost:4000/api/buyer/login", {
      const res = await fetch(`${VITE_API_URL}/api/buyer/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      if (data.Status === "Success") {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: "You are now logged in.",
          confirmButtonColor: "#1890ff",
        });

        setIdentifier("");
        setPassword("");
        onClose();

        setTimeout(() => {
          window.location.reload();
        }, 1000);

        navigate("/buyer-dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: data.message || data.Error || "Invalid email or mobile number.",
          confirmButtonColor: "#ff4d4f",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: err.message || "Something went wrong. Please try again.",
        confirmButtonColor: "#ff4d4f",
      });
    }
  };

  //  Google Login Handler  // login by Google

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const payload = {
        full_name: user.displayName,
        email: user.email,
      };

      const res = await fetch(`${VITE_API_URL}/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      if (data.Status === "Success") {
        Swal.fire({
          icon: "success",
          title: "Google Login Successful!",
          text: `Welcome, ${user.displayName}`,
          confirmButtonColor: "#1890ff",
        });

        onClose();
        setTimeout(() => window.location.reload(), 1000);
        navigate("/buyer-dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: data.message || "Server error",
          confirmButtonColor: "#ff4d4f",
        });
      }
    } catch (error) {
      if (error.code === "auth/popup-closed-by-user") {
        Swal.fire({
          icon: "warning",
          title: "Login Cancelled",
          text: "You closed the login popup. Please try again.",
          confirmButtonColor: "#ffcc00",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
          confirmButtonColor: "#ff4d4f",
        });
      }
    }
  };
  //  Github Login Handler  // login by Github

  const handleGithubLogin = async () => {
    try {
      //  Add this line to request user email
      githubProvider.addScope('user:email');  ////////// 

      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;


      const payload = {
        full_name: user.displayName || "GitHub User",
        email: user.email,
      };

      // payload.email = 'pradeepdhakad095@gmail.com'   ///  email not received from github 
     
      //  Double-check email is present
      if (!user.email) {
        alert("GitHub login failed: Email not found. Make sure your GitHub email is public or verified.");
        return;
      }

      const res = await fetch(`${VITE_API_URL}/github-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      const data = await res.json();

      if (data.Status === "Success") {
        Swal.fire({
          icon: "success",
          title: "GitHub Login Successful!",
          text: `Welcome, ${user.displayName || "GitHub User"}`,
          confirmButtonColor: "#1890ff",
        });

        onClose();
        setTimeout(() => window.location.reload(), 1000);
        navigate("/buyer-dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: data.message || "Server error",
          confirmButtonColor: "#ff4d4f",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "GitHub Login Failed",
        text: error.message,
        confirmButtonColor: "#ff4d4f",
      });
    }
  };


  return (
    <Modal
      title="Buyer Login"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={350}
    >
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
            placeholder=" "
          />
          <label>Email or Mobile</label>
        </div>

        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            required
          />
          <label>Password</label>
        </div>
        

        <div className="show-password-toggle">
          <input
            type="checkbox"
            id="showPasswordLogin"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPasswordLogin">Show Password</label>
          <p className="buyer-forgot-password" onClick={() => navigate("/buyer/forgot-password")}>Forgot Password ? </p>
        </div>

        <button type="submit" className="login-seller-btn"> Login </button>

        <button type="button" className="google-login-btn" onClick={handleGoogleLogin} >
          <img src="https://pixy.org/src/476/4766956.png" alt="" width="20" />
          Continue with Google
        </button>

        <div style={{ textAlign: "center", fontWeight: "500", color: "#555" }}>Or continue with</div>

        <div className="social-login-btn-div" >
          <img
            onClick={handleGithubLogin}
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="GitHub" width="30" className="social-login-btn"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
            alt="LinkedIn" width="30" className="social-login-btn"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
            alt="Twitter" width="30" className="social-login-btn"
          />
          <img
            src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
            alt="Facebook" width="30" className="social-login-btn"
            title="Coming Soon"
          />
        </div>


        <p className="switch-text">
          Don't have an account?{" "}
          <a href="#" onClick={(e) => { e.preventDefault(); onClose(); onSwitchToSignup(); }}> Sign Up</a>
        </p>
      </form>
    </Modal>
  );
}
