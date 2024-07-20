import React from "react";
import styles from "./UpdateModal.module.scss";
import ChangeCover from "../ChangeCover/ChangeCover";
import ChangeNicknameForm from "../ChangeNicknameForm/ChangeNicknameForm";
import ChangePasswordForm from "../ChangePasswordForm/ChangePasswordForm";
import ChangeRole from "../ChangeRole/ChangeRole";
import Modal from "../Modal/Modal";
const UpdateModal = ({
  fieldToUpdate,
  isActive,
  setIsActive,
  avatar,
  submit,
  message,
  error,
}) => {
  switch (fieldToUpdate) {
    case "avatar":
      return (
        <Modal isActive={isActive} setIsActive={setIsActive}>
          <>
            <ChangeCover
              path={avatar}
              submit={(value) => submit("avatar", value)}
              isActive={isActive}
            />
            {message && message}
            {error && error}
          </>
        </Modal>
      );
    case "nickname":
      return (
        <Modal isActive={isActive} setIsActive={setIsActive}>
          <>
            <ChangeNicknameForm
              id={"nick"}
              submit={(value) => submit("nickname", value)}
            />
            {message && message}
            {error && error}
          </>
        </Modal>
      );
    case "password":
      return (
        <Modal isActive={isActive} setIsActive={setIsActive}>
          <>
            <ChangePasswordForm
              id="pass"
              submit={(value) => submit("password", value)}
            />
            {message && message}
            {error && error}
          </>
        </Modal>
      );
    case "role":
      return (
        <Modal isActive={isActive} setIsActive={setIsActive}>
          <ChangeRole submit={(value) => submit("role", value)} />
          {message && message}
          {error && error}
        </Modal>
      );
    default:
      return (
        <Modal isActive={isActive} setIsActive={setIsActive}>
          NO KEY
        </Modal>
      );
  }
};

export default UpdateModal;
