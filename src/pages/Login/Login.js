import React, { useState } from "react";
import styles from "./Login.module.scss";
import useLogin from "../../api/useLogin";
const Login = () => {
  const { getUser, error: backEndError, isLoading } = useLogin("/users/auth");
  const [formValues, setFormValues] = useState({
    login: "",
    password: "",
  });
  const [error, setError] = useState(null);
  let handleOnChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  let handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues);
    // if (
    //   formValues.login.length < 6 ||
    //   formValues.login.length > 15 ||
    //   formValues.password.length < 6 ||
    //   formValues.password.length > 15
    // ) {
    //   setError("The fields should have between 6 and 15 characters.");
    //   return;
    // }
    const user = {
      login: formValues.login,
      pass: formValues.password,
    };
    await getUser(user);
    // let formData = new FormData();
    // formData.append("login", formValues.login);
    // formData.append("pass", formValues.password);

    setError(null);
    // await postData(formData);
    // setTimeout(() => {
    //   setMessage(null);
    //   setBackEndError(null);
    // }, 7000);
  };
  return (
    <div className={styles.form__page}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="login">Username</label>
        <input
          type="text"
          id="login"
          name="login"
          value={formValues.login}
          onChange={handleOnChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handleOnChange}
          value={formValues.password}
        />
        <input type="submit" value="Login" />
        {error && <p>{error}</p>}
        {backEndError && <p>{backEndError}</p>}
      </form>
    </div>
  );
};

export default Login;
