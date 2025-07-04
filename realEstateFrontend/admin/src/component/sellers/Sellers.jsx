// Sellers.jsx
import React, { useState } from "react";
import dayjs from 'dayjs';

import SellerModal from "./SellerModal";
import SellerTable from "./SellerTable";

function Sellers({ sellers}) {

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sellersPerPage, setSellersPerPage] = useState(5);
  const [modalData, setModalData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [extraDetails, setExtraDetails] = useState(null);

  const filteredSellers = sellers.filter(
    (s) =>
      s.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.mobile.includes(searchTerm)
  );

  const indexOfLast = currentPage * sellersPerPage;
  const indexOfFirst = indexOfLast - sellersPerPage;
  const currentSellers = filteredSellers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSellers.length / sellersPerPage);

  const formatDate = (dateStr) => {
        return dayjs(dateStr).format('DD MMM YYYY');
    };

  const handleToggleStatus = (mobile, currentStatus) => {
    const newStatus = currentStatus === "active" ? "deactive" : "active";
    fetch(`http://localhost:4000/update-seller-status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mobile, status: newStatus }),
    })
      .then((res) => res.json())
      .then(() => {
        setSellers((prev) =>
          prev.map((s) =>
            s.mobile === mobile ? { ...s, status: newStatus } : s
          )
        );
      });
  };

  const handleDelete = (mobile) => {
    if (window.confirm("Are you sure to delete this seller?")) {
      fetch(`http://localhost:4000/delete-seller/${mobile}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() =>
          setSellers((prev) => prev.filter((s) => s.mobile !== mobile))
        );
    }
  };

  const openModal = (seller, isEdit = false) => {
    setModalData(seller);
    setEditMode(isEdit);

    fetch(`http://localhost:4000/api/seller/details/${seller.mobile}`)
      .then((res) => res.json())
      .then((data) => setExtraDetails(data))
      .catch(() => setExtraDetails(null));
  };

  const closeModal = () => {
    setModalData(null);
    setEditMode(false);
    setExtraDetails(null);
  };

  return (
    <div className="px-2 md:px-4">
      {/* Header and Search */}
      <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center mb-4">
        <h2 className="text-2xl font-bold">All Sellers</h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <input
            type="text"
            placeholder="Search by name, email, or mobile"
            className="border p-1 rounded w-full sm:w-64"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <select
            value={sellersPerPage}
            onChange={(e) => {
              setSellersPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border p-1 rounded"
          >
            {[3, 5, 10, 20, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num} / page
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Component */}
      <SellerTable
        currentSellers={currentSellers}
        indexOfFirst={indexOfFirst}
        handleToggleStatus={handleToggleStatus}
        openModal={openModal}
        handleDelete={handleDelete}
      />

      {/* Pagination */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
         {(() => {

          // Decide how many buttons based on screen width
          const screenWidth = window.innerWidth;
          let maxButtons = 7;
          if (screenWidth < 640) maxButtons = 3; // mobile
          else if (screenWidth < 768) maxButtons = 5; // tablet

          const pages = [];
          let start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
          let end = start + maxButtons - 1;

          if (end > totalPages) {
            end = totalPages;
            start = Math.max(1, end - maxButtons + 1);
          }

          if (start > 1) {
            pages.push(
              <button key={1} className={`px-3 py-1 border rounded ${currentPage === 1 ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => setCurrentPage(1)}>1</button>
            );
            if (start > 2) pages.push(<span key="start-ellipsis">...</span>);
          }

          for (let i = start; i <= end; i++) {
            pages.push(
              <button
                key={i}
                className={`px-3 py-1 border rounded ${currentPage === i ? "bg-blue-500 text-white" : "bg-white"}`}
                onClick={() => setCurrentPage(i)}
              >
                {i}
              </button>
            );
          }

          if (end < totalPages) {
            if (end < totalPages - 1) pages.push(<span key="end-ellipsis">...</span>);
            pages.push(
              <button key={totalPages} className={`px-3 py-1 border rounded ${currentPage === totalPages ? "bg-blue-500 text-white" : "bg-white"}`} onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
            );
          }

          return pages;
        })()}
      </div>

      {/* Modal */}


      {modalData && (
        <SellerModal
          modalData={modalData}
          editMode={editMode}
          closeModal={closeModal}
          extraDetails={extraDetails}
        />
      )}
    </div>
  );
}

export default Sellers;
