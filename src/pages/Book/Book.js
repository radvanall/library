import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BookData from "../../components/BookData/BookData";
import BookMenu from "../../components/BookMenu/BookMenu";
import BookComments from "../../components/BookComments/BookComments";
import useGet from "../../api/useGet";
import useGetEvent from "../../api/useGetEvent";
const Book = () => {
  const { id } = useParams();
  // const { data, loading, error } = useGet(`books/${id}`);
  const { getData, error, isLoading } = useGetEvent(`books/${id}`);
  const [data, setData] = useState(false);
  const getRequest = async () => {
    const resp = await getData();
    if (resp) {
      setData(resp);
    } else {
      console.log("no data");
    }
  };
  useEffect(() => {
    getRequest();
  }, []);
  console.log("book", data);
  //testing the editting in place
  return (
    <div>
      {data && (
        <>
          <BookMenu data={data} refetch={getRequest} />
          <BookData book={data} refetch={getRequest} />
          <BookComments id={id} />
        </>
      )}
    </div>
  );
};

export default Book;
