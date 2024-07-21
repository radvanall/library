import React from "react";
import roles from "../../roles";
const FilterByRole = ({ handleChange, className }) => {
  return (
    <div className={className}>
      <label htmlFor="selectRole">Filter users by role:</label>
      <select id="selectRole" defaultChecked={1111} onChange={handleChange}>
        <option value={1111}>{roles[1111]}</option>
        <option value={2001}>{roles[2001]}</option>
        <option value={1984}>{roles[1984]}</option>
        <option value={5150}>{roles[5150]}</option>
      </select>
    </div>
  );
};

export default FilterByRole;
