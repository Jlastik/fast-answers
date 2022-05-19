import React from "react";
import { MainContentContainer } from "./main/MainContent";
import { HeaderContainer } from "./main/Header";
import TokenService from "./main/services/token.service";
import { useDispatch } from "react-redux";
import { HEADER_ACTION_TYPE } from "./main/Header/HeaderConstant";

function App() {
  const dispatch = useDispatch();
  const user = TokenService.getUser();
  if (user) {
    dispatch({
      type: HEADER_ACTION_TYPE.LOGIN_SUCCESS,
      payload: user.user,
    });
  }

  return (
    <div>
      <HeaderContainer />
      <MainContentContainer />
    </div>
  );
}

export default App;
