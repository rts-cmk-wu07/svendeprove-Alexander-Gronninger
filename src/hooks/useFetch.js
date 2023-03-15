import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";

export default function useFetch(API, method, body) {
  const { user } = useContext(UserContext);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMethod = (method === undefined && "GET") || method;

  const fetchHeaders = (fetchMethod !== "GET" && {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
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
            method: fetchMethod,
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
    [API]
  );

  return { data, isLoading, error };
}
