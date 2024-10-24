import useAxiosPrivate from "./useAxiosPrivate";
import { useState } from "react";

const usePostPrivate = (dataUrl) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const axiosPrivate = useAxiosPrivate();

  const postData = async (data) => {
    try {
      const res = await axiosPrivate.post(dataUrl, data);
      console.log(res);
      setMessage(res.data);
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    } finally {
      setTimeout(() => {
        setMessage("");
        setError("");
      }, 4000);
    }
  };
  return { postData, setMessage, setError, message, error };
};
export default usePostPrivate;
