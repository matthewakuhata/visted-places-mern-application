import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const activeRequests = useRef([]);

    const sendRequest = useCallback(
        async (url, method = "GET", headers = {}, body = null) => {
            try {
                setIsLoading(true);

                const abortController = new AbortController();
                activeRequests.current.push(abortController);

                const response = await fetch(getFullUrl(url), {
                    method,
                    body,
                    headers: {
                        ...headers,
                        "Content-Type":
                            headers["Content-Type"] || "application/json",
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
        []
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

function getFullUrl(url) {
    return `http://localhost:5000/api/v1${url}`;
}
