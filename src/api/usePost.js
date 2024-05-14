import api from "./api";
import { useState } from "react";

const usePost = (dataUrl) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const postData = async (data) => {
    try {
      const res = await api.post(dataUrl, data);
      console.log(res);
      setMessage(res.data);
    } catch (err) {
      console.log(error);
    }
  };
  return { postData, setMessage, message };
};
export default usePost;
