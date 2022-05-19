import React from "react";
import {
  StyledHeaderContainer,
  StyledHeaderWrapper,
  StyledLogoContainer,
  StyledLoginContainer,
} from "./HeaderStyle";
import Logo from "../../assets/img/logo.png";
import Logout from "../../assets/img/logout.png";

import { LoginPopupComponent } from "../components";

export const HeaderComponent = ({
  handleLogin,
  isLoginError,
  loginErrorMessage,
  user,
  logOpen,
  setLogOpen,
  logout,
  isLoggedIn,
}) => {
  return (
    <StyledHeaderWrapper>
      <LoginPopupComponent
        open={logOpen || !isLoggedIn}
        closeModal={() => setLogOpen(false)}
        handleClick={handleLogin}
        isLoginError={isLoginError}
        loginErrorMessage={loginErrorMessage}
        isLoggedIn={isLoggedIn}
      />
      <StyledHeaderContainer>
        <StyledLogoContainer>
          <img src={Logo} alt=""></img>
          <p>
            Система быстрых <span>ответов</span>
          </p>
        </StyledLogoContainer>
        <StyledLoginContainer>
          <p>{isLoggedIn ? user.username : ""}</p>
          {isLoggedIn ? (
            <a onClick={() => logout()}>
              Выйти <img src={Logout} alt=""></img>
            </a>
          ) : (
            <a onClick={() => setLogOpen(true)}>
              Войти <img src={Logout} alt=""></img>
            </a>
          )}
        </StyledLoginContainer>
      </StyledHeaderContainer>
    </StyledHeaderWrapper>
  );
};
