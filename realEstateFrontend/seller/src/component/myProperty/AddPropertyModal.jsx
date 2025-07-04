import React, { useState, useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, message, Upload, Row, Col } from "antd";
import { State, City } from "country-state-city";
import axios from "axios";

const { Option } = Select;

const PostPropertyModal = ({ mobile, onSuccess, visible, onClose }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedStateCode, setSelectedStateCode] = useState(null);

    const [propertyTypes, setPropertyTypes] = useState([]);
    const [propertyCategories, setPropertyCategories] = useState([]);
    const [propertyPurposes, setPropertyPurposes] = useState([]);

    useEffect(() => {
        const indianStates = State.getStatesOfCountry("IN");
        setStates(indianStates);

        const fetchPropertyData = async () => {
            try {
                const [typesRes, categoriesRes, purposesRes] = await Promise.all([
                    axios.get("http://localhost:4000/property-types"),
                    axios.get("http://localhost:4000/property-categories"),
                    axios.get("http://localhost:4000/property-purpose"),
                ]);

                setPropertyTypes(typesRes.data);
                setPropertyCategories(categoriesRes.data);
                setPropertyPurposes(purposesRes.data);
            } catch (err) {
                console.error("Error fetching dropdown data:", err);
            }
        };

        fetchPropertyData();
    }, []);


    const onStateChange = (stateName) => {
        const selected = states.find((s) => s.name === stateName);
        if (!selected) return;
        setSelectedStateCode(selected.isoCode);
        // Reset city when state changes
        form.setFieldsValue({ city: undefined });

        // Load districts (cities) based on selected state
        const cities = City.getCitiesOfState("IN", selected.isoCode);
        setDistricts(cities);
    };

    const closeModal = () => {
        form.resetFields();
        setDistricts([]);
        setSelectedStateCode(null);
        if (onClose) onClose();
    };

    const onFinish = async (values) => {
        setLoading(true);
        const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
            if (key === "area" || key === "area_unit" || key === "photos") return;
            formData.append(key, value);
        });

        formData.append("area", `${values.area} ${values.area_unit}`);      // Combine area and unit like "1800 sqft"

        if (values.photos && Array.isArray(values.photos)) {
            values.photos.forEach((fileObj) => {
                formData.append("photos", fileObj.originFileObj);
            });
        }
        formData.append("status", "Available");

        try {
            const response = await fetch("http://localhost:4000/api/seller/property/add", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                message.success("Property added successfully!");
                closeModal();
                if (onSuccess) onSuccess();
            } else {
                message.error(result.error || "Failed to add property.");
            }
        } catch (error) {
            console.error("Error adding property:", error);
            message.error("Server error.");
        }
        setLoading(false);
    };

    return (
        <Modal
            title="Add Property"
            open={visible}
            onCancel={closeModal}
            footer={null}
            destroyOnHidden
            width={1200}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{ mobile, status: "Available" }}
                onFinish={onFinish}
            >
                <Row gutter={[16, 0]}>
                    {[
                        { label: "Mobile", name: "mobile", required: false, input: <Input disabled /> },
                        { label: "Property Number", name: "property_number", required: true, input: <Input placeholder="Property Number" /> },
                        {
                            label: "Property Type",
                            name: "property_type",
                            required: true,
                            input: (
                                <Select placeholder="Select property type">
                                    {propertyTypes.map((type) => (
                                        <Option key={type.id} value={type.property_type}>{type.property_type}</Option>
                                    ))}
                                </Select>

                            ),
                        },
                        {
                            label: "Categories",
                            name: "categories",
                            required: true,
                            input: (
                                <Select mode="tags" placeholder="Select or type category">
                                    {propertyCategories.map((cat) => (
                                        <Option key={cat.id} value={cat.property_category}>{cat.property_category}</Option>
                                    ))}
                                </Select>

                            ),
                        },
                        {
                            label: "State",
                            name: "state",
                            required: true,
                            input: (
                                <Select
                                    placeholder="Select state"
                                    onChange={onStateChange}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {states.map((state) => (
                                        <Option key={state.isoCode} value={state.name}>
                                            {state.name}
                                        </Option>
                                    ))}
                                </Select>
                            ),
                        },
                        {
                            label: "City",
                            name: "city",
                            required: true,
                            input: (
                                <Select
                                    placeholder="Select city"
                                    disabled={!selectedStateCode}
                                    showSearch
                                    optionFilterProp="children"
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().includes(input.toLowerCase())
                                    }
                                >
                                    {districts.map((district) => (
                                        <Option key={district.name} value={district.name}>
                                            {district.name}
                                        </Option>
                                    ))}
                                </Select>
                            ),
                        },
                        { label: "Location", name: "location", required: true, input: <Input placeholder="Location" /> },
                        { label: "Nearby", name: "nearby", required: true, input: <Input placeholder="Nearby" /> },
                        {
                            label: "Ownership",
                            name: "ownership",
                            required: true,
                            input: (
                                <Select placeholder="Select ownership type">
                                    <Option value="Freehold">Freehold</Option>
                                    <Option value="Leasehold">Leasehold</Option>
                                    <Option value="Other">Other</Option>
                                </Select>
                            ),
                        },
                        {
                            label: "Purpose",
                            name: "purpose",
                            required: true,
                            input: (
                                <Select placeholder="Select purpose">
                                    {propertyPurposes.map((purpose) => (
                                        <Option key={purpose.id} value={purpose.property_purpose}>{purpose.property_purpose}</Option>
                                    ))}
                                </Select>

                            ),
                        },
                        {
                            label: "Area",
                            name: "area",
                            required: true,
                            input: (
                                <Input
                                    type="number"
                                    placeholder="Area"
                                    addonAfter={
                                        <Form.Item name="area_unit" noStyle initialValue="sqft">
                                            <Select style={{ width: 80 }}>
                                                <Option value="sqft">sqft</Option>
                                                <Option value="sqm">sq.m</Option>
                                                <Option value="sqyd">sq.yd</Option>
                                            </Select>
                                        </Form.Item>
                                    }
                                />
                            ),
                        },

                        {
                            label: "Price",
                            name: "price",
                            required: true,
                            input: (
                                <InputNumber
                                    style={{ width: "100%" }}
                                    min={0}
                                    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                                    placeholder="Price"
                                />
                            ),
                        },
                    ].map((item, index) => (
                        <Col xs={24} md={12} lg={6} key={index}>
                            <Form.Item
                                style={{ marginBottom: 12 }}
                                label={item.label}
                                name={item.name}
                                rules={
                                    item.required ? [{ required: true, message: `Please enter ${item.label.toLowerCase()}!` }] : []
                                }
                            >
                                {item.input}
                            </Form.Item>
                        </Col>
                    ))}

                    <Col span={24}>
                        <Form.Item
                            style={{ marginBottom: 12 }}
                            label="Description"
                            name="description"
                            rules={[{ required: true, message: "Please enter description!" }]}
                        >
                            <Input.TextArea rows={2} placeholder="Property description" />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item
                            style={{ marginBottom: 12 }}
                            label="Property Photos"
                            name="photos"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                        >
                            <Upload listType="picture" beforeUpload={() => false} multiple>
                                <Button>Select Photos</Button>
                            </Upload>
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button type="primary" htmlType="submit" loading={loading} block>
                                Save Property
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </Modal>
    );
};

export default PostPropertyModal;
