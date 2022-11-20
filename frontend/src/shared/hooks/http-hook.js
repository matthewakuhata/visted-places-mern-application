import { useState, useCallback, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth-context";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const { token } = useContext(AuthContext);

    const activeRequests = useRef([]);

    const sendRequest = useCallback(
        async (
            url,
            method = "GET",
            body = null,
            headers = { "Content-Type": "application/json" }
        ) => {
            try {
                setIsLoading(true);

                const abortController = new AbortController();
                activeRequests.current.push(abortController);

                const response = await fetch(getFullUrl(url), {
                    method,
                    body,
                    headers: {
                        ...headers,
                        authorization: `BEARER ${token}`,
                    },
                    signal: abortController.signal,
                });

                const responseData = await response.json();
                activeRequests.current = activeRequests.current.filter(
                    (ctrl) => ctrl !== abortController
                );

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setIsLoading(false);
                return { success: true, data: responseData };
            } catch (error) {
                setIsLoading(false);
                setError(error.message);
                return { success: false, data: error.message };
            }
        },
        [token]
    );

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            // eslint-disable-next-line
            activeRequests.current.forEach((abortController) =>
                abortController.abort()
            );
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
};

export function getFullUrl(url) {
    return `${process.env.REACT_APP_BACKEND_API_URL}${url}`;
}
