import { useEffect, useState } from "react";

export default function useFetch(API, token, body) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHeaders = (token && {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }) || {
    "Content-Type": "application/json",
  };

  const fetchBody =
    (body !== undefined &&
      JSON.stringify({
        body,
      })) ||
    null;

  useEffect(
    function () {
      (async function () {
        try {
          const response = await fetch(API, {
            method: "GET",
            headers: fetchHeaders,
            body: fetchBody,
          });
          const json = await response.json();
          setData(json);
          setIsLoading(false);
        } catch (error) {
          setError(error);
        }
      })();
    },
    // eslint-disable-next-line
    [API]
  );

  return { data, isLoading, error };
}
