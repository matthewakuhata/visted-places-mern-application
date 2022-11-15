import React, { useState } from "react";

import { Card, Modal } from "../../shared/components/UI";
import { Button } from "../../shared/components/FormElements";
import { Map } from "../../shared/components/UI";
import "./PlaceItem.css";

const PlaceItem = ({
  id,
  image,
  title,
  address,
  description,
  creatorId,
  coordinates,
}) => {
  const [showMap, setShowMap] = useState(false);
  const toggleShowMap = () => {
    setShowMap((prev) => !prev);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const toggleShowDeleteModal = () => {
    setShowDeleteModal((prev) => !prev);
  };
  const deletePlaceHandler = () => {
    console.log("DELETING PLACE");
    toggleShowDeleteModal();
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
        <Card className="place-item__content">
          <div className="place-item__image">
            <img src={image} alt={title} />
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
            <Button to={`/places/${id}`}>EDIT</Button>
            <Button onClick={toggleShowDeleteModal}>DELETE</Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default PlaceItem;
