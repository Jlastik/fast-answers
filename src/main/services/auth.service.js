import api from "./api";
import TokenService from "./token.service";

const login = async (username, password) => {
  return await api
    .post("auth/login/", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.access) {
        TokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  TokenService.removeUser();
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
