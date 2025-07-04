import React, { useState, useMemo } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import dayjs from "dayjs";

const PropertyTable = ({
  properties,
  filters,
  searchTerm,
  itemsPerPage,
  setItemsPerPage,
  onView,
  onEdit,
  onDelete,
}) => {
  const [sortConfig, setSortConfig] = useState({ key: "post_date", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = useMemo(() => {
    let data = properties;

    // Apply filters
    data = data.filter((p) =>
      (!filters.state || p.state === filters.state) &&
      (!filters.city || p.city === filters.city) &&
      (!filters.type || p.property_type === filters.type)
    );

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      data = data.filter((p) =>
        p.property_number.toLowerCase().includes(term) ||
        p.mobile.toLowerCase().includes(term)
      );
    }

    // Sorting
    data.sort((a, b) => {
      const dir = sortConfig.direction === "asc" ? 1 : -1;
      const valA = a[sortConfig.key] || "";
      const valB = b[sortConfig.key] || "";
      return valA > valB ? dir : valA < valB ? -dir : 0;
    });

    return data;
  }, [properties, filters, searchTerm, sortConfig]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginated = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    setSortConfig({ key, direction });
  };

  return (
    <>
      <div className="overflow-x-auto border rounded shadow border-gray-200">
        <table className="min-w-[1100px] w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">#</th>
              {["property_number", "mobile", "property_type", "city", "state", "post_date"].map((key) => (
                <th
                  key={key}
                  className="p-2 cursor-pointer"
                  onClick={() => requestSort(key)}
                >
                  {key.replace("_", " ").toUpperCase()}
                  {sortConfig.key === key && (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
                </th>
              ))}
              <th className="p-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((item, idx) => (
              <tr key={item.property_number} className="border-t border-gray-200">
                <td className="p-2">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                <td className="p-2">{item.property_number}</td>
                <td className="p-2">{item.mobile}</td>
                <td className="p-2">{item.property_type}</td>
                <td className="p-2">{item.city}</td>
                <td className="p-2">{item.state}</td>
                <td className="p-2">{dayjs(item.post_date).format("DD MMM YYYY")}</td>
                <td className="p-2 flex gap-2">
                  <button onClick={() => onView(item)} className="text-blue-500">
                    <Eye size={18} />
                  </button>
                  <button onClick={() => onEdit(item)} className="text-green-500">
                    <Pencil size={18} />
                  </button>
                  <button onClick={() => onDelete(item.property_number)} className="text-red-500">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center py-2 text-sm flex-wrap gap-2">
        <span>
          Showing {filteredData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length}
        </span>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <label htmlFor="itemsPerPage">Rows:</label>
            <select
              id="itemsPerPage"
              className="border px-2 py-1 rounded"
              value={itemsPerPage}
              onChange={(e) => {
                setCurrentPage(1);
                setItemsPerPage(Number(e.target.value));
              }}
            >
              {[3, 5, 10, 25, 50, 100].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default PropertyTable;
