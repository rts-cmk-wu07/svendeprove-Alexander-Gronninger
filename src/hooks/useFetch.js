import { useEffect, useState } from "react";

export default function useFetch(API) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(
    function () {
      (async function () {
        try {
          const response = await fetch(API);
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
