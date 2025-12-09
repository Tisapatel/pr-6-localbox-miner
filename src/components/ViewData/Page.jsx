import React from "react";
import "./Page.css";

function Page({
  list,
  currentItems,
  itemPerPage,
  currentPage,
  handleEdit,
  handleDelete,
  handleNext,
  handlePrev,
  totalPage,
  handlePage,
}) {
  // Generate page numbers with ellipsis for many pages
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Show max 5 page buttons
    
    if (totalPage <= showPages) {
      // Show all pages if less than or equal to showPages
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      // Show pages with ellipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPage);
      } else if (currentPage >= totalPage - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPage - 3; i <= totalPage; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPage);
      }
    }
    
    return pages;
  };

  return (
    <div className="view-page">
      <div className="view-container">
        <div className="header-section">
          <h2 className="title"> Users Data</h2>
          <p className="subtitle">Total Users: <strong>{list.length}</strong></p>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Sr. No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((val, index) => {
                  const { username, email, password, id } = val;
                  const startIndex = (currentPage - 1) * itemPerPage + (index + 1);
                  return (
                    <tr key={id}>
                      <td data-label="Sr. No">{startIndex}</td>
                      <td data-label="Username">{username}</td>
                      <td data-label="Email">{email}</td>
                      <td data-label="Password">{"•".repeat(password.length)}</td>
                      <td data-label="Actions">
                        <div className="action-buttons">
                          <button
                            className="btn btn-edit"
                            onClick={() => handleEdit(id)}
                            title="Edit User"
                          >
                             Edit
                          </button>
                          <button
                            className="btn btn-delete"
                            onClick={() => handleDelete(id)}
                            title="Delete User"
                          >
                             Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="no-data">
                    <div className="empty-state">
                      <span className="empty-icon">📭</span>
                      <p>No users found</p>
                      <small>Add your first user to get started!</small>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Compact Pagination */}
        {totalPage > 0 && (
          <div className="pagination">
            <button
              className="btn-pagination btn-prev"
              onClick={handlePrev}
              disabled={currentPage === 1}
            >
              ← Prev
            </button>

            <div className="page-numbers">
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} style={{ padding: '0 8px', color: '#9ca3af' }}>
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    className={`btn-pagination btn-page ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => handlePage(page)}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            <button
              className="btn-pagination btn-next"
              onClick={handleNext}
              disabled={currentPage === totalPage}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;