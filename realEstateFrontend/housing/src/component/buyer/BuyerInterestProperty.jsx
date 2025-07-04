import React, { useState } from "react";
import { Modal, Table, Typography, Input, Button, message } from "antd";
import { SendOutlined } from '@ant-design/icons';

import moment from 'moment';

const { Text } = Typography;

function BuyerInterestProperty({ open, onClose, properties, buyerMobile }) {

    const [messages, setMessages] = useState({});
    const [loadingMap, setLoadingMap] = useState({});

     const VITE_API_URL= 'https://realestate-project-1-ayx1.onrender.com'

    const handleInputChange = (propertyNumber, value) => {
        setMessages(prev => ({
            ...prev,
            [propertyNumber]: value
        }));
    };

    const handleSend = (property) => {
        const msg = messages[property.property_number];
        if (!msg || !msg.trim()) {
            message.warning("Please enter a message before sending.");
            return;
        }

        setLoadingMap(prev => ({ ...prev, [property.property_number]: true }));

        // fetch(`http://localhost:4000/api/buyer-interest/send-message`, {
        fetch(`${VITE_API_URL}/api/buyer-interest/send-message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                buyer_mobile: buyerMobile,
                seller_mobile: property.seller_mobile,
                property_number: property.property_number,
                // property_location: property.location +', '+ property.city,
                // price: property.price,
                message: msg
            })
        })
            .then(res => res.json())
            .then(() => {
                message.success("Message sent successfully!");
                setMessages(prev => ({
                    ...prev,
                    [property.property_number]: ""
                }));
            })
            .catch(err => {
                console.error(err);
                message.error("Failed to send message.");
            })
            .finally(() => {
                setLoadingMap(prev => ({ ...prev, [property.property_number]: false }));
            });
    };

    const columns = [
        {
            title: "Property ",
            dataIndex: "property_number",
            key: "property_number",
        },
        {
            title: "Location",
            key: "location",
            render: (_, property) => `${property.location || ''}, ${property.city || ''}`
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            render: (price) => `₹${price}`
        },
        {
            title: "Interested On",
            dataIndex: "interested_on",
            key: "interested_on",
            render: (interested_on) => moment(interested_on).format('YYYY-MM-DD')
        },
        {
            title: "Seller Mobile",
            dataIndex: "seller_mobile",
            key: "seller_mobile"
        },
        {
            title: "Message",
            key: "message",
            render: (_, property) => (
                <div style={{ minWidth: 200, display: 'flex', gap: 10 }}>
                    <Input.TextArea
                        placeholder="Type your message..."
                        rows={1}
                        value={messages[property.property_number] || ""}
                        onChange={(e) => handleInputChange(property.property_number, e.target.value)}
                    />
                    <Button
                        type="primary"
                        size="small"
                        icon={<SendOutlined />}
                        loading={loadingMap[property.property_number]}
                        onClick={() => handleSend(property)}
                    />
                </div>
            )
        }
    ];

    return (
        <Modal
            title="interested Properties"
            open={open}
            onCancel={onClose}
            footer={null}
            width="90vw"
            style={{ top: 40 }}
            styles={{ body: { maxHeight: '70vh', overflowY: 'auto', padding: 0 } }}
            destroyOnHidden
        >
            {properties.length === 0 ? (
                <div style={{ padding: 16 }}>
                    <Text type="secondary">No interested properties found.</Text>
                </div>
            ) : (
                <Table
                    dataSource={properties}
                    columns={columns}
                    rowKey="property_number"
                    pagination={false}
                    scroll={{ x: false }}
                    responsive
                />
            )}
        </Modal>
    );
}

export default BuyerInterestProperty;
