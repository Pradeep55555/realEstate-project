// import React, { useState, useMemo } from "react";
// import { Eye, Pencil, Trash2 } from "lucide-react";

// import dayjs from "dayjs";

// import ViewProperty from "./ViewProperty";
// import EditProperty from "./EditProperty";

// const Properties = ({ properties }) => {

//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({ state: "", city: "", type: "" });
//   const [sortConfig, setSortConfig] = useState({ key: "post_date", direction: "desc" });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [viewModal, setViewModal] = useState({ open: false, prop: null });
//   const [editModal, setEditModal] = useState({ open: false, prop: null });


//   // Unique filter options
//   const states = [...new Set(properties.map((p) => p.state))];
//   const cities = [...new Set(properties.map((p) => p.city))];
//   const types = [...new Set(properties.map((p) => p.property_type))];

//   // Filtered + searched + sorted list
//   const processed = useMemo(() => {
//     let data = properties;

//     // Filters
//     data = data.filter((p) =>
//       (!filters.state || p.state === filters.state) &&
//       (!filters.city || p.city === filters.city) &&
//       (!filters.type || p.property_type === filters.type)
//     );
//     // Search
//     if (searchTerm) {
//       const term = searchTerm.toLowerCase();
//       data = data.filter((p) =>
//         Object.values(p).join(" ").toLowerCase().includes(term)
//       );
//     }
//     // Sort
//     data.sort((a, b) => {
//       const dir = sortConfig.direction === "asc" ? 1 : -1;
//       const valA = a[sortConfig.key] || "";
//       const valB = b[sortConfig.key] || "";
//       return valA > valB ? dir : valA < valB ? -dir : 0;
//     });
//     return data;
//   }, [properties, filters, searchTerm, sortConfig]);

//   // Pagination
//   const totalPages = Math.ceil(processed.length / itemsPerPage);
//   const paginated = processed.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const requestSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
//     setSortConfig({ key, direction });
//   };

//   return (
//     <div className="space-y-4">
//       <h2 className="text-2xl font-bold">All Properties</h2>
//       {/* Search & Filters */}
//       <div className="flex flex-wrap justify-between items-end gap-2  ">
//         <input type="text" placeholder="Search by property Number , state , city , type ..."
//           className="border rounded px-3 py-1 flex-grow   border-gray-400" value={searchTerm}
//           onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
//         />

//         <select className="border rounded px-3 py-1  border-gray-400 cursor-pointer"
//           value={filters.state} onChange={(e) => { setFilters(f => ({ ...f, state: e.target.value })); setCurrentPage(1); }}
//         >
//           <option value="">All States</option>
//           {states.map((s) => <option key={s} value={s}>{s}</option>)}
//         </select>

//         <select
//           className="border rounded px-3 py-1  border-gray-400 cursor-pointer"
//           value={filters.city}
//           onChange={(e) => { setFilters(f => ({ ...f, city: e.target.value })); setCurrentPage(1); }}
//         >
//           <option value="">All Cities</option>
//           {cities.map((c) => <option key={c} value={c}>{c}</option>)}
//         </select>

//         <select
//           className="border rounded px-3 py-1  border-gray-400 cursor-pointer"
//           value={filters.type}
//           onChange={(e) => { setFilters(f => ({ ...f, type: e.target.value })); setCurrentPage(1); }}
//         >
//           <option value="">All Types</option>
//           {types.map((t) => <option key={t} value={t}>{t}</option>)}
//         </select>

//         <button
//           className="border rounded px-3 py-1 bg-gray-200  border-gray-400 cursor-pointer"
//           onClick={() => { setFilters({ state: "", city: "", type: "" }); }}
//         >
//           Clear Filters
//         </button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto border rounded shadow   border-gray-200">
//         <table className="min-w-[1100px] w-full text-sm">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               {["#", "property_number", " seller mobile", "property_type", "city", "state", "post_date", "actions"].map((col) => (
//                 <th
//                   key={col}
//                   className="p-2 cursor-pointer"
//                   onClick={() => col !== "#" && col !== "actions" && requestSort(col)}
//                 >
//                   {col.replace("_", " ").toUpperCase()}
//                   {sortConfig.key === col && (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
//                 </th>
//               ))}
//             </tr>
//           </thead>

//           <tbody>
//             {paginated.map((item, idx) => {
//               return (
//                 <tr key={item.property_number} className="border-t  border-gray-200">
//                   <td className="p-2">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
//                   <td className="p-2">{item.property_number}</td>
//                   <td className="p-2">{item.mobile}</td>
//                   <td className="p-2">{item.property_type}</td>
//                   <td className="p-2">{item.city}</td>
//                   <td className="p-2">{item.state}</td>
//                   <td className="p-2">{dayjs(item.post_date).format("DD MMM YYYY")}</td>
//                   <td className="p-2 flex gap-3">
//                     <button
//                       className="text-blue-500 hover:text-blue-700"
//                       onClick={() => setViewModal({ open: true, prop: item })}
//                       title="View"
//                     >
//                       <Eye size={18} />
//                     </button>
//                     <button
//                       className="text-green-500 hover:text-green-700"
//                       onClick={() => setEditModal({ open: true, prop: item })}
//                       title="Edit"
//                     >
//                       <Pencil size={18} />
//                     </button>
//                     <button
//                       className="text-red-500 hover:text-red-700"
//                       onClick={() => onDelete(item.property_number)}
//                       title="Delete"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                   </td>

//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//       {/* Pagination */}
//       <div className="flex justify-between items-center py-2 text-sm flex-wrap gap-2">
//         <span>
//           Showing {processed.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{" "}
//           {Math.min(currentPage * itemsPerPage, processed.length)} of {processed.length}
//         </span>

//         <div className="flex items-center gap-3">
//           {/* Items per page dropdown */}
//           <div className="flex items-center gap-1">
//             <label htmlFor="itemsPerPage">Rows : </label>
//             <select
//               id="itemsPerPage"
//               className="border px-2 py-1 rounded cursor-pointer"
//               value={itemsPerPage}
//               onChange={(e) => {
//                 setCurrentPage(1);
//                 setItemsPerPage(Number(e.target.value));
//               }}
//             >
//               {[3, 5, 7, 10, 25, 50, 100].map((count) => (
//                 <option key={count} value={count}>
//                   {count}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Pagination buttons */}
//           <button
//             disabled={currentPage === 1}
//             onClick={() => setCurrentPage((p) => p - 1)}
//             className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
//           >
//             Prev
//           </button>
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => setCurrentPage((p) => p + 1)}
//             className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {viewModal.open && (
//         <ViewProperty
//           open={viewModal.open}
//           property={viewModal.prop}
//           onClose={() => setViewModal({ open: false, prop: null })}
//         />
//       )}

//       {editModal.open  && (
//         <EditProperty
//           property={editModal.prop}
//           onClose={() => setEditModal({ open: false, prop: null })}
//         />
//       )}

//     </div>

//   );
// };

// export default Properties;


import React, { useState } from "react";
import ViewProperty from "./ViewProperty";
import EditProperty from "./EditProperty";
import PropertyTable from "./PropertyTable";

const Properties = ({ properties, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ state: "", city: "", type: "" });
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [viewModal, setViewModal] = useState({ open: false, prop: null });
  const [editModal, setEditModal] = useState({ open: false, prop: null });

  const states = [...new Set(properties.map((p) => p.state))];
  const cities = [...new Set(properties.map((p) => p.city))];
  const types = [...new Set(properties.map((p) => p.property_type))];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">All Properties</h2>

      {/* Search & Filters */}
      <div className="flex flex-wrap justify-between items-end gap-2">
        <input
          type="text"
          placeholder="Search by property number or seller mobile..."
          className="border rounded px-3 py-1 flex-grow border-gray-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="border rounded px-3 py-1 border-gray-400"
          value={filters.state}
          onChange={(e) => setFilters((f) => ({ ...f, state: e.target.value }))}
        >
          <option value="">All States</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-1 border-gray-400"
          value={filters.city}
          onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
        >
          <option value="">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-3 py-1 border-gray-400"
          value={filters.type}
          onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
        >
          <option value="">All Types</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button
          className="border rounded px-3 py-1 bg-gray-200 border-gray-400"
          onClick={() => setFilters({ state: "", city: "", type: "" })}
        >
          Clear Filters
        </button>
      </div>

      {/* Table */}
      <PropertyTable
        properties={properties}
        filters={filters}
        searchTerm={searchTerm}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        onView={(prop) => setViewModal({ open: true, prop })}
        onEdit={(prop) => setEditModal({ open: true, prop })}
        onDelete={onDelete}
      />

      {/* Modals */}
      {viewModal.open && (
        <ViewProperty
          open={viewModal.open}
          property={viewModal.prop}
          onClose={() => setViewModal({ open: false, prop: null })}
        />
      )}

      {editModal.open && (
        <EditProperty
          property={editModal.prop}
          onClose={() => setEditModal({ open: false, prop: null })}
        />
      )}
    </div>
  );
};

export default Properties;
