import React, { useState } from "react";
import IncomeItem from "./IncomeItem";
import Income from "../Income/Income";
import styled from "styled-components";


function Pagination({ items }) {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentItems = items.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const deleteItem = (id) => {
    // Implement your delete item logic here
  };

  const indicatorColor = "#ff0000"; // Replace with your actual indicator color

  return (
    <PaginationStyled>
      <button onClick={prevPage} disabled={currentPage === 1}>
        Previous Page
      </button>
      <span>
        {currentPage} / {totalPages}
      </span>
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        Next Page
      </button>
    </PaginationStyled>
  );
}

const PaginationStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  button {
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    background-color: var(--primary-color);
    color: #fff;
    cursor: pointer;

    &:disabled {
      background-color: gray;
      cursor: not-allowed;
    }
  }
`;

export default Pagination;
