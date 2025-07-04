// import React, { useState, useEffect } from 'react';
// import './sellerLogin.css';
// import { Link, useNavigate } from 'react-router-dom';

// function SellerLogin() {
//     const [showPassword, setShowPassword] = useState(false);
//     const [mobile, setMobile] = useState('');
//     const [password, setPassword] = useState('');

//     const navigate = useNavigate();

//     async function loginSeller(e) {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:4000/api/seller/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include', 
//                 body: JSON.stringify({ mobile, password }),
//             });

//             const data = await response.json();

//             if (data.Status === "Success") {
//                 // document.cookie = `mobile=${mobile}; path=/`;            // write a cooking
//                 // window.location.href = 'http://localhost:5175/dashboard';        //  Redirect current tab to the new URL
//                 // window.open("http://localhost:5175/dashboard","_blank") ;        //  open the URL new Browser tab or window
//                 window.open(`http://localhost:5175/dashboard`, "_blank");  
//             }
//             else {
//                 // alert(data.Error || "Login failed");
//                 swal(data.Error, {
//                     icon: "warning",
//                 });
//             }
//         } catch (error) {
//             swal(" Something went Wrong ", {
//                 icon: "warning",
//             });
//             console.error("Login error:", error);
//         }
//     }

//     return (
//         <div className="login-container">
//             <form className="login-box" onSubmit={loginSeller}>
//                 <p className='seller-login-page-close' onClick={() => navigate('/')}>x</p>
//                 <div className="align">
//                     <h2>Login</h2>

//                     <div className="input-container">
//                         <input
//                             type="text"
//                             className="input"
//                             required
//                             value={mobile}
//                             onChange={(e) => setMobile(e.target.value)}
//                         />
//                         <label className="user-Label">Enter Mobile</label>
//                     </div>

//                     <div className="input-container">
//                         <input
//                             type={showPassword ? 'text' : 'password'}
//                             className="input"
//                             required
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         <label className="user-Label">Enter Password</label>
//                     </div>

//                     <div className="show-password">
//                         <input
//                             type="checkbox"
//                             onChange={() => setShowPassword(!showPassword)}
//                         />
//                         <span>Show Password</span>
//                     </div>

//                     <button type="submit">SIGN IN</button>

//                     <div className="links">
//                         <p>Don't have an account? <Link to='/seller/signup'>Sign up</Link></p>
//                     </div>
//                 </div>
//             </form>
//         </div>

//     );
// }

// export default SellerLogin;



import React, { useState } from 'react';
import './sellerLogin.css';
import { Link, useNavigate } from 'react-router-dom';
import loginBgImg from '../../assets/navbar-img1.jpg'

function SellerLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function loginSeller(e) {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/seller/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ mobile, password }),
            });

            const data = await response.json();

            if (data.Status === "Success") {
                window.open(`http://localhost:5175/dashboard`, "_blank");
            } else {
                swal(data.Error, {
                    icon: "warning",
                });
            }
        } catch (error) {
            swal("Something went Wrong", {
                icon: "warning",
            });
            console.error("Login error:", error);
        }
    }

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={loginSeller}>
                <p className='seller-login-page-close' onClick={() => navigate('/')}>x</p>
                <div className="align">
                    <h2>Login</h2>

                    <div className="input-container">
                        <input
                            type="text"
                            className="input"
                            required
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                        />
                        <label className="user-Label">Enter Mobile</label>
                    </div>

                    <div className="input-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="input"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="user-Label">Enter Password</label>
                    </div>

                    <div className="show-password">
                        <input
                            type="checkbox"
                            onChange={() => setShowPassword(!showPassword)}
                        />
                        <span>Show Password</span>
                    </div>
                    <button type="submit">SIGN IN</button>

                    <div className="forgot-password-link">
                        If you forgot your password, <Link to="/seller/forgot-password">click here</Link>.
                    </div>

                    <div className="links">
                        <p>Don't have an account? <Link to='/seller/signup'>Sign up</Link></p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SellerLogin;
