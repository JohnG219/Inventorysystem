import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons"; 

function Form() {
  const { addIncome, getIncomes, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    description: "",
    imageUrl: "",
  });

  const { title, amount, date, description, imageUrl } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !description || !date || !imageUrl) {
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
      addIncome(inputState);
      setInputState({
        title: "",
        amount: "",
        date: "",
        imageUrl: "",
        description: "",
      });
      Swal.fire({
        icon: "success",
        title: "New Assets Confirmed",
        text: "Your Assets has been successfully added.",
      });
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      <h1>New Assets</h1>
      <div className="input-control">
        <input
          type="text"
          value={title}
          name={"title"}
          placeholder="Assets Name"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          value={amount}
          type="text"
          name={"amount"}
          placeholder={"Value"}
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

      <label className="agree">
        <input
          type="checkbox"
          name="description"
          value="HOT"
          onChange={handleInput("description")}
        />
        Agreement
      </label>

      <div className="submit-btn">
        <Button
          name={"Confirm"}
          bPad={".8rem 1.6rem"}
          bRad={"10px"}
          bg={"var(--color-button"}
          color={"#fff"}
        />
      </div>
    </FormStyled>
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


const FormStyled = styled.form`
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

  .agree {
    color: green;
    input {
      margin-left: 5px;
      margin-right: 5px;
      cursor: pointer;
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
export default Form;
