import React, { useState } from "react";
import { Modal, message } from "antd";
import Swal from "sweetalert2";

import "./buyerSignup.css";

export default function BuyerSignup({ open, onClose, onSwitchToLogin }) {

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // new state

     const VITE_API_URL= 'https://realestate-project-1-ayx1.onrender.com'

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      full_name: fullName,
      mobile,
      email,
      password,
    };

    try {
      // const res = await fetch("http://localhost:4000/api/buyer/signup", {
      const res = await fetch(`${VITE_API_URL}/api/buyer/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Buyer has been registered successfully.",
          confirmButtonColor: "#1890ff",
        });


        setFullName("");
        setMobile("");
        setEmail("");
        setPassword("");
        onClose();
        
        onSwitchToLogin()

      } else {
        const data = await res.json();
        message.error(data.message || "Signup failed");
      }
    } catch (err) {
      message.error("Network error: " + err.message);
    }
  };

  return (
    <Modal
      title="Create Your Account"
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={350}
    >
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="full_name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder=" "
          />
          <label>Full Name</label>
        </div>

        <div className="form-group">
          <input
            type="text"
            name="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            placeholder=" "
            pattern="[6-9][0-9]{9}"
            title="Enter a valid mobile number"
          />
          <label>Mobile</label>
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
          />
          <label>Email</label>
        </div>

        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"} // toggle password visibility
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
          />
          <label>Password</label>
        </div>

        {/* Show Password checkbox */}
        <div className="show-password-toggle">
          <input
            type="checkbox"
            id="showPasswordSignup"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="showPasswordSignup">Show Password</label>
        </div>

        <button type="submit" className="signup-btn">
          Sign Up
        </button>

        {/* Switch to login */}
        <p className="switch-text">
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              if (onSwitchToLogin) onSwitchToLogin();
            }}
          >
            Login
          </a>
        </p>
      </form>
    </Modal>
  );
}
