import React, { useState } from 'react';
import './adminLogin.css';
import { FcGoogle } from 'react-icons/fc';
import { FaArrowLeft, FaMoon, FaSun } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme', !darkMode);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (
      email === 'pradeepdhakad095@gmail.com' &&
      password === 'Pradeep@123'
    ) {
      Swal.fire('Success!', 'Login Successful', 'success').then(() => {
        // window.open(`http://localhost:5176`, "_blank");
        window.open(`https://real-estate-admin-page.vercel.app/`, "_blank");
      });
    } else {
      Swal.fire('Error', 'Invalid email or password', 'error');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="top-bar">
          <div className="back-icon" onClick={() => navigate('/')}>
            <FaArrowLeft size={20} />
          </div>
          <div className="icon-toggle" onClick={toggleTheme}>
            {darkMode ? (
              <FaSun size={20} title="Light Mode" />
            ) : (
              <FaMoon size={20} title="Dark Mode" />
            )}
          </div>
        </div>

        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group floating-label">
            <input
              type="email"
              placeholder=" "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>

          <div className="form-group floating-label">
            <input
              type="password"
              placeholder=" "
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>

          <button type="submit" className="login-button">Login</button>

          <div className="or-divider"><span>OR</span></div>

          <button type="button" className="social-button google-btn">
            <FcGoogle size={20} /> &nbsp; Login with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
