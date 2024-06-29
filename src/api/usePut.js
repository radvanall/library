import api from "./api";
import { useState } from "react";

const usePut = (dataUrl) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const putData = async (data) => {
    try {
      const res = await api.put(dataUrl, data);
      console.log(res);
      setMessage(res.data.message);
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };
  return { putData, setMessage, setError, message, error };
};
export default usePut;
