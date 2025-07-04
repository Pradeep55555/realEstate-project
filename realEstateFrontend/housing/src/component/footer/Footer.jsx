import React from 'react';
import { Row, Col, Typography, Space, Input } from 'antd';
import {
  FacebookFilled,
  TwitterSquareFilled,
  LinkedinFilled,
  InstagramFilled,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from '@ant-design/icons';
import './footer.css';

const { Title, Text } = Typography;

const Footer = () => {
  return (
    <div className="footer-container">
      <Row gutter={[16, 24]} className="footer-content">
        {/* Column 1 */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4}>RealEstate</Title>
          <Text>Find your dream home from our wide selection of properties.</Text>
          <div className="social-icons">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FacebookFilled />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterSquareFilled />
            </a>
            <a href="https://www.linkedin.com/in/pradeep-dhakad-038222244" target="_blank" rel="noopener noreferrer">
              <LinkedinFilled />
            </a>
            <a href="https://www.instagram.com/sanatani_pradeep___" target="_blank" rel="noopener noreferrer">
              <InstagramFilled />
            </a>
          </div>
        </Col>

        {/* Column 2 */}
        <Col xs={24} sm={12} md={6}>
          <Title level={5}>Quick Links</Title>
          <Space direction="vertical">
            <a href="#">Buy Property</a>
            <a href="#">Rent Property</a>
            <a href="#">Find Agent</a>
            <a href="#">Contact Us</a>
          </Space>
        </Col>

        {/* Column 3 */}
        <Col xs={24} sm={12} md={6}>
          <Title level={5}>Contact Info</Title>
          <Space direction="vertical">
            <Text><EnvironmentOutlined /> Lalita Nagar, Kolar Rd, Bhopal</Text>
            <Text><PhoneOutlined /> +91 9302840287</Text>
            <Text><MailOutlined /> support@realestate.com</Text>
          </Space>
        </Col>

        {/* Column 4 */}
        <Col xs={24} sm={12} md={6}>
          <Title level={5}>Newsletter</Title>
          <Text>Subscribe to get latest property updates.</Text>
          <Input.Search
            placeholder="Enter your email"
            enterButton="Subscribe"
            className="newsletter-input"
          />
        </Col>
      </Row>

      <div className="footer-bottom">
        <Text>© {new Date().getFullYear()} RealEstate. All rights reserved.</Text>
      </div>
    </div>
  );
};

export default Footer;
