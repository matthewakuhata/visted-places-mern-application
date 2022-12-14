import React from "react";

import { Card } from "../../shared/components/UI";
import UserItem from "./UserItem";
import "./UsersList.css";

const UsersList = ({ items }) => {
    if (items.length === 0) {
        return (
            <div className="center">
                <Card>
                    <h2>No users found.</h2>
                </Card>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {items.length > 0 &&
                items.map((user, index) => (
                    <UserItem
                        key={`${user.id}-${index}`}
                        id={user.id}
                        image={user.image}
                        name={user.name}
                        placeCount={user.places.length}
                    />
                ))}
        </ul>
    );
};

export default UsersList;
