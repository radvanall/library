import React, { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useGetPrivate = (dataUrl, params = {}, dep = []) => {
  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getData = async (url) => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.get(
          url,
          { params },
          {
            signal: controller.signal,
          }
        );
        if (isMounted) {
          // setData([...response.data]);

          Array.isArray(response?.data)
            ? setData([...response.data])
            : typeof response?.data === "object"
            ? setData({ ...response.data })
            : setData(response.data);
          console.log(response.data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setData(false);
          console.error(err);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    getData(dataUrl);
    const cleanUp = () => {
      isMounted = false;
      controller.abort();
    };
    return cleanUp;
  }, [dataUrl, ...dep]);

  return { data, error, isLoading };
};

export default useGetPrivate;
