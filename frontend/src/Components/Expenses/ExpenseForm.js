import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons"; 

function ExpenseForm() {
    const {addExpense, error, setError} = useGlobalContext()
    const [inputState, setInputState] = useState({
      title: "",
      amount: "",
      date: "",
      imageUrl: "",
    });

    const { title, amount, date, imageUrl } = inputState;

    const handleInput = name => e => {
        setInputState({...inputState, [name]: e.target.value})
        setError('')
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!title || !amount || !date || !imageUrl) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please fill out all fields.",
        });
      } else if (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      } else {
        addExpense(inputState);
        setInputState({
          title: "",
          amount: "",
          date: "",
          imageUrl: "",
        });
        Swal.fire({
          icon: "success",
          title: "liabilities Added",
          text: "Your liabilities has been successfully added.",
        });
      }
    };




    return (
      <ExpenseFormStyled onSubmit={handleSubmit}>
        <h1>New liabilities</h1>
        <div className="input-control">
          <input
            type="text"
            value={title}
            name={"title"}
            placeholder="Title"
            onChange={handleInput("title")}
          />
        </div>
        <div className="input-control">
          <input
            value={amount}
            type="text"
            name={"amount"}
            placeholder={"Amount"}
            onChange={handleInput("amount")}
          />
        </div>

        <div className="input-control">
          <DatePickerStyled>
            <DatePicker
              id="date"
              selected={date}
              customInput={
                <CustomDatePickerInput>
                  <FontAwesomeIcon icon={faCalendar} />
                  {date ? date.toLocaleDateString() : "Select a date"}
                </CustomDatePickerInput>
              }
              dateFormat="dd/MM/yyyy"
              onChange={(date) => {
                setInputState({ ...inputState, date: date });
              }}
            />
          </DatePickerStyled>
        </div>

        <div className="input-control">
          <input
            type="text"
            placeholder="Image URL"
            name="imageUrl"
            value={imageUrl}
            onChange={handleInput("imageUrl")}
          />
        </div>

        <div className="submit-btn">
          <Button
            name={"Confirm"}
            bPad={".8rem 1.6rem"}
            bRad={"10px"}
            bg={"var(--color-button"}
            color={"#fff"}
          />
        </div>
      </ExpenseFormStyled>
    );
}

const DatePickerStyled = styled.div`
  .react-datepicker-wrapper {
    width: 55%;
  }
`;

const CustomDatePickerInput = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 2px solid #fff;
  background: transparent;
  cursor: pointer;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  color: rgba(34, 34, 96, 0.9);

  svg {
    margin-right: 0.5rem;
  }

  &:hover {
    border-color: rgba(34, 34, 96, 0.4);
  }
`;


const ExpenseFormStyled = styled.form`
   margin-top: 7%;
  margin-left: 15%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);
    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }
  .input-control {
    input {
      border: solid 1px;
      width: 55%;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;
    select {
      color: rgba(34, 34, 96, 0.4);
      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

   .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:active{
                 bg={"var(--color-endi"}
                transform: translateY(5px);
     }
    }
  }
`;

export default ExpenseForm