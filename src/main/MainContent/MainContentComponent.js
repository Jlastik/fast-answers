import React from "react";
import {
  StyledMainContainer,
  StyledMainContent,
  StyledRecommendationContainer,
  StyledFirstBlock,
  StyledSecondBlock,
  StyledThirdBlock,
} from "./MainContentStyle";
import {
  ModuleSelectContainer,
  LessonSelectContainer,
  AnswerContainer,
  HomeworkContainer,
  RecomendationPopupComponent,
} from "../components";

import ConstructorContainer from "../components/Constructor/ConstructorContainer";
import { Button } from "../elements";
import { TimerComponent } from "../elements/Timer/TimerComponent";

export const MainContentComponent = ({
  setRecOpen,
  recOpen,
  user,
  text,
  recDisabled,
  minutes,
  seconds,
  currentLesson,
  restartTimer,
  stopTimer,
  handleCaretPosition,
  caretRow,
  caretCol,
  isHomeworkSend,
  isLoggedIn,
  isTimerOver,
}) => {
  return (
    <StyledMainContainer>
      <RecomendationPopupComponent
        text={text}
        open={recOpen}
        closeModal={() => setRecOpen(false)}
      />
      {isLoggedIn && (
        <StyledMainContent>
          <StyledFirstBlock>
            <div>
              <ModuleSelectContainer isHomeworkSend={isHomeworkSend} />
            </div>
            <div>
              <LessonSelectContainer isHomeworkSend={isHomeworkSend} />
            </div>
            <StyledRecommendationContainer>
              <Button
                disabled={currentLesson.value === "no-value" ? true : false}
                py={13}
                px={15}
                onClick={() => setRecOpen(true)}
              >
                Рекомендации к проверке
              </Button>
            </StyledRecommendationContainer>
            <TimerComponent
              isTimerOver={isTimerOver}
              minutes={minutes}
              seconds={seconds}
            />
          </StyledFirstBlock>
          <StyledSecondBlock>
            <AnswerContainer
              handleCaretPosition={handleCaretPosition}
              minutes={minutes}
              seconds={seconds}
              restartTimer={restartTimer}
              stopTimer={stopTimer}
              caretCol={caretCol}
              caretRow={caretRow}
            />
            <HomeworkContainer />
          </StyledSecondBlock>
          <StyledThirdBlock>
            <ConstructorContainer caretCol={caretCol} caretRow={caretRow} />
          </StyledThirdBlock>
        </StyledMainContent>
      )}
    </StyledMainContainer>
  );
};
