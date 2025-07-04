import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Statistic, Table, Input } from 'antd';
import { HomeOutlined, CheckCircleOutlined, AppstoreAddOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const DashContent = ({ mobile }) => {

    const [totalProperty, setTotalProperty] = useState(0);
    const [soldProperty, setSoldProperty] = useState(0);
    const [totalInquiries, setTotalInquiries] = useState([]);
    const [recentInquiries, setRecentInquiries] = useState([]);
    const [pageSize, setPageSize] = useState(3);
    const [searchValue, setSearchValue] = useState('');

    ////////   fetch Total property  *******************
    useEffect(() => {

        async function fetchPropertyCount() {
            try {
                const response = await fetch(`http://localhost:4000/api/seller/property/count/${mobile}`);
                const data = await response.json();
                setTotalProperty(data.length);
                const sold = data.filter(property => property.status === 'Sold').length;
                setSoldProperty(sold);
            } catch (error) {
                console.error("Error fetching property count:", error);
            }
        }

        if (mobile) {
            fetchPropertyCount();
        }
    }, [mobile]);

    ////////   fetch property Inquiries  *******************

    useEffect(() => {

        async function fetchInquiries() {
            const response = await fetch(`http://localhost:4000/api/buyer/interested-details/${mobile}`);
            const data = await response.json();
            setTotalInquiries(data);

            const now = new Date();
            const filtered = data.filter(inquiry => {
                const inquiryDate = new Date(inquiry.interested_on);
                const diffInDays = (now - inquiryDate) / (1000 * 60 * 60 * 24);
                return diffInDays <= 30;
            }).sort((b, a) => new Date(a.interested_on) - new Date(b.interested_on));

            setRecentInquiries(filtered);
        }

        if (mobile) {
            fetchInquiries();
        }
    }, [mobile]);

    const filteredInquiries = recentInquiries.filter(inquiry =>
        inquiry.property_number.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12} lg={6}>
                    <Card title="Total Properties" extra={<HomeOutlined />}>
                        <Statistic value={totalProperty} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6}>
                    <Card title="Sold Properties" extra={<CheckCircleOutlined />}>
                        <Statistic value={soldProperty} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6}>
                    <Card title="Available Properties" extra={<AppstoreAddOutlined />}>
                        <Statistic value={totalProperty - soldProperty} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={6}>
                    <Card title="Properties Inquiries" extra={<EyeOutlined />}>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '24px' }}>
                            <span style={{ marginRight: '8px' }}>{totalInquiries.length}</span>
                            <Button type="link" size="small">View List</Button>
                        </div>
                    </Card>
                </Col>
            </Row>

            <div style={{ marginTop: 10 }}>
                <Card
                    title={
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Recent Buyer Inquiries</span>
                            <Input
                                placeholder="Search by Property Number"
                                prefix={<SearchOutlined />}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                style={{
                                    width: 250,
                                    borderRadius: 4,
                                    marginLeft: 'auto'
                                }}
                            />
                        </div>
                    }
                >
                    <Table
                        dataSource={filteredInquiries}
                        rowKey="property_number"
                        pagination={{
                            pageSize: pageSize,
                            showSizeChanger: true,
                            pageSizeOptions: ['2', '3', '4', '6', '8', '10', '15'],
                            onShowSizeChange: (_, size) => setPageSize(size),
                            style: { marginBottom: 0 }
                        }}
                        scroll={{ x: 'max-content' }}
                        columns={[
                            {
                                title: 'Property Number',
                                dataIndex: 'property_number',
                                key: 'property_number',
                            },
                            {
                                title: 'Buyer Name',
                                dataIndex: 'buyer_name',
                                key: 'buyer_name',
                            },
                            {
                                title: 'Buyer Mobile',
                                dataIndex: 'buyer_mobile',
                                key: 'buyer_mobile',
                            },
                            {
                                title: 'Buyer Email',
                                dataIndex: 'buyer_email',
                                key: 'buyer_email',
                            },
                            {
                                title: 'Interested Date',
                                dataIndex: 'interested_on',
                                key: 'date',
                                render: (text) => dayjs(text).format('DD MMM YYYY, h:mm A'),
                            },
                        ]}

                    />
                </Card>
            </div>
        </>
    );
};

export default DashContent;
