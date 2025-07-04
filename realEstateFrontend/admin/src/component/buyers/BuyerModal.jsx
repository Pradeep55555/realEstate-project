import React, { useState } from "react";
import {
  Mail,
  Phone,
  Calendar,
  User
} from "lucide-react";
import dayjs from 'dayjs';

function BuyerModal({ buyerModalData, editMode, closeModal }) {

  const handleEditChange = (e) => {
    // Copy the updated field
    setModalData({ ...buyerModalData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    fetch(`http://localhost:4000/update-seller`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buyerModalData),
    })
      .then((res) => res.json())
      .then(() => {
        setSellers((prev) =>
          prev.map((s) =>
            s.mobile === buyerModalData.mobile ? buyerModalData : s
          )
        );
        closeModal();
      });
  };

  return (
    <>
      {buyerModalData && (
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
                src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                alt="Buyer Profile"
                className="w-30 h-30 rounded-full border-1 border-white shadow-md object-cover"
              />
            </div>

            {/* Buyer Name */}
            <h3 className="text-xl font-semibold text-center mb-6">
              {buyerModalData.full_name || "Not Available"}
            </h3>

            {/* Row 1: Mobile + Full Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {/* Mobile */}
              <div className="flex items-start gap-2">
                <Phone size={16} className="mt-1" />
                <div>
                  <label className="font-medium">Mobile:</label>
                  {editMode ? (
                    <input
                      name="mobile"
                      value={buyerModalData?.mobile || ""}
                      onChange={handleEditChange}
                      className="w-full border p-1 rounded mt-1"
                    />
                  ) : (
                    <p>{buyerModalData.mobile || "Not Available"}</p>
                  )}
                </div>
              </div>

              {/* Full Name */}
              <div className="flex items-start gap-2">
                <User size={16} className="mt-1" />
                <div>
                  <label className="font-medium">Full Name:</label>
                  {editMode ? (
                    <input
                      name="full_name"
                      value={buyerModalData?.full_name || ""}
                      onChange={handleEditChange}
                      className="w-full border p-1 rounded mt-1"
                    />
                  ) : (
                    <p>{buyerModalData.full_name || "Not Available"}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Row 2: Email + Created On */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Email */}
              <div className="flex items-start gap-2">
                <Mail size={16} className="mt-1" />
                <div>
                  <label className="font-medium">Email:</label>
                  {editMode ? (
                    <input
                      name="email"
                      value={buyerModalData?.email || ""}
                      onChange={handleEditChange}
                      className="w-full border p-1 rounded mt-1"
                    />
                  ) : (
                    <p>{buyerModalData.email || "Not Available"}</p>
                  )}
                </div>
              </div>

              {/* Created On */}
              <div className="flex items-start gap-2">
                <Calendar size={16} className="mt-1" />
                <div>
                  <label className="font-medium">Created On:</label>
                  <p>{dayjs(buyerModalData.created_on).format('DD MMM YYYY') || "Not Available"}</p>
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
  );
}

export default BuyerModal;
