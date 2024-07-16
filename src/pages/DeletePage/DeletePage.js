import React from "react";
import { useParams } from "react-router-dom";
const DeletePage = () => {
  const { item } = useParams();
  return (
    <div>
      <h2>The {item} has been removed.</h2>
    </div>
  );
};

export default DeletePage;
