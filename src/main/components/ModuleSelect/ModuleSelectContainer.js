import React, { useEffect } from "react";
import { ModuleSelectComponent } from "./ModuleSelectComponent";
import { useSelector, useDispatch } from "react-redux";
import { MODULE_STORE_NAME, MODULE_ACTION_TYPE } from "./ModuleSelectConstant";
import { HEADER_STORE_NAME } from "../../Header";
import { getModules } from "./ModuleSelectAction";
import { getLessons } from "../LessonSelect/LessonSelectAction";

export const ModuleSelectContainer = ({ isHomeworkSend }) => {
  const dispatch = useDispatch();
  const {
    modules,
    currentModule,
    isModulesPending,
    isModulesSuccess,
    isModulesError,
  } = useSelector((store) => store[MODULE_STORE_NAME]);
  const { isLoggedIn } = useSelector((store) => store[HEADER_STORE_NAME]);

  const setCurrentModule = (currentModule) => {
    dispatch({
      type: MODULE_ACTION_TYPE.SET_CURRENT_MODULE,
      payload: currentModule,
    });
    dispatch(getLessons(currentModule.value));
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getModules());
    }
  }, [isLoggedIn]);

  useEffect(() => {
    return function cleanUp() {
      dispatch({ type: MODULE_ACTION_TYPE.CLEAN_UP });
    };
  }, []);
  return (
    <ModuleSelectComponent
      modules={modules}
      currentModule={currentModule}
      setCurrentModule={setCurrentModule}
      isModulesPending={isModulesPending}
      isHomeworkSend={isHomeworkSend}
    />
  );
};
