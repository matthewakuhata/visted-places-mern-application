import React, { useReducer, useEffect } from "react";

import { validate } from "../../../utils/validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = ({
  type,
  id,
  label,
  placeholder,
  rows,
  errorText,
  className,
  validators,
  onInput,
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  useEffect(() => {
    onInput(id, inputState.value, inputState.isValid);
  }, [id, inputState.value, inputState.isValid, onInput]);

  const onChangeHandler = (event) => {
    dispatch({ type: "CHANGE", val: event.target.value, validators });
  };

  const onTouchHandler = () => {
    dispatch({ type: "TOUCH" });
  };

  const element =
    type === "textarea" ? (
      <textarea
        id={id}
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={inputState.value}
        onBlur={onTouchHandler}
      />
    ) : (
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        rows={rows || 3}
        value={inputState.value}
        onChange={onChangeHandler}
        onBlur={onTouchHandler}
      />
    );

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      } ${className}`}
    >
      <label htmlFor={id}>{label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
