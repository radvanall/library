import React from "react";
import styles from "./Register.module.scss";

const Register = () => {
  return (
    <div className={styles.form__page}>
      <form action="">
        <h2>Register</h2>
        <label htmlFor="login">Username</label>
        <input type="text" id="login" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="repeatPassword">Repeat password</label>
        <input type="password" name="rpassword" id="repeatPassword" />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
