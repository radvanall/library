import { useState } from "react";
import api from "./api";

const useGetEvent = (dataUrl) => {
  //   const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = async (params = {}) => {
    setIsLoading(true);
    try {
      const response = await api.get(dataUrl, { params });
      console.log("response event:", response.data);
      //   Array.isArray(response?.data)
      //     ? setData([...response.data])
      //     : typeof response?.data === "object"
      //     ? setData({ ...response.data })
      //     : setData(response.data);
      //   console.log(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { getData, error, isLoading };
};

export default useGetEvent;
