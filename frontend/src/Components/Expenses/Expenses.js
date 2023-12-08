import React, { useEffect, useState } from "react";
import styled from 'styled-components'
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import Form from '../Form/Form';
import IncomeItem from '../IncomeItem/IncomeItem';
import ExpenseForm from './ExpenseForm';
import Swal from "sweetalert2";


function Expenses() {
    const {addIncome,expenses, getExpenses, deleteExpense, totalExpenses} = useGlobalContext()

    useEffect(() =>{
        getExpenses()
    }, [])

 const itemsPerPage = 3;
 const [currentPage, setCurrentPage] = useState(1);

 const lastIndex = currentPage * itemsPerPage;
 const firstIndex = lastIndex - itemsPerPage;
 const currentExpenses = expenses.slice(firstIndex, lastIndex);

 const totalPages = Math.ceil(expenses.length / itemsPerPage);

 const nextPage = () => {
   setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
 };

 const prevPage = () => {
   setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
 };

    return (
      <ExpenseStyled>
        <InnerLayout>
          <h1>Weapon</h1>
          <h2 className="total-income">
            Total liabilities: <span>${totalExpenses()}</span>
          </h2>
          <div className="income-content">
            <div className="incomes">
              {currentExpenses.map((expense) => {
                // Use currentExpenses here
                const { _id, title, amount, category, date, type, imageUrl } =
                  expense;
                console.log(expense);
                return (
                  <IncomeItem
                    key={_id}
                    id={_id}
                    title={title}
                    amount={amount}
                    imageUrl={imageUrl}
                    date={date}
                    type={type}
                    category={category}
                    indicatorColor="var(--color-green)"
                    deleteItem={deleteExpense}
                  />
                );
              })}
            </div>
          </div>
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
        </InnerLayout>
      </ExpenseStyled>
    );
}


const PaginationStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 2rem;
  margin-bottom: 1rem;
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

const ExpenseStyled = styled.div`
  display: flex;
  overflow: auto;
  .total-income {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin: 1rem 0;
    font-size: 2rem;
    gap: 0.5rem;
    span {
      font-size: 2.5rem;
      font-weight: 800;
      color: var(--color-green);
    }
  }
  .income-content {
    margin-left: 20%;
    justify-content: center;
    align-items: center;
    width: 61%;
    display: flex;
    gap: 2rem;
    .incomes {
      flex: 1;
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    }
  }
`;

export default Expenses