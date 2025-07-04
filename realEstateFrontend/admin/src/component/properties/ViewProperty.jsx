import React from "react";

const ViewProperty = ({ open, property, onClose }) => {
    if (!open || !property) return null;

    const { property_number, mobile, property_type, categories, state,
        city, location, nearby,  description, area,
        price, post_date, ownership, purpose, status } = property;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-m flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl max-h-[95vh] overflow-y-auto p-6 py-8 m-3">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-600">
                        Posted on: {new Date(post_date).toLocaleDateString("en-GB")}
                    </p>
                    <button
                        className="text-red-500 hover:text-red-700 font-bold text-lg"
                        onClick={onClose}
                    >✕</button>
                </div>

                {/* Image Scroll Row */}
                {property.photos && property.photos.length > 0 && (
                    <div className="mb-8">
                        <div className="flex overflow-x-auto gap-3 pb-2">
                            {property.photos.map((photo, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:4000/assets/${photo}`}
                                    alt={`Photo ${index + 1}`}
                                    className="h-35 w-auto object-cover rounded shadow"
                                />
                            ))}
                        </div>
                    </div>
                )}


                {/* Property Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div><strong>Property Number:</strong> {property_number}</div>
                    <div><strong>Seller Mobile:</strong> {mobile}</div>
                    <div><strong>Type:</strong> {property_type}</div>
                    <div><strong>Category:</strong> {categories}</div>
                    <div><strong>Purpose:</strong> {purpose}</div>
                    <div><strong>Ownership:</strong> {ownership}</div>
                    <div><strong>Status:</strong> {status}</div>
                    <div><strong>State:</strong> {state}</div>
                    <div><strong>City:</strong> {city}</div>
                    <div><strong>Location:</strong> {location}</div>
                    <div><strong>Nearby:</strong> {nearby}</div>
                    <div><strong>Area (sq.ft):</strong> {area}</div>
                    <div><strong>Price (₹):</strong> {price}</div>
                    <div className="lg:col-span-2 sm:col-span-2"> <strong>Description : </strong>{description}  </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProperty;
