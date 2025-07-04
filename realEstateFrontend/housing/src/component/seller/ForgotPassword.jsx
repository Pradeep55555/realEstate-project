import React, { useState } from 'react';
import './sellerLogin.css';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const sendOtp = async () => {
        if (!email) {
            return swal("Please enter your registered email", { icon: "warning" });
        }

        try {
            const res = await fetch('http://localhost:4000/seller/send-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (data.Status === "Success") {
                swal("OTP sent to your email!", { icon: "success" });
                setOtpSent(true);
            } else {
                swal(data.Error || "Failed to send OTP", { icon: "warning" });
            }
        } catch (err) {
            console.error(err);
            swal("Something went wrong", { icon: "error" });
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!otpSent) {
            return swal("Please send OTP before resetting password", { icon: "warning" });
        }

        if (newPassword !== confirmPassword) {
            return swal("Passwords do not match", { icon: "warning" });
        }

        try {
            const res = await fetch('http://localhost:4000/seller/verify-otp-reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const data = await res.json();

            if (data.Status === "Success") {
                swal("Password reset successful!", { icon: "success" });
                navigate('/seller/login');
            } else {
                swal(data.Error || "Failed to reset password", { icon: "warning" });
            }
        } catch (err) {
            console.error(err);
            swal("Something went wrong", { icon: "error" });
        }
    };

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleResetPassword}>
                <p className='seller-login-page-close' onClick={() => navigate('/')}>x</p>
                <div className="align">
                    <h2>Reset Password</h2>

                    <div className="input-container">
                        <input
                            type="email"
                            className="input"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label className="user-Label">Registered Email</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            className="input"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <label className="user-Label">Enter OTP</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="password"
                            className="input"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <label className="user-Label">New Password</label>
                    </div>

                    <div className="input-container">
                        <input
                            type="password"
                            className="input"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label className="user-Label">Confirm Password</label>
                    </div>

                    <button type="button" onClick={sendOtp}>
                        {otpSent ? "Resend OTP" : "Send OTP"}
                    </button>

                    <button type="submit">Reset Password</button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;
