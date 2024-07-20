import React, { useState } from "react";
import styles from "./ChangePasswordForm.module.scss";
import { ReactComponent as Eye } from "../../images/svg/eye.svg";
const ChangePasswordForm = ({ id, submit }) => {
  const [visible, setVisible] = useState({
    password: false,
    repeatedPassword: false,
    oldPassword: false,
  });
  const [fields, setFields] = useState({
    password: "",
    repeatedPassword: "",
    oldPassword: "",
  });
  const [error, setError] = useState({
    password: false,
    repeatedPassword: false,
    oldPassword: false,
  });
  const toggleVisibility = (key) => {
    setVisible((prev) => ({
      ...prev,
      [key]: !visible[key],
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fields.password.length === 0) {
      setError((prev) => ({
        ...prev,
        password: true,
      }));
      return;
    }
    if (fields.repeatedPassword !== fields.password) {
      setError((prev) => ({
        ...prev,
        repeatedPassword: true,
      }));
      return;
    }
    if (fields.oldPassword.length === 0) {
      setError((prev) => ({
        ...prev,
        oldPassword: true,
      }));
      return;
    }
    submit(fields);
  };
  const changeField = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setError((prev) => ({
      ...prev,
      [key]: false,
    }));

    setFields((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  return (
    <form>
      <div className={styles.input__field}>
        <label htmlFor={`nick_${id}`}>Enter your new passwor:</label>
        <input
          type={visible.password ? "text" : "password"}
          name="password"
          id={`pass_${id}`}
          value={fields.password}
          onChange={changeField}
        />
        {error.password && <p>The field should have at least 1 character.</p>}
        <Eye
          className={styles.input__icon}
          onClick={() => toggleVisibility("password")}
        />
      </div>
      <div className={styles.input__field}>
        <label htmlFor={`pass_${id}`}>Repeat your new password:</label>
        <input
          type={visible.repeatedPassword ? "text" : "password"}
          name="repeatedPassword"
          id={`rpass_${id}`}
          value={fields.repeatedPassword}
          onChange={changeField}
        />
        <Eye
          className={styles.input__icon}
          onClick={() => toggleVisibility("repeatedPassword")}
        />
        {error.repeatedPassword && <p>The password should match</p>}
      </div>
      <div className={styles.input__field}>
        <label htmlFor={`opass_${id}`}>Enter your old password</label>
        <input
          type={visible.oldPassword ? "text" : "password"}
          name="oldPassword"
          id={`opass_${id}`}
          value={fields.oldPassword}
          onChange={changeField}
        />
        <Eye
          className={styles.input__icon}
          onClick={() => toggleVisibility("oldPassword")}
        />
        {error.oldPassword && <p>The password is empty</p>}
      </div>

      <button onClick={handleSubmit}>Change</button>
    </form>
  );
};

export default ChangePasswordForm;
