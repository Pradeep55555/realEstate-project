// SellerTable.jsx
import React from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import dayjs from 'dayjs';

const BuyerTable = ({
  currentBuyers,
  indexOfFirst,
  handleToggleStatus,
  openModal,
  handleDelete,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg shadow-md">
      <table className="w-full table-auto border-separate border-spacing-y-[2px] text-sm">
        <thead className="bg-gray-100 text-center">
          <tr>
            <th className="py-2 px-4 text-start">#</th>
            <th className="py-2 px-4 text-start">Name</th>
            <th className="py-2 px-4 text-start">Mobile</th>
            <th className="py-2 px-4 text-start">Status</th>
            <th className="py-2 px-4 text-start">Created</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentBuyers.map((buyer, index) => (
            <tr key={buyer.mobile} className="text-start bg-white shadow-sm rounded">
              <td className="py-2 px-4 whitespace-nowrap">{indexOfFirst + index + 1}</td>
              <td className="py-2 px-4 whitespace-nowrap">{buyer.full_name}</td>
              <td className="py-2 px-4 whitespace-nowrap">{buyer.mobile}</td>
              <td className="py-2 px-4 whitespace-nowrap">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={buyer.status === "active"}
                    onChange={() => handleToggleStatus(buyer.mobile, buyer.status)}
                  />
                  <div className="w-11 h-[17px] bg-gray-300 peer-focus:ring-1 peer-focus:ring-blue-500 rounded-full peer peer-checked:bg-green-500 relative transition-colors duration-300">
                    <div className="absolute top-[.5px] left-[2px] bg-white w-4 h-4 rounded-full transition-transform duration-300 transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </td>
              <td className="py-2 px-4 whitespace-nowrap">{dayjs(buyer.created_on).format('DD MMM YYYY')}</td>
              <td className="py-2 px-4 whitespace-nowrap space-x-2 flex justify-center">
                <button title="View" onClick={() => openModal(buyer, false)} className="text-blue-500 hover:text-blue-700 cursor-pointer">
                  <Eye size={18} />
                </button>
                <button title="Edit" onClick={() => openModal(buyer, true)} className="text-yellow-500 hover:text-yellow-700 cursor-pointer">
                  <Pencil size={18} />
                </button>
                <button title="Delete" onClick={() => handleDelete(buyer.mobile)} className="text-red-500 hover:text-red-700 cursor-pointer">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
          {currentBuyers.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">
                No Buyers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BuyerTable;
