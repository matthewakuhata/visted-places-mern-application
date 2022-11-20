import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { LoadingSpinner } from "../../shared/components/UI";
import { AuthContext } from "../../shared/context/auth-context";

const UserPlaces = () => {
    const userPage = useParams().userid;
    const { userId } = useContext(AuthContext);
    const [places, setPlaces] = useState([]);
    const { isLoading, sendRequest } = useHttpClient();

    useEffect(() => {
        const getData = async () => {
            const response = await sendRequest(`/places/user/${userPage}`);

            if (response.success) {
                setPlaces(response.data);
            }
        };

        getData();
    }, [sendRequest, userPage]);

    const deletePlaceHandler = (deletePlaceId) => {
        setPlaces((prev) => {
            return prev.filter((place) => place.id !== deletePlaceId);
        });
    };

    return isLoading ? (
        <div className="center">
            <LoadingSpinner />
        </div>
    ) : (
        <PlaceList
            items={places}
            onDelete={deletePlaceHandler}
            isCurrentUser={userPage === userId}
        />
    );
};

export default UserPlaces;
