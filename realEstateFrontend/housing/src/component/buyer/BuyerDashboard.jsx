import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './buyerDashboard.css';

import BuyerSaveProperty from './BuyerSaveProperty';
import BuyerInterestProperty from "./BuyerInterestProperty";


import { Card, Row, Col, Typography, Modal, Tooltip } from 'antd';
import { EditOutlined, LoginOutlined, UserOutlined, MailOutlined, PhoneOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

function BuyerDashboard() {

  const [buyerMobile, setBuyerMobile] = useState('');
  const [buyerData, setBuyerData] = useState([]);
  const [buyerInterest, setBuyerInterest] = useState([]);
  const [saveProperty, setSaveProperty] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [savePropertyModalOpen, setSavePropertyModalOpen] = useState(false);
  const [interestPropertyModalOpen, setInterestPropertyModalOpen] = useState(false);


  // const { setBuyerInfo } = useAuth();
  const navigate = useNavigate();

  //***********   access buyer mobile from cookies   ******************

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

    // 1. Fetch Buyer Details
    const fetchBuyer = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/buyer/${buyerMobile}`);
        if (!response.ok) {
          console.warn("Buyer route not found or failed:", response.status);
          return;
        }
        const data = await response.json();
        setBuyerData(data);
      } catch (error) {
        console.error("Error fetching buyer:", error.message);
      }
    };

    // 2. Fetch Buyer Interest Properties (with fallback)
    const fetchBuyerInterest = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/buyer/interest/${buyerMobile}`);
        if (!response.ok) {
          console.warn("Interest route not found or failed:", response.status);
          setBuyerInterest([]); // fallback empty
          return;
        }
        const interests = await response.json();
        setBuyerInterest(interests);
        // console.log("interest ::: ", interests)
      } catch (error) {
        console.error("Error fetching interests:", error.message);
        setBuyerInterest([]); // fallback on error
      }
    };

    // 3. Fetch Saved Properties (with fallback)
    const fetchSavedProperty = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/buyer/save-property/${buyerMobile}`);
        if (!response.ok) {
          console.warn("Saved property route not found or failed:", response.status);
          setSaveProperty([]); // fallback empty
          return;
        }
        const savePro = await response.json();
        setSaveProperty(savePro);
      } catch (error) {
        console.error("Error fetching saved properties:", error.message);
        setSaveProperty([]); // fallback on error
      }
    };

    fetchBuyer();
    fetchBuyerInterest();
    fetchSavedProperty();
  }, [buyerMobile]);

  // *********   Logout Buyer    ************

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
        setBuyerMobile(null);
        setOpenModal(false);
        navigate('/')

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  };


  // *********************************************

  if (buyerMobile) {

    return (
      <>

        <div className="buyer-dashboard">

          <div className="dashboard-header">
            <Title level={2} style={{ fontSize: 'clamp(13px, 2vw, 30px)', marginBottom: 0 }}><ArrowLeftOutlined onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />  Welcome to RealEstateIndia</Title>

            <div style={{ position: "absolute", top: 'clamp(13px, 2vw, 18px)', right: 30, display: "flex", alignItems: "center", gap: "10px" }}>
              <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="profile" style={{ width: "35px", height: "35px", borderRadius: "50%", cursor: 'pointer' }} onClick={() => setOpenModal(true)} />
              <Text strong style={{ fontSize: 'clamp(13px, 2vw, 18px)' }}>{buyerData?.full_name || buyerMobile}</Text>
            </div>
          </div>

          <Row gutter={[16, 16]} className="stats-row">
            <Col xs={24} sm={12} md={6}>
              <Card className="stat-card red">
                <Text className="label">New Responses</Text>
                <Title level={5} style={{margin : 8}}>00/00</Title>
                <Text type="secondary">More Info</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="stat-card blue"  onClick={() => setSavePropertyModalOpen(true)}>
                <Text className="label">Saved Properties</Text>
                <Title level={5} style={{margin : 8}}>{saveProperty.length}</Title>
                <Text type="secondary" onClick={() => setSavePropertyModalOpen(true)} style={{ cursor: 'pointer' }}>More Info</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="stat-card green" onClick={() => setInterestPropertyModalOpen(true)} >
                <Text className="label">Purchase Interests</Text>
                <Title level={5} style={{margin : 8}}>{buyerInterest.length}</Title>
                <Text type="secondary" onClick={() => setInterestPropertyModalOpen(true)} style={{ cursor: 'pointer' }}>More Info</Text>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card className="stat-card yellow">
                <Text className="label">Recommended Listings</Text>
                <Title level={5} className="count" style={{margin : 8}}>00</Title>
                <Text type="secondary">More Info</Text>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]} className="info-row">
            <Col xs={24} md={8}>
              <Card title="Latest Messages">
                <Text type="secondary">No Messages Found</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="Shortlisted Properties">
                <Text type="secondary">No Properties Saved</Text>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="My Buyer Stats">
                <ul className="stats-list">
                  <li>Total Saved Properties: {saveProperty.length}</li>
                  <li>Purchase Interests: {buyerInterest.length}</li>
                  <li>Responses Received: 00</li>
                  <li>Deleted Interests: 00</li>
                </ul>
              </Card>
            </Col>
          </Row>
        </div>

        {/* Open profile modal  */}
        {openModal && (
          <div className="profile-container">
            <Modal title="" open={openModal} onCancel={() => setOpenModal(false)} footer={null}
              style={{ top: 60, right: 15, position: "absolute", marginLeft: "auto" }} width={'auto'}
            >
              <div className="buyer-modal-content">
                <div className="buyer-profile-header">
                  <img src="https://cdn-icons-png.flaticon.com/512/847/847969.png" alt="Buyer Profile" className="buyer-profile-image" />
                </div>
                <p><UserOutlined style={{ marginRight: 8 }} /><strong>{buyerData?.full_name || "N/A"}</strong></p>
                <p><MailOutlined style={{ marginRight: 8 }} /><strong>{buyerData?.email || "N/A"}</strong></p>
                <p><PhoneOutlined style={{ marginRight: 8 }} /><strong>{buyerData?.mobile || buyerMobile}</strong></p>
                <hr />
                <div className="buyer-modal-actions">
                  <Tooltip title="Edit Profile">
                    <EditOutlined className="buyer-modal-edit-icon" onClick={() => { setOpenModal(false); navigate('/edit-profile'); }} />
                  </Tooltip>

                  <Tooltip title="Logout">
                    <LoginOutlined className="buyer-modal-logout-icon" onClick={logout} />
                  </Tooltip>
                </div>
              </div>
            </Modal>
          </div>
        )}
        <BuyerSaveProperty
          open={savePropertyModalOpen}
          onClose={() => setSavePropertyModalOpen(false)}
          properties={saveProperty}
          buyerMobile={buyerMobile}
        />
        <BuyerInterestProperty
          open={interestPropertyModalOpen}
          onClose={() => setInterestPropertyModalOpen(false)}
          properties={buyerInterest}
          buyerMobile={buyerMobile}
        />
      </>
    );
  }
}

export default BuyerDashboard;