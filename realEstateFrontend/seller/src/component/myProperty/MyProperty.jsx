
import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Swal from 'sweetalert2';
import { SearchOutlined } from '@ant-design/icons';

import AddPropertyModal from "./AddPropertyModal";
import './myProperty.css';

const columns = [
    {
        title: "Property Number",
        dataIndex: "property_number",
        key: "propertyNumber",
        // fixed: "left",
    },
    {
        title: "Mobile",
        dataIndex: "mobile",
        key: "mobile",
    },
    {
        title: "Property Type",
        dataIndex: "property_type",
        key: "propertyType",
    },
    {
        title: "Categories",
        dataIndex: "categories",
        key: "categories",
        width: 150,
    },
    {
        title: "State",
        dataIndex: "state",
        key: "state",
        width: 150,
    },
    {
        title: "City",
        dataIndex: "city",
        key: "city",
    },
    {
        title: "Location",
        dataIndex: "location",
        key: "location",
    },
    {
        title: "Nearby",
        dataIndex: "nearby",
        key: "nearby",
        width: 150,
    },
    {
        title: "Property Photos",
        dataIndex: "photos",
        key: "propertyPhotos",
        width: 400,
        className: "photo-column",
        render: (photos) =>
            photos?.map((filename, index) => (
                <img
                    key={index}
                    src={`http://localhost:4000/assets/${filename}`}
                    alt="property"
                    style={{ width: 50, height: 50, marginRight: 2, marginBottom: 2 }}
                />
            )),
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
            <Tag color={status === "Available" ? "green" : "red"}>{status}</Tag>
        ),
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
        width: 400,
    },
    {
        title: "Area",
        dataIndex: "area",
        key: "area",
        render: (area) => `${area}`,
    },
    {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (price) => `$${price.toLocaleString()}`,
    },
    {
        title: "Post Date",
        dataIndex: "post_date",
        key: "postDate",
        render: (date) => moment(date).format("DD MMM YYYY"),
    },
    {
        title: "Property Ownership",
        dataIndex: "ownership",
        key: "ownership",
    },
    {
        title: "Purpose",
        dataIndex: "purpose",
        key: "purpose",
    },
];

function MyProperty({ mobile, checkProfileComplete }) {

    const [openModal, setOpenModal] = useState(false);
    const [propertiesData, setPropertiesData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pageSize, setPageSize] = useState(4);
    const navigate = useNavigate();

    // ******  if seller not complete their profile give alert  ********

    useEffect(() => {
        if (openModal === true && checkProfileComplete === false) {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Profile',
                text: 'Please complete your profile details before posting a property.',
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    setOpenModal(false);
                    navigate('/profiles');
                }
            });
        }
    }, [openModal, checkProfileComplete]);

    // *******   fetch seller all property   *************

    async function getPropertyDetails(mobileNumber) {
        try {
            const response = await fetch(`http://localhost:4000/api/seller/property/details/${mobileNumber}`);
            const finalResult = await response.json();
            setPropertiesData(finalResult);
        } catch (error) {
            console.error("Failed to fetch property details:", error);
        }
    }

    useEffect(() => {
        if (mobile) {
            getPropertyDetails(mobile);
        }
    }, [mobile]);

    // ******  filter data when seller Search by city, state, or type   ********

    const filteredData = propertiesData.filter((item) => {
        const search = searchText.toLowerCase();
        return (
            item.city?.toLowerCase().includes(search) || item.state?.toLowerCase().includes(search) || item.property_type?.toLowerCase().includes(search)
        );
    });
    // *************************************************
    return (
        <>
            <div className="myProperty-container">
                <div className="property-header">
                    <button className="add-btn" onClick={() => setOpenModal(true)}>Add Property</button>
                    {/* <button
                        className="add-btn"
                        onClick={() => setOpenModal(true)}
                        disabled={!checkProfileComplete}
                        title={!checkProfileComplete ? "Complete profile first" : ""}
                    >
                        Add Property
                    </button> */}

                    <div className="search-container">
                        <input
                            type="text" placeholder="Search by city, state, or type"
                            className="search-input" value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <SearchOutlined className="search-icon" />
                    </div>

                    <select
                        className="pagination-selector" value={pageSize}
                        onChange={(e) => setPageSize(parseInt(e.target.value))}
                    >
                        {Array.from({ length: 10 }, (_, i) => (
                            <option key={i + 1} value={i + 1}>{i + 1} rows</option>
                        ))}
                    </select>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredData}
                    rowKey="property_number"
                    scroll={{ x: 2500 }}
                    pagination={{ pageSize }}
                    bordered
                />
            </div>

            {
                openModal && checkProfileComplete === true && (
                    <AddPropertyModal
                        mobile={mobile}
                        visible={openModal}
                        onClose={() => setOpenModal(false)}
                        onSuccess={() => {
                            getPropertyDetails(mobile);
                            setOpenModal(false);
                        }}
                    />
                )
            }
        </>
    );
}

export default MyProperty;
