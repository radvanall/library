import React from "react";
import useGet from "../../api/useGet";
import CustomSelect from "../CustomSelect/CustomSelect";
import styles from "./BookForm.module.scss";
const BookForm = () => {
  const { data, error, isLoading } = useGet("genres");

  return (
    <div>
      <form>{data && <CustomSelect options={data} />}</form>
      {/* <input type="text" /> */}
    </div>
  );
};

export default BookForm;
