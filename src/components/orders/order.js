// OrdersPage.js
import React, { useState } from "react";
import { orders } from "../mockdata/mockdata"; // Import the mock data

const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter orders based on search query
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().includes(searchQuery) ||
      order.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.pickupDate.includes(searchQuery) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h2>Orders</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
      />
      <table>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Vendor name</th>
            <th>Pick up date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.vendorName}</td>
              <td>{order.pickupDate}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
