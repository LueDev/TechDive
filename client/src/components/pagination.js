import React from 'react';
import '../styles/pagination.css';

const PaginationComponent = ({
  totalRecords,
  recordsPerPage,
  currentPage,
  onPageChange,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <a
            href={`#page-${currentPage}`}
            className="page-link"
            onClick={() => {
              if (currentPage !== 1) {
                onPageChange(currentPage - 1);
              }
            }}
          >
            Prev
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? 'active' : ''}`}
          >
            <a
              href={`#page-${currentPage}`}
              className="page-link"
              onClick={() => onPageChange(number)}
            >
              {number}
            </a>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
        >
          <a
            href={`#page-${currentPage}`}
            className="page-link"
            onClick={() => {
              if (currentPage !== totalPages) {
                onPageChange(currentPage + 1);
              }
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
