import React, { useEffect, useState } from "react";
import { ErrorModal, LoadingSpinner } from "../../shared/components/UI";
import { useHttpClient } from "../../shared/hooks/http-hook";

import UsersList from "../components/UsersList";

const Users = () => {
    const [users, setUsers] = useState([]);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    useEffect(() => {
        const getData = async () => {
            const response = await sendRequest(`/users`, "GET");
            if (response.success) {
                setUsers(response.data);
            }
        };

        getData();
    }, [sendRequest]);

    return (
        <>
            <ErrorModal error={error} onClear={clearError} />
            {isLoading ? (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>
            ) : (
                <UsersList items={users} />
            )}
        </>
    );
};

export default Users;
