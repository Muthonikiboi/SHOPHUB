/* eslint-disable react-hooks/rules-of-hooks */
import React, {  useMemo,  useState } from "react";

// React Icons
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { BiSolidTrash } from "react-icons/bi";

const ProductRetailer= () => {
  const initialData = Array.from({ length: 35 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role: index % 3 === 0 ? "Admin" : index % 2 === 0 ? "Editor" : "User",
    status: index % 2 === 0 ? "Active" : "Inactive",
  }));

  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRows, setSelectedRows] = useState(new Set());

  // Handle search
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // Handle sorting
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handle selection
  const toggleAllInPage = (event) => {
    const newSelected = new Set(selectedRows);
    paginatedData.forEach((item) => {
      if (event.target.checked) {
        newSelected.add(item.id);
      } else {
        newSelected.delete(item.id);
      }
    });
    setSelectedRows(newSelected);
  };

  const toggleRow = (id:number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const isAllInPageSelected = paginatedData.every((item) =>
    selectedRows.has(item.id)
  );

  // Handle bulk delete
  const handleBulkDelete = () => {
    const remainingData = data.filter((item) => !selectedRows.has(item.id));
    setData(remainingData);
    setSelectedRows(new Set());
  };

  // Handle page change
  const handlePageChange = (page:number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <div className="mx-auto p-4 w-full h-full">
      {/* Search & Bulk Actions */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm py-2.5 px-4 border border-gray-200 rounded-md outline-none focus:border-blue-300"
          />
          {selectedRows.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 text-red-500"
            >
              <BiSolidTrash className="h-4 w-4" />
              Delete Selected ({selectedRows.size})
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border border-gray-200 w-full">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 w-14">
                <input
                  type="checkbox"
                  checked={isAllInPageSelected}
                  onChange={toggleAllInPage}
                />
              </th>
              {["name", "email", "role", "status"].map((key) => (
                <th
                  key={key}
                  className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                  onClick={() => handleSort(key)}
                >
                  <div className="flex items-center gap-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <HiOutlineArrowsUpDown className="text-[1rem]" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className={`border-t border-gray-200 ${
                  selectedRows.has(item.id)
                    ? "bg-blue-50 hover:bg-blue-50"
                    : "hover:bg-gray-50"
                }`}
              >
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.has(item.id)}
                    onChange={() => toggleRow(item.id)}
                  />
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.email}</td>
                <td className="p-3">{item.role}</td>
                <td className="p-3">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="py-1 px-3 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="py-1 px-3 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductRetailer;
