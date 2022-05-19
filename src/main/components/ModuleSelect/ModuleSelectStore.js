import { MODULE_ACTION_TYPE } from "./ModuleSelectConstant";

const initialState = {
  modules: [],
  currentModule: { value: "no-value", label: "Выберите модуль" },
  isModulesPending: false,
  isModulesSuccess: false,
  isModulesError: false,
  modulesErrorMessage: null,
};

export function moduleStore(state = initialState, action) {
  switch (action.type) {
    case MODULE_ACTION_TYPE.GET_MODULE_PENDING:
      return {
        ...state,
        isModulesPending: true,
        isModulesSuccess: false,
        isModulesError: false,
        modulesErrorMessage: null,
      };
    case MODULE_ACTION_TYPE.GET_MODULE_SUCCESS:
      return {
        ...state,
        modules: action.payload,
        isModulesPending: false,
        isModulesSuccess: true,
        isModulesError: false,
        modulesErrorMessage: null,
      };
    case MODULE_ACTION_TYPE.GET_MODULE_FAILURE:
      return {
        ...state,
        isModulesPending: false,
        isModulesSuccess: false,
        isModulesError: true,
        modulesErrorMessage: action.payload,
      };

    case MODULE_ACTION_TYPE.SET_CURRENT_MODULE:
      return {
        ...state,
        currentModule: action.payload,
      };
    case MODULE_ACTION_TYPE.CLEAN_UP:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}
