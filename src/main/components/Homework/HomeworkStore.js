import { HOMEWORK_ACTION_TYPE } from "./HomeworkConstant";

const initialState = {
  origin: "",
  currentHomeworkText: "",
  isHomeworkPending: false,
  isHomeworkSuccess: false,
  isHomeworkError: false,
  homeworkErrorMessage: null,
  isHomeworkSend: false,
};

export function homeworkStore(state = initialState, action) {
  switch (action.type) {
    case HOMEWORK_ACTION_TYPE.POST_HOMEWORK_PENDING:
      return {
        ...state,
        isHomeworkPending: true,
        isHomeworkSuccess: false,
        isHomeworkError: false,
        homeworkErrorMessage: null,
        isHomeworkSend: true,
      };
    case HOMEWORK_ACTION_TYPE.POST_HOMEWORK_SUCCESS:
      return {
        ...state,
        origin: action.payload,
        isHomeworkPending: false,
        isHomeworkSuccess: true,
        isHomeworkError: false,
        homeworkErrorMessage: null,
      };
    case HOMEWORK_ACTION_TYPE.POST_HOMEWORK_FAILURE:
      return {
        ...state,
        isHomeworkPending: false,
        isHomeworkSuccess: false,
        isHomeworkError: true,
        homeworkErrorMessage: action.payload,
        isHomeworkSend: false,
      };

    case HOMEWORK_ACTION_TYPE.INPUT_TEXT_HOMEWORK:
      return {
        ...state,
        currentHomeworkText: action.payload,
      };

    default:
      return state;
  }
}
