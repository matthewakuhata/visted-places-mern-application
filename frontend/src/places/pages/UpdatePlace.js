import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Button, Input } from "../../shared/components/FormElements";
import { Card, ErrorModal, LoadingSpinner } from "../../shared/components/UI";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
    VALIDATOR_REQUIRE,
    VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";

import "./PlaceForm.css";

const UpdatePlace = () => {
    const placeId = useParams().placeid;
    const history = useHistory();
    const [foundPlace, setFoundPlace] = useState(false);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

    useEffect(() => {
        const getData = async () => {
            const response = await sendRequest(`/places/${placeId}`);

            if (response.success && response.data) {
                setFoundPlace(response.data);

                const { title, description } = response.data;
                setFormData(
                    {
                        title: {
                            value: title,
                            isValid: true,
                        },
                        description: {
                            value: description,
                            isValid: true,
                        },
                    },
                    true
                );
            }
        };

        getData();
    }, [sendRequest, placeId, setFormData]);

    const submitUpdateHandler = async (event) => {
        event.preventDefault();

        const { title, description } = formState.inputs;
        const response = await sendRequest(
            `/places/${placeId}`,
            "PATCH",
            {},
            JSON.stringify({
                title: title.value,
                description: description.value,
            })
        );

        if (response.success) {
            history.goBack();
        }
    };

    if (isLoading) {
        return (
            <div className="center">
                <LoadingSpinner />
            </div>
        );
    }

    if (!foundPlace && !error) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && foundPlace && (
                <form className="place-form" onSubmit={submitUpdateHandler}>
                    <Input
                        id="title"
                        type="text"
                        label="Title"
                        validators={[VALIDATOR_REQUIRE()]}
                        errorText="Please enter a valid title"
                        value={foundPlace.title}
                        valid={true}
                        onInput={inputHandler}
                    />
                    <Input
                        id="description"
                        type="textarea"
                        label="Description"
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid description(At least 5 characters)"
                        value={foundPlace.description}
                        valid={true}
                        onInput={inputHandler}
                    />
                    <Button disabled={!formState.isValid}>Update</Button>
                </form>
            )}
        </>
    );
};

export default UpdatePlace;
