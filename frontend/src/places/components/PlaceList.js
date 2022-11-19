import React from "react";

import { Card } from "../../shared/components/UI";
import { Button } from "../../shared/components/FormElements";
import PlaceItem from "./PlaceItem";

import "./PlaceList.css";

const PlaceList = ({ items, isCurrentUser, onDelete }) => {
    if (items.length === 0) {
        return (
            <div className="place-lists center">
                <Card>
                    <h2>
                        No Places found for user.{" "}
                        {isCurrentUser && "Maybe create one?"}
                    </h2>
                    {isCurrentUser && (
                        <Button to="/places/new">Share Place</Button>
                    )}
                </Card>
            </div>
        );
    }

    return (
        <ul className="place-lists">
            {items.map((place) => (
                <PlaceItem
                    key={place.id}
                    id={place.id}
                    image={place.image}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
};

export default PlaceList;
