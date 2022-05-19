import React, { useEffect } from "react";
import { LessonSelectComponent } from "./LessonSelectComponent";
import { useSelector, useDispatch } from "react-redux";
import { LESSON_STORE_NAME, LESSON_ACTION_TYPE } from "./LessonSelectConstant";

export const LessonSelectContainer = ({ isHomeworkSend }) => {
  const dispatch = useDispatch();
  const {
    lessons,
    currentLesson,
    islessonsPending,
    islessonsSuccess,
    islessonsError,
    lessonsErrorMessage,
  } = useSelector((store) => store[LESSON_STORE_NAME]);

  const setCurrentLesson = (currentLesson) => {
    dispatch({
      type: LESSON_ACTION_TYPE.SET_CURRENT_LESSON,
      payload: currentLesson,
    });
  };

  useEffect(() => {
    return function cleanUp() {
      dispatch({ type: LESSON_ACTION_TYPE.CLEAN_UP });
    };
  }, []);

  return (
    <LessonSelectComponent
      islessonsPending={islessonsPending}
      lessons={lessons}
      currentLesson={currentLesson}
      setCurrentLesson={setCurrentLesson}
      isHomeworkSend={isHomeworkSend}
    />
  );
};
