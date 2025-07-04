import React, { useState } from 'react';
import swal from 'sweetalert'
import './sellerSignup.css';
import { Link, useNavigate } from 'react-router-dom'

function SellerSignup() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  let [name, setName] = useState('');
  let [mobile, setMobile] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let sellerApiURL = 'http://localhost:4000/api/seller/signup';

  const navigate = useNavigate();

  ///////// POST Method For SELLER Ragistration /////////////

  async function sellerRagister() {

    if (loading) return; // ⬅️ Prevent multiple submissions
    if (name === '' || mobile === '' || email === '' || password === '') {
      swal("All fields are required", { icon: "warning" });
      return;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[@_$])[A-Za-z0-9@_$]{5,}$/;

    if (!passwordRegex.test(password.trim())) {
      swal("Password must contain letters, numbers, one of @ _ $, and be at least 5 characters long.", {
        icon: "warning"
      });
      return;
    }


    setLoading(true); // ⬅️ Disable button during API call

    try {
      let response = await fetch(sellerApiURL, {
        method: "POST",
        headers: {
          "content-Type": "application/json"
        },
        body: JSON.stringify({ full_name: name.trim(), mobile: mobile.trim(), email: email.trim(), password: password.trim() })
      });
      let res = await response.json();
      if (res?.Response?.affectedRows === 1) {
        swal(" Seller has been Register Successfully !", { icon: "success" });
        navigate('/seller/login');
      } else if (res.message === "this seller already exist") {
        swal(" Seller Already Register !", { icon: "warning" });
      } else {
        console.log("Unexpected response format:", res);
        swal("Something went wrong!", { icon: "error" });
      }
    } catch (err) {
      console.error(err);
      swal("Error during registration", { icon: "error" });
    } finally {
      setLoading(false); // ⬅️ Re-enable button
    }
  }


  return (
    <div className="signup-container">
      <form className="signup-box">
        <p className='seller-signup-page-close' onClick={() => navigate('/')}>x</p>
        <div className="align">
          <h2>Sign Up</h2>
          <div className="input-container">

            <input
              className="input"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className='user-Label'>Full Name</label>
          </div>

          <div className="input-container">
            <input
              type="text"
              className="input"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <label className="user-Label"> Mobile Number</label>
          </div>

          <div className="input-container">
            <input
              type="email"
              className="input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="user-Label"> Email Id</label>
          </div>

          <div className="input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              className="input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="user-Label">Password</label>
          </div>



          <div className="show-password">
            <input type="checkbox" onChange={() => setShowPassword(!showPassword)} />
            <span>Show Password</span>
          </div>
          <button type="submit" onClick={async (e) => { e.preventDefault(); sellerRagister(); }}>SIGN UP</button>

          <div className="links">
            <p> Already have an account?  <Link to='/seller/login'>Login</Link></p>
          </div>
        </div>
      </form>
    </div>

  );
}

export default SellerSignup;
