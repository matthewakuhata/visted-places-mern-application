import React, { useState } from "react";
import { Button, Input } from "../../shared/components/FormElements";
import { Card } from "../../shared/components/UI";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import "./Auth.css";
const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm({
    inputs: {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }

    setIsLoginMode((prev) => !prev);
  };

  const loginHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card className={"authentication"}>
      <h2>{isLoginMode ? "Login Required" : "Sign up"}</h2>
      <form onSubmit={loginHandler}>
        {!isLoginMode && (
          <Input
            type="text"
            id="name"
            label="Name"
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
            error="Please enter your name"
          />
        )}
        <Input
          type="email"
          id="email"
          label="E-mail"
          onInput={inputHandler}
          validators={[VALIDATOR_EMAIL()]}
          error="Please enter a valid email"
        />
        <Input
          type="password"
          id="password"
          label="Password"
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(6)]}
          error="Please enter a valid password"
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGN UP"}
        </Button>
      </form>
      <Button text onClick={switchModeHandler}>
        {isLoginMode ? "SIGN UP" : "LOGIN"}
      </Button>
    </Card>
  );
};

export default Auth;
