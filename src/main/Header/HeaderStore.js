import { HEADER_ACTION_TYPE } from "./HeaderConstant";

const initialState = {
  isLoggedIn: false,
  user: {
    id: null,
    email: null,
    username: null,
    phone: null,
    first_name: null,
    last_name: null,
    middle_name: null,
    role: null,
  },
  isLoginPending: false,
  isLoginSuccess: false,
  isLoginError: false,
  loginErrorMessage: null,
};

export function headerStore(state = initialState, action) {
  switch (action.type) {
    case HEADER_ACTION_TYPE.LOGIN_PENDING:
      return {
        ...state,
        isLoginPending: true,
        isLoginSuccess: false,
        isLoginError: false,
        loginErrorMessage: null,
      };
    case HEADER_ACTION_TYPE.LOGIN_SUCCESS:
      return {
        ...state,
        user: { ...action.payload },
        isLoginPending: false,
        isLoginSuccess: true,
        isLoginError: false,
        loginErrorMessage: null,
        isLoggedIn: true,
      };
    case HEADER_ACTION_TYPE.LOGIN_FAILURE:
      return {
        ...state,
        isLoginPending: false,
        isLoginSuccess: false,
        isLoginError: true,
        loginErrorMessage: action.payload,
      };

    case HEADER_ACTION_TYPE.LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
