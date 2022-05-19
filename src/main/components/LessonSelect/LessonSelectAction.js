import api from "../../services/api";
import { LESSON_ACTION_TYPE } from "./LessonSelectConstant";

export const getLessons = (id) => {
  return async (dispatch) => {
    dispatch({
      type: LESSON_ACTION_TYPE.GET_LESSON_PENDING,
    });
    try {
      await api.get(`module/${id}`).then((res) => {
        dispatch({
          type: LESSON_ACTION_TYPE.GET_LESSON_SUCCESS,
          payload: res.data.lesson_of_module,
        });
      });
    } catch (e) {
      dispatch({
        type: LESSON_ACTION_TYPE.GET_LESSON_FAILURE,
        payload: e.message,
      });
    }
  };
};
