import React, { useState } from "react";
import styles from "./Register.module.scss";
import ImageInput from "../../components/ImageInput/ImageInput";
import usePost from "../../api/usePost";

const Register = () => {
  const [value, setValue] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState(null);
  const {
    postData,
    setMessage,
    setError: setBackEndError,
    message,
    error: backEndError,
  } = usePost("/users");
  const [formValues, setFormValues] = useState({
    login: "",
    password: "",
    repeatPassword: "",
  });
  let handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formValues);
    if (
      formValues.login.length < 6 ||
      formValues.login.length > 15 ||
      formValues.password.length < 6 ||
      formValues.password.length > 15
    ) {
      setError("The fields should have between 6 and 15 characters.");
      return;
    }
    if (formValues.password !== formValues.repeatPassword) {
      setError("The password and repeat password should match.");
      return;
    }
    setError(null);
    let formData = new FormData();
    formData.append("login", formValues.login);
    formData.append("pass", formValues.password);
    if (value) {
      formData.append("avatar", value);
      console.log(value);
    }
    setError(null);
    await postData(formData);
    setTimeout(() => {
      setMessage(null);
      setBackEndError(null);
    }, 7000);
  };
  let handleOnChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };
  return (
    <div className={styles.form__page}>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
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
        <label htmlFor="repeatPassword">Repeat password</label>
        <input
          type="password"
          name="repeatPassword"
          id="repeatPassword"
          onChange={handleOnChange}
          value={formValues.repeatPassword}
        />
        <ImageInput
          setValue={setValue}
          setSelectedImage={setSelectedImage}
          id="imgPicker"
          imgName={value?.name ?? "file not selected"}
        />
        {error && <p>{error}</p>}
        {message && <p>{message}</p>}
        {backEndError && <p>{backEndError}</p>}
        <input type="submit" value="Register" />
      </form>
      <img src={selectedImage} alt="#" />
    </div>
  );
};

export default Register;
