import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CgProfile } from "react-icons/cg";
import { Layout, Menu, Breadcrumb, Card, Typography, Modal } from 'antd';
import { DashboardOutlined, ShoppingOutlined, LogoutOutlined, LockOutlined, EyeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';

import Swal from 'sweetalert2';

import ChangePassword from '../profileDetails/ChangePassword';
import DashContent from './DashContent';
import MyProperty from '../myProperty/MyProperty';
import Inquiry from '../inquiry/Inquiry';

import './dashboard.css';

function Dashboard() {

  const [view, setView] = useState('dashboard');
  const [mobile, setSellerMobile] = useState('');
  const [sellerInfo, setSellerInfo] = useState({});
  const [sellerDetails, setSellerDetails] = useState([]);
  const [checkProfileComplete, setCheckProfileComplete] = useState(false);
  const [openSellerProfileModal, setOpenSellerProfileModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);


  const navigate = useNavigate();

  const { Header, Content, Sider } = Layout;
  const { Title } = Typography;

  //***********   access seller mobile from cookies   ******************

  function getCookieValue() {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith('sellerMobile='))
      ?.split('=')[1];
  }

  useEffect(() => {
    const mobileFromCookie = getCookieValue();
    if (mobileFromCookie) {
      setSellerMobile(mobileFromCookie);
    }
  }, []);

  //***********   Fetch seller information  when mobile is set   ******************
  useEffect(() => {
    async function getSellerInfo() {
      if (!mobile) return;

      try {
        const response = await fetch(`http://localhost:4000/api/seller/info/${mobile}`);
        if (!response.ok) throw new Error("Failed to fetch seller");

        const seller = await response.json();
        // console.log("Fetched seller:", seller);
        setSellerInfo(seller);
      } catch (error) {
        console.error("Error fetching seller name:", error);
      }
    }

    getSellerInfo();
  }, [mobile]);

  ///////////////  fetch  Seller Other  Details  /////////////

  async function getSellerDetails() {
    try {
      const response = await fetch(`http://localhost:4000/api/seller/details/${mobile}`);

      if (response.status === 404) {
        setCheckProfileComplete(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const finalResult = await response.json();

      setSellerDetails(finalResult);
      setCheckProfileComplete(true);

    } catch (error) {
      console.error("Error fetching seller details ", error);
      setCheckProfileComplete(false);
    }
  }

  useEffect(() => {
    if (mobile) {
      getSellerDetails();
    }
  }, [mobile]);

  // **** logout funtion for seller  ***********

  const logout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      text: "You will be redirected to the login page.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        document.cookie = "sellerMobile=; Max-Age=0; path=/";
        setSellerMobile(null)
        navigate('/dashboard');
      }
    });
  };

  //////**************************************

  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider breakpoint="lg" collapsedWidth="0" width={150} >
          <div className="logo" style={{ height: 32, margin: 16, color: 'white', fontSize: '18px' }}>
            Seller Panel
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
              onClick: () => setView("dashboard")
            },
            {
              key: '2',
              icon: <ShoppingOutlined />,
              label: 'Properties',
              onClick: () => setView("properties"),

            },
            {
              key: '3',
              icon: <EyeOutlined />,
              label: 'Inquiries',
              onClick: () => setView("inquiries"),
            },
            {
              key: '4',
              icon: <SettingOutlined />,
              label: 'Settings',
              onClick: () => setView("settings"),
            },
            {
              key: '5',
              icon: <LogoutOutlined />,
              label: 'Logout',
              onClick: () => { logout() }
            }

          ]} />
        </Sider>

        <Layout>
          <Header style={{ background: '#fff', padding: 2, height: 'auto' }}>
            <Title level={3} style={{ margin: 0, padding: "2px", textAlign: 'end' }}>
              <span className="sellerName-text">Welcome :- {sellerInfo.full_name}</span>
              <CgProfile className='profile-icon' onClick={() => setOpenSellerProfileModal(true)} />
            </Title>
          </Header>

          <Breadcrumb className="responsive-breadcrumb" items={[
            { title: 'Seller' },
            { title: view.charAt(0).toUpperCase() + view.slice(1) }
          ]} />

          <Content className='seller-content'>

            {view === 'dashboard' && (
              <DashContent mobile={mobile} />
            )}

            {view === 'properties' && (
              <MyProperty mobile={mobile} checkProfileComplete={checkProfileComplete} />
            )}

            {view === 'inquiries' && (
              <Inquiry seller_mobile={mobile} />
            )}

          </Content>
        </Layout>
      </Layout>

      {/* Open seller profile modal  */}

      {
        openSellerProfileModal && (
          <div className="profile-container">
            <Modal title="" open={openSellerProfileModal} onCancel={() => setOpenSellerProfileModal(false)} footer={null}
              style={{ top: 60, right: 15, position: "absolute", marginLeft: "auto" }} width={'auto'}
            >
              <div className="seller-modal-content">
                <div className="seller-profile-header">
                  <img
                    className="seller-profile-image"
                    src={sellerDetails.photo
                      ? `http://localhost:4000/assets/${sellerDetails.photo}`
                      : "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                    alt="Seller Profile"
                  />
                </div>
                <p onClick={() => navigate('/profiles')}><UserOutlined /> Profile</p>
                <p onClick={() => setShowChangePasswordModal(true)}><LockOutlined /> Change Password</p>
                <p onClick={() => logout()}><LogoutOutlined /> Logout</p>
              </div>
            </Modal>
          </div>
        )
      }
      {
        showChangePasswordModal && (
          <ChangePassword
            visible={showChangePasswordModal}
            onClose={() => setShowChangePasswordModal(false)}
            mobile={mobile}
          />

        )
      }
    </>
  );
}

export default Dashboard;
