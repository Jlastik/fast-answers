import { HOMEWORK_ACTION_TYPE } from "./HomeworkConstant";
import api from "../../services/api";

export const postHomework = (currentText, lessonId) => {
  return async (dispatch) => {
    dispatch({
      type: HOMEWORK_ACTION_TYPE.POST_HOMEWORK_PENDING,
    });
    try {
      await api
        .post(`check_homework/`, { homework: currentText, lesson: lessonId })
        .then((res) => {
          dispatch({
            type: HOMEWORK_ACTION_TYPE.POST_HOMEWORK_SUCCESS,
            payload: res.data.originality,
          });
        });
    } catch (e) {
      dispatch({
        type: HOMEWORK_ACTION_TYPE.POST_HOMEWORK_FAILURE,
        payload: e.message,
      });
    }
  };
};
