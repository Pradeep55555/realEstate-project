import React, { useState, useEffect } from 'react';
import { Modal, Typography, Image, Button, Row, Col } from 'antd';
import { FaHeart, FaRegHandshake } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './propertyModal.css';

const { Title, Text, Paragraph } = Typography;

const PropertyModal = ({ property, visible, onClose, onBuy, onSave, buyerMobile }) => {

    const [buyerData, setBuyerData] = useState();

    // ****** Fetch Buyer Details  *********** */

    useEffect(() => {
        if (!buyerMobile) return;

        const fetchBuyerInfo = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/buyer/${buyerMobile}`);
                if (!response.ok) throw new Error("Failed to fetch buyer");
                const data = await response.json();
                setBuyerData(data);

            } catch (error) {
                console.error("Error fetching buyer:", error.message);
            }
        };

        fetchBuyerInfo();
    }, [buyerMobile]);

    // **************************************

    const saveBuyerInterest = async (property_number , seller_mobile) => {
        // console.log('buyer info :' , buyerInfo)

        try {
            const response = await fetch("http://localhost:4000/api/buyer/add-interest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    buyer_mobile: buyerMobile,
                    property_number: property_number,
                    seller_mobile : seller_mobile
                })
            });

            const result = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Interest Saved',
                    text: result.message || "You have shown interest in this property."
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Save Interest',
                    text: result.message || "Something went wrong."
                });
            }
        } catch (error) {
            console.error("Error saving buyer interest:", error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: "Failed to save interest. Please try again later."
            });
        }
    };

    return (
        <Modal
            open={visible}
            onCancel={onClose}
            footer={null}
            width="90vw"
            centered
            className='property-modal'
            styles={{
                body: {
                    padding: '10px 10px',
                    paddingTop: '0px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                }
            }}
        >
            <Text type="secondary" style={{ fontSize: '14px' }}>
                Posted on: {new Date(property.post_date).toLocaleDateString()}
            </Text>

            <Title level={3} style={{ marginTop: 5 }}>
                {property.property_type} ({property.categories})
            </Title>

            {/* Horizontal Scroll Image Container */}

            <div className="image-scroll-container">
                <div className="image-scroll-inner">
                    {property.photos.map((photo, idx) => (
                        <Image
                            key={idx}
                            width={150}
                            height={100}
                            src={`http://localhost:4000/assets/${photo}`}
                            alt={`property-${idx}`}
                            className="scroll-image"
                            preview={false}
                        />
                    ))}
                </div>
            </div>

            {/* Two-column layout for property details */}

            <Row gutter={[16, 12]} className="property-details-grid">
                <Col xs={24} sm={12}>
                    <Paragraph><Text strong>Location:</Text> {property.location}, {property.city}, {property.state}</Paragraph>
                    <Paragraph><Text strong>Nearby:</Text> {property.nearby}</Paragraph>
                    <Paragraph><Text strong>Price:</Text> ₹ {Number(property.price).toLocaleString() || 'N/A'}</Paragraph>
                    <Paragraph><Text strong>Purpose:</Text> {property.purpose || 'N/A'}</Paragraph>
                </Col>
                <Col xs={24} sm={12}>
                    <Paragraph><Text strong>Owner Name:</Text> {property.full_name || 'N/A'}</Paragraph>
                    <Paragraph><Text strong>Contact Number:</Text> {property.mobile || 'Hidden'}</Paragraph>
                    <Paragraph><Text strong>Area:</Text> {property.area || 'N/A'} </Paragraph>
                    <Paragraph><Text strong>Description:</Text> {property.description || 'N/A'}</Paragraph>
                </Col>
            </Row>

            <div className="modal-btns">
                <Button type="primary" className='buy-btn' onClick={() => onBuy(property.property_number)}>
                    Buy Property
                </Button>

                <Button type="default" className="save-btn" onClick={() => onSave(property.property_number)}>
                    <FaHeart size={18} color="#f50057" /> &nbsp; Save to Wishlist
                </Button>

                <Button type="dashed" className="interest-btn" onClick={() => saveBuyerInterest(property.property_number , property.mobile)}>
                    <FaRegHandshake size={18} /> &nbsp; Save Interest
                </Button>
            </div>
        </Modal>
    );
};

export default PropertyModal;
