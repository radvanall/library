import api from "./api";
import { useState } from "react";

const useDelete = (dataUrl) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const deleteData = async (id) => {
    try {
      const res = await api.delete(`${dataUrl}/${id}`);
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
  return { deleteData, setMessage, setError, message, error };
};
export default useDelete;
