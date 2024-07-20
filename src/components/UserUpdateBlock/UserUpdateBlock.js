import React, { useState } from "react";
import styles from "./UserUpdateBlock.module.scss";
import { ReactComponent as Feather } from "../../images/svg/feather.svg";
import UpdateModal from "../UpdateModal/UpdateModal";
import usePutURL from "../../api/usePutURL.js";
const UserUpdateBlock = ({ user, avatar, refetch }) => {
  //   const { putData, setMessage, setError, message, error } = usePut(
  //     `/users/change-avatar/${id}`
  //   );
  const { putData, setMessage, setError, message, error } = usePutURL();
  const [openUserUpdateBlock, setOpenUserUpdateBlock] = useState(false);
  const [fieldToUpdate, setfieldToUpdate] = useState("");
  const [isActive, setIsActive] = useState(false);
  const handleOpen = () => {
    setOpenUserUpdateBlock((prev) => !prev);
  };
  const openModal = (field) => {
    setIsActive(true);
    setfieldToUpdate(field);
  };
  const submit = async (field, data) => {
    const formData = new FormData();
    // console.log("field=", field);
    console.log("avatar=", data);
    if (field === "avatar") {
      formData.append("avatar", data);
      await putData(`/users/change-avatar/${user.id}`, formData);
      await refetch();
      return;
    }
    if (field === "nickname") {
      const fields = {
        login: data.nickname.trim(),
        pass: data.password.trim(),
        newPass: data.password.trim(),
      };
      await putData(`/users/${user.id}`, fields);
      await refetch();
      return;
    }
    if (field === "password") {
      const fields = {
        login: user.login,
        pass: data.oldPassword.trim(),
        newPass: data.password.trim(),
      };
      await putData(`/users/${user.id}`, fields);
      await refetch();
      return;
    }
    if ((field = "role")) {
      const fields = {
        id: parseInt(user.id),
        roleId: parseInt(data),
      };
      await putData("/users/change-role", fields);
      await refetch();
      return;
    }
  };
  return (
    <div className={styles.update__container}>
      <UpdateModal
        isActive={isActive}
        setIsActive={setIsActive}
        fieldToUpdate={fieldToUpdate}
        avatar={avatar}
        submit={submit}
        message={message}
        error={error}
      />
      <Feather className={styles.feather} onClick={handleOpen} />
      <div
        className={
          openUserUpdateBlock
            ? `${styles.update__block}`
            : `${styles.closed} ${styles.update__block}`
        }
      >
        <button onClick={() => openModal("avatar")}>Update avatar</button>
        <button onClick={() => openModal("nickname")}>Update nickname</button>
        <button onClick={() => openModal("password")}>Update password</button>
        <button onClick={() => openModal("role")}>Update role</button>
      </div>
    </div>
  );
};

export default UserUpdateBlock;
