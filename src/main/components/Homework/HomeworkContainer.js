import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { HomeworkComponent } from "./HomeworkComponent";
import { HOMEWORK_STORE_NAME, HOMEWORK_ACTION_TYPE } from "./HomeworkConstant";
import { postHomework } from "./HomeworkAction";
import { LESSON_STORE_NAME } from "../LessonSelect/LessonSelectConstant";

export const HomeworkContainer = () => {
  const dispatch = useDispatch();
  const {
    origin,
    currentHomeworkText,
    isHomeworkPending,
    isHomeworkSuccess,
    isHomeworkError,
    homeworkErrorMessage,
    isHomeworkSend,
  } = useSelector((store) => store[HOMEWORK_STORE_NAME]);

  const { currentLesson } = useSelector((store) => store[LESSON_STORE_NAME]);

  const handlePostHomework = () => {
    navigator.clipboard.readText().then((text) => {
      dispatch({
        type: HOMEWORK_ACTION_TYPE.INPUT_TEXT_HOMEWORK,
        payload: text,
      });
      dispatch(postHomework(text, currentLesson.value));
    });
  };

  return (
    <HomeworkComponent
      currentText={currentHomeworkText}
      origin={origin}
      isHomeworkPending={isHomeworkPending}
      handlePostHomework={handlePostHomework}
      isHomeworkSend={isHomeworkSend}
      currentLesson={currentLesson}
    />
  );
};
