
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { FaHeadphones, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Modal } from 'antd';
import { DashboardOutlined, MailOutlined, HomeOutlined, AppstoreAddOutlined, SearchOutlined, LoginOutlined } from '@ant-design/icons';

import BuyerSignup from "../buyer/BuyerSignup";
import BuyerLogin from "../buyer/BuyerLogin";

import "./navbar.css";

export default function Navbar() {
    const [openModal, setOpenModal] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [buyerMobile, setBuyerMobile] = useState('');
    const [buyerData, setBuyerData] = useState();
    const navigate = useNavigate();

     const VITE_API_URL= 'https://realestate-project-1-ayx1.onrender.com'

    function getCookieValue() {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('buyerMobile='))
            ?.split('=')[1];
    }
    useEffect(() => {
        const mobileFromCookie = getCookieValue();
        if (mobileFromCookie) {
            setBuyerMobile(mobileFromCookie);
        }
    }, []);

    useEffect(() => {
        if (!buyerMobile) return;
        const fetchBuyer = async () => {
            try {
                // const response = await fetch(`http://localhost:4000/api/buyer/${buyerMobile}`);
                const response = await fetch(`${VITE_API_URL}/api/buyer/${buyerMobile}`);
                const data = await response.json();
                setBuyerData(data);
            } catch (error) {
                console.error("Error fetching buyer:", error.message);
            }
        };
        fetchBuyer();
    }, [buyerMobile]);

    const logout = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout !'
        }).then((result) => {
            if (result.isConfirmed) {
                document.cookie = "buyerMobile=; Max-Age=0";
                setBuyerMobile(null)
                setBuyerData(null)
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
                setOpenModal(false);
                setShowLoginModal(true);
            }
        });
    };

    // Responsive nav links
    const navLinks = (
        <>
            <a href="#" className="nav-option">For Buyers</a>
            <a href="#" className="nav-option">For Tenants</a>
            <a href="#" className="nav-option">For Owners</a>
            <a href="#" className="nav-option">For Dealers / Builders</a>
            <a href="#" className="nav-option">Insights</a>
            <a href="#" className="nav-option" onClick={()=>navigate('/admin-login')}>Admin Page</a>
        </>
    );

    return (
        <>
            <div className="container">
                <div className="bg-img">
                    <header className="header">
                        {/* <div className="logo">99acres</div> */}
                        <nav className={`nav ${mobileMenuOpen ? "open" : ""}`}>
                            {navLinks}
                        </nav>
                        <div className="header-actions">
                            <div className="post-property" onClick={() => navigate("/seller/login")}>
                                Post Property <button>FREE</button>
                            </div>
                            {/* <div className="headphone" title="Support"><FaHeadphones /></div> */}
                            <div className="profile" onClick={() => setOpenModal(true)} title="Profile"><FaUser /></div>
                            <div className="buyer-name" onClick={() => setOpenModal(true)}>
                                {buyerData?.full_name ? `Hi, ${buyerData.full_name.split(' ')[0]}` : "Sign in"}
                            </div>
                            <button
                                className="mobile-menu-btn"
                                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                            </button>
                        </div>
                    </header>
                </div>
            </div>

            {/* Open profile modal  */}
            {openModal && (
                <div className="profile-container">
                    <Modal
                        title=""
                        open={openModal}
                        onCancel={() => setOpenModal(false)}
                        footer={null}
                        style={{ top: 60, right: 15, position: "absolute", marginLeft: "auto" }}
                        width={300}
                    >
                        <div className="buyer-modal-content">
                            <button
                                className="login-btn"
                                onClick={() => {
                                    setOpenModal(false);
                                    setShowLoginModal(true);
                                }}
                            >
                                Login
                            </button>
                            <p className="signup-text">
                                New to RealEstateIndia?{" "}
                                <a href="#" onClick={() => {
                                    setOpenModal(false);
                                    setShowSignupModal(true);
                                }}>Sign Up</a>
                            </p>
                            <hr />
                            <p onClick={() => buyerMobile && navigate("/buyer-dashboard")}><DashboardOutlined /> My Dashboard</p>
                            <p onClick={() => buyerMobile && navigate("/buyer-dashboard")}><MailOutlined /> My Enquiry</p>
                            <p onClick={() => buyerMobile && navigate("/buyer-dashboard")}><HomeOutlined /> My Properties</p>
                            <p><AppstoreAddOutlined /> Property Leads</p>
                            <p><SearchOutlined /> Search by Property ID</p>
                            <p onClick={() => logout()}><LoginOutlined /> Logout</p>
                        </div>
                    </Modal>
                </div>
            )}

            {/*  open Sign Up Modal  */}
            {showSignupModal && (
                <BuyerSignup
                    open={showSignupModal}
                    onClose={() => setShowSignupModal(false)}
                    onSwitchToLogin={() => {
                        setShowSignupModal(false);
                        setShowLoginModal(true);
                    }}
                />
            )}

            {/*  open Login Modal  */}
            {showLoginModal && (
                <BuyerLogin
                    open={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                    onSwitchToSignup={() => {
                        setShowLoginModal(false);
                        setShowSignupModal(true);
                    }}
                />
            )}
        </>
    );
}