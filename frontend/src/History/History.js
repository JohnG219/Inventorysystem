import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/globalContext";

function History() {
  const {
    transactionHistory,
    totalExpenses,
    incomes,
    expenses,
    totalIncome,
    totalBalance,
    getIncomes,
    getExpenses,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, []);

  const [...history] = transactionHistory();

  return (
    <HistoryStyled>
      <h2>Recent History</h2>
      <div className="history-con">
        <h2 className="salary-title">
          Minimum <span>Assets</span>Maximum
        </h2>
        <div className="salary-item">
          <p>${Math.min(...incomes.map((item) => item.amount))}</p>
          <p>${Math.max(...incomes.map((item) => item.amount))}</p>
        </div>
        <h2 className="salary-title">
          Minimum<span>liabilities</span>Maximum
        </h2>
        <div className="salary-item">
          <p>${Math.min(...expenses.map((item) => item.amount))}</p>
          <p>${Math.max(...expenses.map((item) => item.amount))}</p>
        </div>
      </div>
      <h3 className="adding">New Assets and liabilities</h3>
      {history.map((item) => {
        const { _id, title, amount, type } = item;
        return (
          <div key={_id} className="history-item">
            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {title}
            </p>

            <p
              style={{
                color: type === "expense" ? "red" : "var(--color-green)",
              }}
            >
              {type === "expense"
                ? `${amount <= 0 ? 0 : amount}`
                : `${amount <= 0 ? 0 : amount}`}
            </p>
          </div>
        );
      })}
    </HistoryStyled>
  );
}

const HistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 105vh;
  .history-item {
    background: #fcf6f9;
    border: 2px solid #ffffff;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

   .history-con {
      grid-column: 4 / -1;
      h2 {
         margin: 1rem 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .salary-title {
        font-size: 1.2rem;
        margin-top: 100px
        span {
          font-size: 1.8rem;
        }
      }
      .salary-item {
        margin-bottom: 27px;
        background: #fcf6f9;
        border: 2px solid #ffffff;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        padding: 1rem;
        border-radius: 3px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-weight: 600;
          font-size: 1.6rem;
        }
      }
    
    .adding {
      color: black;
    }
`;

export default History;
