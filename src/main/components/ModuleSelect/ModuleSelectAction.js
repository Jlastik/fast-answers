import api from "../../services/api";
import { MODULE_ACTION_TYPE } from "./ModuleSelectConstant";

export const getModules = () => {
  return async (dispatch) => {
    dispatch({
      type: MODULE_ACTION_TYPE.GET_MODULE_PENDING,
    });
    try {
      await api.get("module/").then((res) => {
        dispatch({
          type: MODULE_ACTION_TYPE.GET_MODULE_SUCCESS,
          payload: res.data.results,
        });
      });
    } catch (e) {
      dispatch({
        type: MODULE_ACTION_TYPE.GET_MODULE_FAILURE,
        payload: e.message,
      });
    }
  };
};
