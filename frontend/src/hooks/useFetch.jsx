import { useState, useEffect, useCallback } from "react";

export const useFetch = (url, options = {}, autoFetch = true) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(autoFetch);

  // Wrap the fetch function in useCallback
  const fetchData = useCallback(
    async (customOptions = {}) => {
      setLoading(true);
      setError(null);

      try {
        const mergedOptions = { ...options, ...customOptions };
        const response = await fetch(url, mergedOptions);
        if (!response.ok) {
          let errorPayload = await response.json().catch(() => ({}));
          const message =
            errorPayload.error || `HTTP error! status: ${response.status}`;
          throw new Error(message);
        }
        const json = await response.json();
        console.log("Fetched data:", json);
        setData(json);
        return json;
      } catch (err) {
        setError(err);
        console.error("Fetch error:", err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [url, options]
  ); // Ensure these dependencies are stable!

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]); // If fetchData is stable, this effect should run only once (or when autoFetch/url/options change).

  return { data, error, loading, refetch: fetchData };
};
