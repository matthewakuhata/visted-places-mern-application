import React, { useContext, useState } from "react";
import { Button, Input } from "../../shared/components/FormElements";
import { Card, ErrorModal, LoadingSpinner } from "../../shared/components/UI";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import "./Auth.css";
const Auth = () => {
    const { login } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
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
                formState.inputs.email.isValid &&
                    formState.inputs.password.isValid
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

    const loginHandler = async (event) => {
        event.preventDefault();
        console.log(isLoginMode);
        setIsLoading(true);

        if (isLoginMode) {
            const { email, password } = formState.inputs;

            try {
                const response = await fetch(
                    `http://localhost:5000/api/v1/users/login`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: email.value,
                            password: password.value,
                        }),
                    }
                );

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }

                setIsLoading(false);
                login();
            } catch (error) {
                setIsLoading(false);
                setError(error.message || "Something went wrong.");
            }
        } else {
            const { name, email, password } = formState.inputs;

            try {
                const response = await fetch(
                    `http://localhost:5000/api/v1/users/signup`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            name: name?.value,
                            email: email.value,
                            password: password.value,
                        }),
                    }
                );

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }

                setIsLoading(false);
                login();
            } catch (error) {
                setIsLoading(false);
                setError(error.message || "Something went wrong.");
            }
        }
    };

    return (
        <Card className={"authentication"}>
            <ErrorModal error={error} onClear={() => setError(null)} />
            {isLoading && <LoadingSpinner asOverlay />}
            <h2>{isLoginMode ? "Login Required" : "Sign up"}</h2>
            <form onSubmit={loginHandler}>
                {!isLoginMode && (
                    <Input
                        type="text"
                        id="name"
                        label="Name"
                        onInput={inputHandler}
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter your name"
                    />
                )}
                <Input
                    type="email"
                    id="email"
                    label="E-mail"
                    onInput={inputHandler}
                    validators={[VALIDATOR_EMAIL()]}
                    errorText="Please enter a valid email"
                />
                <Input
                    type="password"
                    id="password"
                    label="Password"
                    onInput={inputHandler}
                    validators={[VALIDATOR_MINLENGTH(6)]}
                    errorText="Please enter a valid password"
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
