import React, { useRef, useState, useEffect } from "react";
import Button from "../Button/Button";

import "./ImageInput.css";

const ImageUpload = ({ id, center, buttonLabel, errorText, onInput }) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) return;

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = (event) => {
        if (event.target.files && event.target.files.length === 1) {
            const pickedFile = event.target.files[0];

            setFile(pickedFile);
            setIsValid(true);

            onInput(id, pickedFile, true);
        } else {
            setIsValid(false);
            onInput(id, null, false);
        }
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="form-control">
            <input
                ref={filePickerRef}
                onChange={pickedHandler}
                type="file"
                id={id}
                style={{ display: "none" }}
                accept=".jpg,.png,.jpeg"
            />
            <div className={`image-upload ${center && "center"}`}>
                <div className="image-upload__preview">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" />
                    ) : (
                        <p>Please choose a profile image</p>
                    )}
                </div>
                <Button type="button" onClick={pickImageHandler}>
                    {buttonLabel ? buttonLabel : "Pick Image"}
                </Button>
            </div>
            {!isValid && <p>{errorText}</p>}
        </div>
    );
};

export default ImageUpload;
