



import React, { useEffect, useState, useRef } from 'react';
import { Row, Col, Button, Card, Table, Input, message, Tooltip, Space } from 'antd';
import { CommentOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import './inquiry.css';

const Inquiry = ({ seller_mobile }) => {
  const [allInquiries, setAllInquiries] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [remarks, setRemarks] = useState({});
  const [notInterestedBuyers, setNotInterestedBuyers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 3 });
  const [loading, setLoading] = useState(false);
  const [notificationCounts, setNotificationCounts] = useState({});
  const [viewedProperties, setViewedProperties] = useState([]);

  const lastNotificationRef = useRef({});
  const audioRef = useRef(new Audio('/notification.mp3'));// 🔔 Sound file path in public/

  // Fetch notifications and check for new ones
  const fetchNotifications = () => {
    fetch(`http://localhost:4000/notifications/${seller_mobile}`)
      .then((res) => res.json())
      .then((data) => {
        const newCounts = {};
        data.forEach((item) => {
          newCounts[item.property_number] = (newCounts[item.property_number] || 0) + 1;
        });

        // Compare to previous
        const newAlert = Object.entries(newCounts).some(
          ([key, count]) => !viewedProperties.includes(key) && count > (lastNotificationRef.current[key] || 0)
        );

        if (newAlert) {
          audioRef.current.play().catch(() => { }); // 🔔 Play sound
        }

        lastNotificationRef.current = newCounts;
        setNotificationCounts(newCounts);
      });
  };

  // Polling every 10 seconds
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, [seller_mobile, viewedProperties]);

  useEffect(() => {
    async function fetchInquiries() {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/api/buyer/interested-details/${seller_mobile}`);
        const data = await res.json();
        setAllInquiries(data);
        const unique = [...new Set(data.map((item) => item.property_number))];
        if (unique.length > 0 && !selectedProperty) {
          setSelectedProperty(unique[0]);
        }
      } catch (err) {
        console.error('Error fetching inquiries:', err);
      } finally {
        setLoading(false);
      }
    }
    if (seller_mobile) fetchInquiries();
  }, [seller_mobile]);

  useEffect(() => {
    const fetchAllRemarks = async () => {
      if (!selectedProperty) return;

      const buyersForProperty = allInquiries
        .filter((item) => item.property_number === selectedProperty)
        .map((item) => item.buyer_mobile);

      const newRemarks = { ...remarks };

      await Promise.all(
        buyersForProperty.map(async (buyer_mobile) => {
          const key = `${selectedProperty}-${buyer_mobile}`;
          try {
            const res = await fetch(`http://localhost:4000/api/buyer-remark/${selectedProperty}/${buyer_mobile}`);
            if (res.ok) {
              const data = await res.json();
              newRemarks[key] = data.remark;
            } else if (res.status === 404) {
              newRemarks[key] = "No remark available";
            } else {
              newRemarks[key] = "";
            }
          } catch (err) {
            newRemarks[key] = "";
          }
        })
      );

      setRemarks(newRemarks);
    };

    fetchAllRemarks();
  }, [selectedProperty, allInquiries]);

  const uniqueProperties = [...new Set(allInquiries.map((item) => item.property_number))];

  const filteredInquiries = selectedProperty
    ? allInquiries.filter((item) => {
      const matchesProperty = item.property_number === selectedProperty;
      const notNotInterested = !notInterestedBuyers.includes(item.buyer_mobile);
      const matchesSearch =
        item.buyer_mobile.includes(searchText) ||
        item.buyer_name.toLowerCase().includes(searchText.toLowerCase());
      return matchesProperty && notNotInterested && matchesSearch;
    })
    : [];

  const handleSaveRemark = async (buyer_mobile) => {
    const key = `${selectedProperty}-${buyer_mobile}`;
    const remark = remarks[key] || '';

    try {
      const res = await fetch('http://localhost:4000/api/buyer-remark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          seller_mobile,
          buyer_mobile,
          property_number: selectedProperty,
          remark,
        }),
      });

      if (res.ok) {
        message.success('Remark saved successfully');
      } else {
        message.error('Failed to save remark');
      }
    } catch (err) {
      message.error('Error saving remark');
    }
  };

  const handleMarkNotInterested = (buyer_mobile) => {
    setNotInterestedBuyers((prev) => [...prev, buyer_mobile]);
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleSelectProperty = async (property_number) => {
    setSelectedProperty(property_number);
    setPagination({ current: 1, pageSize: 3 });
    setSearchText('');
    setViewedProperties((prev) => [...prev, property_number]);

    try {
      await fetch('http://localhost:4000/notifications/viewed', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ seller_mobile, property_number }),
      });
    } catch (err) {
      console.error('Failed to reset notification in backend:', err);
    }
  };

  const columns = [
    { title: 'Buyer Name', dataIndex: 'buyer_name', key: 'buyer_name' },
    { title: 'Mobile', dataIndex: 'buyer_mobile', key: 'buyer_mobile' },
    { title: 'Email', dataIndex: 'buyer_email', key: 'buyer_email' },
    {
      title: 'Remark',
      dataIndex: 'buyer_mobile',
      key: 'remark',
      render: (buyer_mobile) => {
        const key = `${selectedProperty}-${buyer_mobile}`;
        return (
          <Space>
            <Input
              placeholder="Add remark"
              value={remarks[key] || ''}
              onChange={(e) => setRemarks({ ...remarks, [key]: e.target.value })}
              size="small"
            />
            <Button
              icon={<CommentOutlined />}
              type="primary"
              size="small"
              onClick={() => handleSaveRemark(buyer_mobile)}
            />
          </Space>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: 'buyer_mobile',
      key: 'action',
      render: (buyer_mobile) => (
        <Tooltip title="Mark as Not Interested">
          <Button
            icon={<EyeInvisibleOutlined />}
            danger
            type="dashed"
            size="small"
            onClick={() => handleMarkNotInterested(buyer_mobile)}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div style={{ marginBottom: 0, paddingBottom: 0 }}>
      <Card
        title={
          <Row justify="space-between" align="middle">
            <Col>Your Properties</Col>
            <Col>
              <Input.Search
                placeholder="Search by Buyer Mobile or Name"
                allowClear
                onChange={(e) => setSearchText(e.target.value.trim())}
                style={{ width: 300 }}
              />
            </Col>
          </Row>
        }
        style={{ marginBottom: 10 }}
      >
        <div className="scroll-buttons">
          {uniqueProperties.map((property_number, index) => {
            const unreadCount =
              notificationCounts[property_number] && !viewedProperties.includes(property_number)
                ? notificationCounts[property_number]
                : 0;

            return (
              <Button
                key={index}
                type={selectedProperty === property_number ? 'primary' : 'default'}
                onClick={() => handleSelectProperty(property_number)}
              >
                <span style={{ position: 'relative' }}>
                  {property_number}
                  {unreadCount > 0 && (    //  here when notification more then 9 when className will be "notification-dot large" otherwise "notification-dot"
                     <span className={`notification-dot ${unreadCount > 9 ? 'large' : ''}`}>    
                        {unreadCount > 99 ? ( <> 99 <sup className="plus-sign">+</sup></> ) : ( unreadCount  )}
                    </span>
                  )}
                </span>
              </Button>
              
            );
          })}
        </div>
      </Card>

      <Card title={`Buyers Interested in Property: ${selectedProperty || 'None Selected'}`}>
        <Table
          dataSource={filteredInquiries}
          columns={columns}
          rowKey={(record) => `${record.property_number}-${record.buyer_mobile}`}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            showSizeChanger: true,
            pageSizeOptions: ['1', '3', '5', '7', '10', '20', '50'],
          }}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ x: 'max-content' }}
        />
      </Card>
    </div>
  );
};

export default Inquiry;
