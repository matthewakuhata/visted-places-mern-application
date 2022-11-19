import React, { useContext, useState } from "react";
import {
    Button,
    ImageUpload,
    Input,
} from "../../shared/components/FormElements";
import { Card, ErrorModal, LoadingSpinner } from "../../shared/components/UI";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import "./Auth.css";
const Auth = () => {
    const { login } = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

        const url = isLoginMode ? `/users/login` : `/users/signup`;
        const { name, email, password } = formState.inputs;

        const { success, data } = await sendRequest(
            url,
            "POST",
            {},
            JSON.stringify({
                name: name?.value,
                email: email.value,
                password: password.value,
            })
        );

        if (success) {
            login(data.id);
        }
    };

    return (
        <Card className={"authentication"}>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && <LoadingSpinner asOverlay />}
            <h2>{isLoginMode ? "Login Required" : "Sign up"}</h2>
            <form onSubmit={loginHandler}>
                {!isLoginMode && (
                    <>
                        <ImageUpload center id="image" />
                        <Input
                            type="text"
                            id="name"
                            label="Name"
                            onInput={inputHandler}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="Please enter your name"
                        />
                    </>
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
