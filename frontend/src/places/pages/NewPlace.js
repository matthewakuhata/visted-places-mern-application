import React from "react";
import { useHistory } from "react-router-dom";

import {
    Input,
    Button,
    ImageInput,
} from "../../shared/components/FormElements";
import { ErrorModal, LoadingSpinner } from "../../shared/components/UI";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import "./PlaceForm.css";

const NewPlace = () => {
    const history = useHistory();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
            image: {
                value: "",
                isValid: false,
            },
        },
    });

    const placeSubmitHandler = async (event) => {
        event.preventDefault();
        const { title, description, address, image } = formState.inputs;
        const formData = new FormData();
        formData.append("title", title.value);
        formData.append("description", description.value);
        formData.append("address", address.value);
        formData.append("image", image.value);

        const { success } = await sendRequest("/places", "POST", formData, {});
        if (success) {
            history.push(`/`);
        }
    };

    return (
        <>
            <ErrorModal error={error} clearError={clearError} />
            <form onSubmit={placeSubmitHandler} className="place-form">
                {isLoading && <LoadingSpinner asOverlay />}
                <ImageInput
                    center
                    buttonLabel="Add Place image"
                    onInput={inputHandler}
                    id="image"
                />
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
        </>
    );
};

export default NewPlace;
