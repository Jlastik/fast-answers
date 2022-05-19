import React, { useState, useRef } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  StyledClosePopup,
  StyledModalContent,
  StyledUserNameContainer,
  StyledFolderNameInput,
  StyledButtonGroup,
  StyledButtonCancel,
  StyledButtonAdd,
  StyledPasswordContainer,
  StyledErrorMessage,
  StyledFolderPassInput,
  StyledShowPassIcon,
  StyledLoginHeader,
} from "./LoginPopupStyle";

const contentStyle = {
  padding: "20px",
  width: "430px",
  boxShadow: "0px 3px 10px rgba(0, 73, 129, 0.1)",
  borderRadius: "10px",
};

export const LoginPopupComponent = ({
  open,
  closeModal,
  handleClick,
  isLoginError,
  loginErrorMessage,
  isLoggedIn,
}) => {
  const [nick, setNick] = useState("");
  const [pass, setPass] = useState("");
  const inputPass = useRef(null);

  const handleShowPass = () => {
    if (inputPass.current.type === "password") {
      inputPass.current.type = "text";
    } else {
      inputPass.current.type = "password";
    }
  };
  return (
    <div>
      <Popup
        {...{ contentStyle }}
        open={open}
        closeOnDocumentClick={false}
        closeOnEscape={false}
        onClose={closeModal}
      >
        <div className="modal">
          <StyledModalContent>
            {isLoggedIn && (
              <StyledClosePopup className="close" onClick={closeModal} />
            )}
            <StyledLoginHeader>
              Для продолжения войдите в систему
            </StyledLoginHeader>
            <StyledUserNameContainer>
              <p>Имя пользователя</p>
              <StyledFolderNameInput
                type="email"
                value={nick}
                onChange={(e) => setNick(e.target.value)}
                placeholder="Имя пользователя"
              ></StyledFolderNameInput>
            </StyledUserNameContainer>
            <StyledPasswordContainer>
              <p>Пароль</p>
              <StyledFolderPassInput
                ref={inputPass}
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Пароль"
              ></StyledFolderPassInput>
              <StyledShowPassIcon
                onClick={handleShowPass}
                className="far fa-eye"
                id="togglePassword"
              ></StyledShowPassIcon>
              {isLoginError && (
                <StyledErrorMessage>{loginErrorMessage}</StyledErrorMessage>
              )}
            </StyledPasswordContainer>

            <StyledButtonGroup>
              {isLoggedIn && (
                <StyledButtonCancel onClick={closeModal}>
                  Отмена
                </StyledButtonCancel>
              )}
              <StyledButtonAdd onClick={() => handleClick(nick, pass)}>
                Войти
              </StyledButtonAdd>
            </StyledButtonGroup>
          </StyledModalContent>
        </div>
      </Popup>
    </div>
  );
};
