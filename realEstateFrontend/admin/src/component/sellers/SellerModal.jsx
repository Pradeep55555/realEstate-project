import React, { useState } from "react";
import { Mail, Phone, ShieldCheck, MapPin, Calendar, User, CreditCard, IdCard, Home } from "lucide-react";
import dayjs from 'dayjs';

function SellerModal({ modalData, editMode, closeModal, extraDetails }) {

    const handleEditChange = (e) => { //// just initial
        setModalData({ ...modalData, [e.target.name]: e.target.value });
    };

    const handleEditSubmit = () => {
        fetch(`http://localhost:4000/update-seller`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(modalData),
        })
            .then((res) => res.json())
            .then(() => {
                setSellers((prev) =>
                    prev.map((s) =>
                        s.mobile === modalData.mobile ? modalData : s
                    )
                );
                closeModal();
            });
    };


    return (
        <>
            {/* Modal */}
            {modalData && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-m flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto relative">

                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            style={{ cursor: "pointer", fontSize: '25px' }}
                            className="absolute top-2 right-4 text-gray-500 hover:text-black text-xl font-bold"
                        >
                            &times;
                        </button>

                        {/* Profile Image */}
                        <div className="flex justify-center mb-2">
                            <img
                                src={extraDetails?.photo
                                    ? `http://localhost:4000/assets/${extraDetails.photo}`
                                    : "https://cdn-icons-png.flaticon.com/512/847/847969.png"}
                                alt="Seller Profile"
                                className="w-35 h-35 rounded-full border-1 border-white shadow-md object-cover"
                            />
                        </div>

                        {/* Seller Name */}
                        <h3 className="text-xl font-semibold text-center mb-6">
                            {editMode ? (
                                <input style={{ width: 'fit-content' }}
                                    name="name"
                                    value={modalData?.full_name || ""}
                                    onChange={handleEditChange}
                                    className="w-full border p-1 rounded mt-1"
                                />
                            ) : (
                                <p>{modalData.full_name || "Not Available"}</p>
                            )}
                        </h3>

                        {/* Row 1: Mobile, Status, Gender */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                            {/* Mobile */}
                            <div className="flex items-start gap-2">
                                <Phone size={16} className="mt-1" />
                                <div>
                                    <label className="font-medium">Mobile:</label>
                                    {editMode ? (
                                        <input
                                            name="mobile"
                                            value={modalData?.mobile || ""}
                                            onChange={handleEditChange}
                                            className="w-full border p-1 rounded mt-1"
                                        />
                                    ) : (
                                        <p>{modalData.mobile || "Not Available"}</p>
                                    )}
                                </div>
                            </div>

                            {/* Status */}
                            <div className="flex items-start gap-2">
                                <ShieldCheck size={16} className="mt-1" />
                                <div>
                                    <label className="font-medium">Status:</label>
                                    <p>{extraDetails?.status ? 'Active' : 'Deactive'}</p>
                                </div>
                            </div>

                            {/* Gender */}
                            <div className="flex items-start gap-2">
                                <User size={16} className="mt-1" />
                                <div className="w-full">
                                    <label className="font-medium">Gender:</label>
                                    {editMode ? (
                                        <select
                                            name="gender"
                                            value={extraDetails?.gender || ""}
                                            onChange={handleEditChange}
                                            className="w-full border p-1 rounded mt-1"
                                        >
                                            <option value="">Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    ) : (
                                        <p>{extraDetails?.gender || "Not Available"}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Row 2: Aadhar, PAN, DOB */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                            {/* Aadhar */}
                            <div className="flex items-start gap-2">
                                <IdCard size={16} className="mt-1" />
                                <div className="w-full">
                                    <label className="font-medium">Aadhar:</label>
                                    {editMode ? (
                                        <input
                                            name="aadhar"
                                            value={extraDetails?.aadhar || ""}
                                            onChange={handleEditChange}
                                            className="w-full border p-1 rounded mt-1"
                                        />
                                    ) : (
                                        <p>{extraDetails?.aadhar || "Not Available"}</p>
                                    )}
                                </div>
                            </div>

                            {/* PAN */}
                            <div className="flex items-start gap-2">
                                <CreditCard size={16} className="mt-1" />
                                <div className="w-full">
                                    <label className="font-medium">PAN:</label>
                                    {editMode ? (
                                        <input
                                            name="pan"
                                            value={extraDetails?.pan || ""}
                                            onChange={handleEditChange}
                                            className="w-full border p-1 rounded mt-1"
                                        />
                                    ) : (
                                        <p>{extraDetails?.pan || "Not Available"}</p>
                                    )}
                                </div>
                            </div>

                            {/* DOB */}
                            <div className="flex items-start gap-2">
                                <Calendar size={16} className="mt-1" />
                                <div className="w-full">
                                    <label className="font-medium">DOB:</label>
                                    {editMode ? (
                                        <input
                                            type="date"
                                            name="dob"
                                            value={extraDetails?.dob || ""}
                                            onChange={handleEditChange}
                                            className="w-full border p-1 rounded mt-1"
                                        />
                                    ) : (
                                        <p> {extraDetails?.dob ? dayjs(extraDetails.dob).format('DD MMM YYYY') : "Not Available"}</p>

                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Row 3: Email, Address, Posts */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                            {/* Email */}
                            <div className="flex items-start gap-2">
                                <Mail size={16} className="mt-1" />
                                <div className="w-full">
                                    <label className="font-medium">Email:</label>
                                    {editMode ? (
                                        <input
                                            name="email"
                                            value={modalData.email}
                                            onChange={handleEditChange}
                                            className="w-full border p-1 rounded mt-1"
                                        />
                                    ) : (
                                        <p>{modalData.email}</p>
                                    )}
                                </div>
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-2">
                                <MapPin size={16} className="mt-1" />
                                <div className="w-full">
                                    <label className="font-medium">Address:</label>
                                    {editMode ? (
                                        <input
                                            name="address"
                                            value={extraDetails?.address || ""}
                                            onChange={handleEditChange}
                                            className="w-full border p-1 rounded mt-1"
                                        />
                                    ) : (
                                        <p>{extraDetails?.address || "Not Available"}</p>
                                    )}
                                </div>
                            </div>

                            {/* Total Posts */}
                            <div className="flex items-start gap-2">
                                <Home size={16} className="mt-1" />
                                <div>
                                    <label className="font-medium">Total Posts:</label>
                                    <p>0</p>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        {editMode && (
                            <div className="flex justify-end">
                                <button
                                    onClick={handleEditSubmit}
                                    className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
                                >
                                    Save
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}


        </>
    )
}

export default SellerModal