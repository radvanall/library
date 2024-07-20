import api from "./api";
import { useState } from "react";

const usePutURL = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const putData = async (dataUrl, data) => {
    try {
      const res = await api.put(dataUrl, data);
      console.log(res);
      setMessage(res.data.message);
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
  return { putData, setMessage, setError, message, error };
};
export default usePutURL;
