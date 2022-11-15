import React from "react";

import { Input, Button } from "../../shared/components/FormElements";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import "./PlaceForm.css";

const NewPlace = () => {
  const [formState, inputHandler] = useForm({
    formIsValid: false,
    inputs: {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
  });

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // Send to backend
  };

  return (
    <form onSubmit={placeSubmitHandler} className="place-form">
      <Input
        id="title"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler}
      />
      <Input
        id="description"
        type="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description(At least 5 characters)"
        onInput={inputHandler}
      />
      <Input
        id="address"
        type="text"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Add Place
      </Button>
    </form>
  );
};

export default NewPlace;
