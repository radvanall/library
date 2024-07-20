import React, { useState } from "react";

const ChangeRole = ({ submit }) => {
  const [value, setValue] = useState(2);
  const handleChange = (e) => {
    console.log("e", e.target.value);
    setValue(e.target.value);
  };
  const handleSubmit = () => {
    submit(value);
  };
  return (
    <div>
      <label htmlFor="select__chage_role">Select role:</label>
      <select defaultValue={3} onChange={handleChange}>
        <option value={1}>Admin</option>
        <option value={2}>User</option>
        <option value={3}>Editor</option>
      </select>
      <button onClick={handleSubmit}>Change</button>
    </div>
  );
};

export default ChangeRole;
