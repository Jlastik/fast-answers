import React, { useState } from "react";
import { HeaderComponent } from "./HeaderComponent";
import AuthService from "../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { HEADER_ACTION_TYPE, HEADER_STORE_NAME } from "./HeaderConstant";

export const HeaderContainer = () => {
  const [logOpen, setLogOpen] = useState(false);
  const dispatch = useDispatch();
  const {
    isLoginPending,
    isLoginSuccess,
    isLoginError,
    loginErrorMessage,
    user,
    isLoggedIn,
  } = useSelector((store) => store[HEADER_STORE_NAME]);

  const handleLogin = (username, password) => {
    if (username === "" || password === "") {
      dispatch({
        type: HEADER_ACTION_TYPE.LOGIN_FAILURE,
        payload: "Поля не могу быть пустыми",
      });
    } else {
      dispatch({
        type: HEADER_ACTION_TYPE.LOGIN_PENDING,
      });
      AuthService.login(username, password).then(
        (res) => {
          dispatch({
            type: HEADER_ACTION_TYPE.LOGIN_SUCCESS,
            payload: res.user,
          });
          setLogOpen(false);
        },
        (e) => {
          const resMessage = e.response?.data?.detail;
          e.toString();
          dispatch({
            type: HEADER_ACTION_TYPE.LOGIN_FAILURE,
            payload: resMessage,
          });
        }
      );
    }
  };

  const handleLogout = () => {
    dispatch({
      type: HEADER_ACTION_TYPE.LOGOUT,
    });
    AuthService.logout();
  };

  return (
    <HeaderComponent
      handleLogin={handleLogin}
      isLoginPending={isLoginPending}
      isLoginSuccess={isLoginSuccess}
      isLoginError={isLoginError}
      loginErrorMessage={loginErrorMessage}
      user={user}
      logOpen={logOpen}
      setLogOpen={setLogOpen}
      logout={handleLogout}
      isLoggedIn={isLoggedIn}
    />
  );
};
