


import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Upload, DatePicker, Radio, Select, Row, Col, Avatar, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './profileDetails.css';

const ProfileDetails = () => {
    let [mobile, setMobile] = useState('');

    const [form] = Form.useForm();
    const [photoUrl, setPhotoUrl] = useState();
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const navigate = useNavigate();

    const handleFinish = async (values) => {
        const formData = new FormData();

        formData.append('mobile', values.mobile);
        formData.append('aadhar', values.aadhar);
        formData.append('pan', values.pan);
        formData.append('status', values.status);
        formData.append('gender', values.gender);
        formData.append('dob', values.dob ? values.dob.format('YYYY-MM-DD') : '');
        formData.append('address', values.address);

        if (selectedPhoto) {
            formData.append('photo', selectedPhoto);
        }

        try {
            const response = await fetch('http://localhost:4000/api/seller/details', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                message.success('Profile saved!');
            } else {
                const errorData = await response.json();
                message.error(`Save failed: ${errorData.Error || 'Unknown error'}`);
            }
        } catch (error) {
            message.error(`Network error: ${error.message}`);
        }
    };

    const handlePhotoUpload = ({ file }) => {
        if (file) {
            setSelectedPhoto(file);
            const url = URL.createObjectURL(file);
            setPhotoUrl(url);
        }
    };

    function getCookieValue() {
        return document.cookie
            .split('; ')
            .find(row => row.startsWith('sellerMobile='))
            ?.split('=')[1];
    }

    useEffect(() => {
        const mobileFromCookie = getCookieValue();
        if (mobileFromCookie) {
            setMobile(mobileFromCookie);
        }
    }, []);

    async function getSellerInfo() {
        const response = await fetch(`http://localhost:4000/api/seller/info/${mobile}`);
        let finalResult = await response.json();

        form.setFieldsValue({
            fullname: finalResult.full_name,
            mobile: finalResult.mobile,
            email: finalResult.email,
        });
    }
    useEffect(() => {
        if (mobile) {
            getSellerInfo();
        }
    }, [mobile]);

    async function getSellerDetails() {
        try {
            const response = await fetch(`http://localhost:4000/api/seller/details/${mobile}`);
            const finalResult = await response.json();

            setPhotoUrl(`http://localhost:4000/assets/${finalResult.photo}`);

            form.setFieldsValue({
                aadhar: finalResult.aadhar,
                pan: finalResult.pan,
                status: finalResult.status ? 1 : 0,
                dob: finalResult.dob ? dayjs(finalResult.dob) : null,
                gender: finalResult.gender,
                address: finalResult.address,
            });
        } catch (error) {
            console.error("Failed to fetch seller details:", error);
        }
    }

    useEffect(() => {
        if (mobile) {
            getSellerDetails();
        }
    }, [mobile]);

    return (
        <div className="profile-details-container">
            <div className="profile-from">
                <Form
                    layout="vertical"
                    onFinish={handleFinish}
                    form={form}
                    style={{ background: '#fff', padding: '10px', borderRadius: '10px' }}
                >
                    <Row gutter={[16, 4]}>
                        <Col xs={24} sm={24} md={6} style={{ textAlign: 'center' }}>
                            <Avatar size={100} src={photoUrl || null} />
                            <Upload
                                showUploadList={false}
                                maxCount={1}
                                beforeUpload={() => false}
                                onChange={handlePhotoUpload}
                            >
                                <Button icon={<UploadOutlined />} style={{ marginTop: 8  , marginLeft : 5}}>
                                    Photo
                                </Button>
                            </Upload>
                        </Col>

                        <Col xs={24} sm={24} md={18}>
                            <Row gutter={[16, 8]}>
                                <Col xs={24} md={12}>
                                    <Form.Item name="fullname" label="Full Name" rules={[{ required: true }]}>
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="mobile" label="Mobile" rules={[{ required: true }]}>
                                        <Input maxLength={10} disabled />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="email" label="Email">
                                        <Input autoComplete="email" disabled />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="aadhar" label="Aadhar" rules={[{ required: true }]}>
                                        <Input maxLength={12} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="pan" label="PAN" rules={[{ required: true }]}>
                                        <Input maxLength={10} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="status" label="Status" rules={[{ required: true }]}>
                                        <Select placeholder="Select Status">
                                            <Select.Option value={1}>Active</Select.Option>
                                            <Select.Option value={0}>Deactive</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="dob" label="Date of Birth" rules={[{ required: true }]}>
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={12}>
                                    <Form.Item name="gender" label="Gender">
                                        <Radio.Group className="responsive-radio-group">
                                            <Radio value="Male">Male</Radio>
                                            <Radio value="Female">Female</Radio>
                                            <Radio value="Other">Other</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col xs={24}>
                                    <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                                        <Input.TextArea rows={2} />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} style={{ textAlign: 'right' }}>
                                    <Button onClick={() => { form.resetFields(); navigate('/dashboard'); }} style={{ marginRight: 8 }}>
                                        Cancel
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        Save
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
    );
};

export default ProfileDetails;
