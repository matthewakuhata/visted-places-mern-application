import React from "react";

import { Link } from "react-router-dom";
import { Avatar, Card } from "../../shared/components/UI";
import { getImageUrl } from "../../shared/utils/image-url";
import "./UserItem.css";

const UserItem = ({ id, name, image, placeCount }) => {
    return (
        <li className="user-item">
            <Card className="user-item__content">
                <Link to={`/${id}/places`}>
                    <div className="user-item__image">
                        <Avatar image={getImageUrl(image)} alt={name} />
                    </div>
                    <div className="user-item__info">
                        <h2>{name}</h2>
                        <h3>
                            {placeCount} {placeCount === 1 ? "Place" : "Places"}
                        </h3>
                    </div>
                </Link>
            </Card>
        </li>
    );
};

export default UserItem;
