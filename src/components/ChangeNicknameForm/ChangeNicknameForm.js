import React, { useState } from "react";
import styles from "./ChangeNickname.module.scss";
import { ReactComponent as Eye } from "../../images/svg/eye.svg";
const ChangeNicknameForm = ({ id, submit }) => {
  const [visible, setVisible] = useState(false);
  const [fields, setFields] = useState({
    nickname: "",
    password: "",
  });
  const [error, setError] = useState({ nickname: false, password: false });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fields.nickname.length === 0) {
      setError((prev) => ({
        ...prev,
        nickname: true,
      }));
      return;
    }
    if (fields.password.length === 0) {
      setError((prev) => ({
        ...prev,
        password: true,
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
        <label htmlFor={`nick_${id}`}>Enter new nickname:</label>
        <input
          type="text"
          name="nickname"
          id={`nick_${id}`}
          value={fields.nickname}
          onChange={changeField}
        />
        {error.nickname && (
          <p>The nickname should have at list one character</p>
        )}
      </div>
      <div className={styles.input__field}>
        <label htmlFor={`pass_${id}`}>Enter your password:</label>
        <input
          type={visible ? "text" : "password"}
          name="password"
          id={`pass_${id}`}
          value={fields.password}
          onChange={changeField}
        />
        <Eye
          className={styles.input__icon}
          onClick={() => setVisible((prev) => !prev)}
        />
        {error.password && <p>The password is empty</p>}
      </div>

      <button onClick={handleSubmit}>Change</button>
    </form>
  );
};

export default ChangeNicknameForm;
