import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { MainContentComponent } from "./MainContentComponent";
import { HEADER_STORE_NAME } from "../Header";
import { LESSON_STORE_NAME } from "../components/LessonSelect";
import { HOMEWORK_STORE_NAME } from "../components/Homework";
import { useTimer } from "react-timer-hook";

export const MainContentContainer = () => {
  const [checkTime, setCheckTime] = useState(0);
  const [isTimerOver, setIsTimerOver] = useState(false);
  const time = new Date();
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: time.setSeconds(time.getSeconds() + checkTime),
    onExpire: () => setIsTimerOver(true),
    autoStart: false,
  });

  const [recOpen, setRecOpen] = useState(false);
  const [recomendation, setRecomendation] = useState("");
  const [recDisabled, setRecDisabled] = useState(false);
  const [caretRow, setCaretRow] = useState(1);
  const [caretCol, setCaretCol] = useState(0);

  const { user, isLoggedIn } = useSelector((store) => store[HEADER_STORE_NAME]);
  const { lessons, currentLesson } = useSelector(
    (store) => store[LESSON_STORE_NAME]
  );
  const { isHomeworkSend } = useSelector((store) => store[HOMEWORK_STORE_NAME]);

  const convertRecomendation = () => {
    lessons.filter(
      (item) =>
        item.id === currentLesson.value && setRecomendation(item.recommendation)
    );
    lessons.filter(
      (item) =>
        item.id === currentLesson.value && setCheckTime(item.check_time * 60)
    );
  };
  const handleCaretPosition = (e) => {
    let textLines = e.target.value
      .substr(0, e.target.selectionStart)
      .split("\n");
    let currentLineNumber = textLines.length;
    let currentColumnIndex = textLines[textLines.length - 1].length;
    setCaretCol(currentColumnIndex);
    setCaretRow(currentLineNumber);
  };

  useEffect(() => {
    if (recomendation) {
      setRecDisabled(false);
    } else {
      setRecDisabled(true);
    }
  }, [recomendation]);

  useEffect(() => {
    convertRecomendation();
  }, [currentLesson]);

  useEffect(() => {
    if (isHomeworkSend) {
      start();
    }
  }, [isHomeworkSend]);

  useEffect(() => {
    const currentTime = new Date();
    restart(
      currentTime.setSeconds(currentTime.getSeconds() + checkTime),
      false
    );
  }, [checkTime]);

  return (
    <MainContentComponent
      setRecOpen={setRecOpen}
      recOpen={recOpen}
      user={user}
      isLoggedIn={isLoggedIn}
      text={recomendation}
      recDisabled={recDisabled}
      minutes={minutes}
      seconds={seconds}
      currentLesson={currentLesson}
      restartTimer={restart}
      stopTimer={pause}
      handleCaretPosition={handleCaretPosition}
      caretRow={caretRow}
      caretCol={caretCol}
      isHomeworkSend={isHomeworkSend}
      isTimerOver={isTimerOver}
    />
  );
};
