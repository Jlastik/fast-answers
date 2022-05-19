import api from "../services/api";
import { MAIN_CONTENT_ACTION_TYPE } from "./MainContentConstant";

export const sdsd = () => {
  return async (dispatch) => {
    dispatch({
      type: "",
    });
    try {
      await api.get("module/").then((res) => {
        dispatch({
          type: "",
          payload: res.data.results,
        });
      });
    } catch (e) {
      dispatch({
        type: "",
        payload: e.message,
      });
    }
  };
};
