import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Input } from "../../shared/components/FormElements";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";

import "./PlaceForm.css";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u2",
  },
];

const UpdatePlace = () => {
  const placeID = useParams().placeid;
  const [isLoading, setIsLoading] = useState(true);
  const [formState, inputHandler, setFormData] = useForm({
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
    },
  });

  const place = DUMMY_PLACES.find((place) => place.id === placeID);
  useEffect(() => {
    setFormData(
      {
        title: {
          value: place.title,
          isValid: true,
        },
        description: {
          value: place.description,
          isValid: true,
        },
      },
      true
    );
    setIsLoading(false);
  }, [setFormData, place]);

  if (!place) {
    return (
      <div className="center">
        <h2>Could not find place!</h2>
      </div>
    );
  }

  const submitUpdateHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  console.log(formState);
  return (
    !isLoading && (
      <form className="place-form" onSubmit={submitUpdateHandler}>
        <Input
          id="title"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          value={formState.inputs.title.value}
          valid={formState.inputs.title.isValid}
          onInput={inputHandler}
        />
        <Input
          id="description"
          type="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description(At least 5 characters)"
          value={formState.inputs.description.value}
          valid={formState.inputs.title.isValid}
          onInput={inputHandler}
        />
        <Button disabled={!formState.isValid}>Update</Button>
      </form>
    )
  );
};

export default UpdatePlace;
