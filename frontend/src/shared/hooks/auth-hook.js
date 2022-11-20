import { useState, useCallback, useEffect } from "react";

import { getFullUrl } from "./http-hook";

let logoutTimer;

export const useAuth = () => {
    const [token, setToken] = useState(false);
    const [tokenExpiration, setTokenExpiration] = useState();
    const [userId, setUserId] = useState(null);

    const login = useCallback((id, token, expiration) => {
        setToken(token);
        setUserId(id);

        const tokenExpiration =
            expiration || new Date(new Date().getTime() + 1000 * 60 * 60);

        setTokenExpiration(tokenExpiration);
        localStorage.setItem(
            "userData",
            JSON.stringify({
                userId: id,
                token,
                expiration: tokenExpiration.getTime(),
            })
        );
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        localStorage.removeItem("userData");
    }, []);

    useEffect(() => {
        const checkToken = async () => {
            const { userId, token, expiration } =
                JSON.parse(localStorage.getItem("userData")) || {};
            if (!userId || !token || !expiration) return;

            const response = await fetch(getFullUrl("/users/validate"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `BEARER ${token}`,
                },
            });
            const crrTime = new Date().getTime();
            const isValid = expiration > crrTime && response.ok;

            if (isValid) {
                login(userId, token, new Date(expiration));
            }
        };

        checkToken();
    }, [login]);

    useEffect(() => {
        if (token && tokenExpiration) {
            const remaining = tokenExpiration.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remaining);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, tokenExpiration, logout]);

    return { token, userId, login, logout };
};
