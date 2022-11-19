import React, { useContext, useState } from "react";

import { Card, LoadingSpinner, Modal } from "../../shared/components/UI";
import { Button } from "../../shared/components/FormElements";
import { Map } from "../../shared/components/UI";
import "./PlaceItem.css";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttpClient } from "../../shared/hooks/http-hook";

const PlaceItem = ({
    id,
    image,
    title,
    address,
    description,
    onDelete,
    coordinates,
}) => {
    const { isLoggedIn } = useContext(AuthContext);
    const { isLoading, sendRequest } = useHttpClient();

    const [showMap, setShowMap] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const toggleShowMap = () => {
        setShowMap((prev) => !prev);
    };

    const toggleShowDeleteModal = () => {
        setShowDeleteModal((prev) => !prev);
    };

    const deletePlaceHandler = async () => {
        const { success } = await sendRequest(`/places/${id}`, "DELETE");
        toggleShowDeleteModal();

        if (success) {
            onDelete(id);
        }
    };

    return (
        <>
            <Modal
                show={showMap}
                onCancel={toggleShowMap}
                header={address}
                classes={{
                    headerClass: "place-item__modal-content",
                    footerClass: "place-item__modal-actions",
                }}
                footer={<Button onClick={toggleShowMap}>Close</Button>}
            >
                <div className="map-container">
                    <Map center={coordinates} zoom={16} />
                </div>
            </Modal>

            <Modal
                show={showDeleteModal}
                onCancel={toggleShowDeleteModal}
                classes={{
                    headerClass: "place-item__modal-content",
                    footerClass: "place-item__modal-actions",
                }}
                header={"Are you sure?"}
                footer={
                    <>
                        <Button inverse onClick={toggleShowDeleteModal}>
                            CANCEL
                        </Button>
                        <Button onClick={deletePlaceHandler}>DELETE</Button>
                    </>
                }
            >
                <p>Do you want to proceed with deleting this place?</p>
            </Modal>

            <li className="place-item">
                {isLoading && <LoadingSpinner asOverlay />}
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img
                            src={`http://localhost:5000/api/v1/${image}`}
                            alt={title}
                        />
                    </div>
                    <div className="place-item__info">
                        <h2>{title}</h2>
                        <h3>{address}</h3>
                        <p>{description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={toggleShowMap}>
                            VIEW ON MAP
                        </Button>
                        {isLoggedIn && (
                            <>
                                <Button to={`/places/${id}`}>EDIT</Button>
                                <Button onClick={toggleShowDeleteModal}>
                                    DELETE
                                </Button>
                            </>
                        )}
                    </div>
                </Card>
            </li>
        </>
    );
};

export default PlaceItem;
