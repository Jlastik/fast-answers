import { ANSWER_ACTION_TYPE } from "./AnswerConstant";
import api from "../../services/api";

export const postAnswer = (
  homeworkText,
  lessonId,
  origin,
  textAnswer,
  response_time
) => {
  return async (dispatch) => {
    dispatch({
      type: ANSWER_ACTION_TYPE.POST_ANSWER_PENDING,
    });
    try {
      await api
        .post(`homework/`, {
          text: textAnswer,
          homework: homeworkText,
          lesson: lessonId,
          originality: origin,
          response_time: response_time,
        })
        .then((res) => {
          dispatch({
            type: ANSWER_ACTION_TYPE.POST_ANSWER_SUCCESS,
          });
        });
    } catch (e) {
      dispatch({
        type: ANSWER_ACTION_TYPE.POST_ANSWER_FAILURE,
        payload: e.message,
      });
    }
  };
};

export const getLasAnswer = (lessonId) => {
  return async (dispatch) => {
    dispatch({
      type: ANSWER_ACTION_TYPE.GET_LAST_ANSWER_PENDING,
    });
    try {
      await api
        .get(`homework/?lesson=${lessonId != "no-value" ? lessonId : ""}`)
        .then((res) => {
          dispatch({
            type: ANSWER_ACTION_TYPE.GET_LAST_ANSWER_SUCCESS,
            payload: res.data.results,
          });
        });
    } catch (e) {
      dispatch({
        type: ANSWER_ACTION_TYPE.GET_LAST_ANSWER_FAILURE,
        payload: e.message,
      });
    }
  };
};

export const changePriority = (homeworkId, priority) => {
  return async (dispatch) => {
    dispatch({
      type: ANSWER_ACTION_TYPE.POST_CHANGE_PRIORITY_PENDING,
    });
    try {
      await api
        .patch(`homework/${homeworkId}/`, { priority: priority })
        .then(() => {
          dispatch({
            type: ANSWER_ACTION_TYPE.POST_CHANGE_PRIORITY_SUCCESS,
          });
        });
    } catch (e) {
      dispatch({
        type: ANSWER_ACTION_TYPE.POST_CHANGE_PRIORITY_FAILURE,
        payload: e.message,
      });
    }
  };
};
