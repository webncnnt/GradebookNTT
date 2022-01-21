import { useCallback, useState } from "react";

type HandleErrorCallback = (error?: any) => void;

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, handleError: HandleErrorCallback, applyData) => {
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

    const api = process.env.NODE_ENV === "production" ? process.env.REACT_APP_PROD_API_PREFIX : process.env.REACT_APP_DEV_API_PREFIX;

    try {
      const response = await fetch(api + requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : resHeaders,
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        handleError(response);
        throw new Error(response.statusText);
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
