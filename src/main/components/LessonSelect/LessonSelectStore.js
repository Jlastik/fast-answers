import { LESSON_ACTION_TYPE } from "./LessonSelectConstant";

const initialState = {
  lessons: [],
  currentLesson: { value: "no-value", label: "Выберите урок" },
  islessonsPending: false,
  islessonsSuccess: false,
  islessonsError: false,
  lessonsErrorMessage: null,
};

export function lessonStore(state = initialState, action) {
  switch (action.type) {
    case LESSON_ACTION_TYPE.GET_LESSON_PENDING:
      return {
        ...state,
        islessonsPending: true,
        islessonsSuccess: false,
        islessonsError: false,
        lessonsErrorMessage: null,
      };
    case LESSON_ACTION_TYPE.GET_LESSON_SUCCESS:
      return {
        ...state,
        lessons: action.payload,
        islessonsPending: false,
        islessonsSuccess: true,
        islessonsError: false,
        lessonsErrorMessage: null,
      };
    case LESSON_ACTION_TYPE.GET_LESSON_FAILURE:
      return {
        ...state,
        islessonsPending: false,
        islessonsSuccess: false,
        islessonsError: true,
        lessonsErrorMessage: action.payload,
      };

    case LESSON_ACTION_TYPE.SET_CURRENT_LESSON:
      return {
        ...state,
        currentLesson: action.payload,
      };
    case LESSON_ACTION_TYPE.CLEAN_UP:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
