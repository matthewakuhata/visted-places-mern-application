import React, { useRef } from "react";
import Button from "../Button/Button";

import "./imageUpload.css";

const imageUpload = () => {
    const filePickerRef = useRef();
    const pickedHandler = (event) => {};
    const pickImageHandler = () => {
        filePickerRef.current.click();
    };
    return (
        <div className="form-control">
            <input
                ref={filePickerRef}
                type="file"
                id={id}
                style={{ display: none }}
                accept=".jpg,.png,.jpeg"
            />
            <div className={`image-upload ${center && "center"}`}>
                <div className="image-upload__preview">
                    <img src="" alt="Preview" />
                </div>
                <Button type="button" onClick={pickImageHandler}>
                    Pick Image
                </Button>
            </div>
        </div>
    );
};

export default imageUpload;
