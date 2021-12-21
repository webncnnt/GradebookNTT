import { useState, useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, handleError, applyData) => {
    setIsLoading(true);
    setError(null);

    const accessTokenStore = localStorage.getItem("accessToken");
    const googleTokenStore = localStorage.getItem("googleToken");

    let tokenFormat = "";
    if (accessTokenStore) tokenFormat = accessTokenStore;
    if (googleTokenStore) tokenFormat = googleTokenStore;

    let resHeaders: HeadersInit;

    if (accessTokenStore) {
      resHeaders = {
        authorization: tokenFormat,
        "Content-Type": "application/json",
      };
    } else {
      resHeaders = {
        tokenidgg: tokenFormat,
        "Content-Type": "application/json",
      };
    }

    try {
      const response = await fetch("http://localhost:8000/api/" + requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : resHeaders,
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        handleError();
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
