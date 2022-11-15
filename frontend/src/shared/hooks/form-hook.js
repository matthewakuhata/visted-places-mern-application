import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const input in state.inputs) {
        if (!state.inputs[input]) continue;

        if (input === action.id) {
          formIsValid =
            formIsValid &&
            action.isValid &&
            state.initialInputs[input].value !== action.value;
        } else {
          formIsValid = formIsValid && state.inputs[input].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.id]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        isValid: action.formIsValid,
        inputs: action.inputs,
        initialInputs: action.inputs,
      };
    default:
      return state;
  }
};

export const useForm = ({ inputs, formIsValid }) => {
  const [formState, dispatch] = useReducer(formReducer, {
    isValid: formIsValid,
    inputs,
    initialInputs: inputs,
  });

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: inputData,
      initialInputs: inputData,
      formIsValid: formValidity,
    });
  }, []);

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "INPUT_CHANGE", value, isValid, id });
  }, []);

  return [formState, inputHandler, setFormData];
};
