import React, { useState } from "react";

const EditProperty = ({ property, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({ ...property });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-m flex items-center justify-center z-50">
      <div className="bg-white p-6 m-4 rounded shadow-lg max-w-5xl w-full max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Property</h2>
          <button
            className="text-red-500 hover:text-red-700 font-bold text-lg"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-1.5 text-sm">
            <div>
              <label className="block font-medium">Property Number</label>
              <input
                type="text"
                name="property_number"
                value={formData.property_number}
                disabled
                className="border my-1 px-3 py-1.5 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="border  my-1 px-3 py-1.5 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Property Type</label>
              <input
                type="text"
                name="property_type"
                value={formData.property_type}
                onChange={handleChange}
                className="border  my-1 px-3 py-1.5 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Categories</label>
              <input
                type="text"
                name="categories"
                value={formData.categories}
                onChange={handleChange}
                className="border my-1  px-3 py-1.5 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Purpose</label>
              <input
                type="text"
                name="purpose"
                value={formData.purpose}
                onChange={handleChange}
                className="border  my-1 px-3 py-1.5 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Ownership</label>
              <input
                type="text"
                name="ownership"
                value={formData.ownership}
                onChange={handleChange}
                className="border  my-1 px-3 py-1.5 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border  my-1 px-3 py-1.5 w-full rounded"
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="border my-1  px-3 py-1.5 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border my-1  px-3 py-1.5 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="border  my-1 px-3 py-1.5 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Nearby</label>
              <input
                type="text"
                name="nearby"
                value={formData.nearby}
                onChange={handleChange}
                className="border  my-1 px-3 py-1.5 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Area (sq.ft)</label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="border  my-1 px-3 py-1.5 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="border  my-1 px-3 py-1.5 w-full rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Post Date</label>
              <input
                type="date"
                name="post_date"
                value={formData.post_date?.split("T")[0]}
                onChange={handleChange}
                className="border  my-1 px-3 py-1.5 w-full rounded"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="border my-1  px-3 py-1.5 w-full h-20 rounded resize-none"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-700 px-6 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-1 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
