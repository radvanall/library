import React from "react";
import { useParams } from "react-router-dom";
import BookData from "../../components/BookData/BookData";
import BookComments from "../../components/BookComments/BookComments";
import useGet from "../../api/useGet";

const Book = () => {
  const { id } = useParams();
  const { data, loading, error } = useGet(`books/${id}`);
  console.log("book", data);
  return (
    <div>
      {data && (
        <>
          <BookData book={data} />
          <BookComments id={id} />
        </>
      )}
    </div>
  );
};

export default Book;
