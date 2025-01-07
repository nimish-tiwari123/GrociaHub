import React from "react";
import "./style.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const maxVisibleButtons = 5;
  const handlePageClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`page-number ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageClick(i)}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination-container">
      <button
        className="arrow-button"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {renderPageNumbers()}
      {currentPage < totalPages - 2 && (
        <>
          <span className="dots">...</span>
          <button
            className="page-number"
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        className="arrow-button"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
