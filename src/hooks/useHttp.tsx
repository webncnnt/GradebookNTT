import { useCallback, useState } from "react";

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
      const response = await fetch("https://gradebooktnt-api.herokuapp.com/api/" + requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : resHeaders,
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        handleError();
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
