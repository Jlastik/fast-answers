import { MAIN_CONTENT_ACTION_TYPE } from "./MainContentConstant";

const initialState = {
  timer: 0,
};

export function mainContentStore(state = initialState, action) {
  switch (action.type) {
    case MAIN_CONTENT_ACTION_TYPE:
      return {
        ...state,
      };
    case MAIN_CONTENT_ACTION_TYPE:
      return {
        ...state,
      };
    case MAIN_CONTENT_ACTION_TYPE:
      return {
        ...state,
      };
    default:
      return state;
  }
}
