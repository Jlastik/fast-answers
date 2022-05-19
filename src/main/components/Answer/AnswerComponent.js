import React from "react";
import {
  StyledAnswerContainer,
  StyledTextarea,
  StyledAnswerHeader,
  StyledAnswerInputContainer,
  StyledLastAnswerHeader,
  StyledLastAnswerIcon,
  StyledPhraseCheckboxContainer,
} from "./AnswerStyle";
import { LastAnswerPopupComponent } from "../Popup/LastAnswer/LastAnswerPopupComponent";
import { Button } from "../../elements";

export const AnswerComponent = ({
  isHomeworkSend,
  currentValue,
  handleAnswerSend,
  setCurrentValue,
  handleGetLastAnswer,
  setLastAnswerOpen,
  lastAnswerOpen,
  lastAnswer,
  handleChangePriority,
  handleSendNewPriority,
  currentLessonId,
  handleCaretPosition,
  caretCol,
  caretRow,
  isLastAnswerPending,
  handlePhraseBreak,
  isPhraseBreak,
}) => {
  return (
    <StyledAnswerContainer>
      <LastAnswerPopupComponent
        isLastAnswerPending={isLastAnswerPending}
        caretRow={caretRow}
        caretCol={caretCol}
        lastAnswer={lastAnswer}
        open={lastAnswerOpen}
        closeModal={() => setLastAnswerOpen(false)}
        handleChangePriority={handleChangePriority}
        handleSendNewPriority={handleSendNewPriority}
        isHomeworkSend={isHomeworkSend}
      />
      <StyledAnswerHeader>
        <p>Мой ответ</p>
        <StyledLastAnswerHeader
          disabled={currentLessonId === "no-value"}
          onClick={handleGetLastAnswer}
        >
          <StyledLastAnswerIcon />
          Мои ответы для этого урока
        </StyledLastAnswerHeader>
      </StyledAnswerHeader>
      <StyledAnswerInputContainer>
        <StyledPhraseCheckboxContainer>
          <label>
            <input
              type="checkbox"
              checked={isPhraseBreak}
              onChange={handlePhraseBreak}
            ></input>
            <span>Вставлять фразы с новой строки</span>
          </label>
        </StyledPhraseCheckboxContainer>
        <StyledTextarea
          disabled={!isHomeworkSend}
          placeholder={
            isHomeworkSend
              ? "Чтобы закончить и скопировать, составьте свой ответ в этом поле 👇"
              : "Сначала вставьте ответ ученика в поле “Домашка ученика” справа 👉"
          }
          value={
            lastAnswerOpen && currentValue
              ? currentValue + "\n" + "👇"
              : currentValue
          }
          onChange={(e) => setCurrentValue(e)}
          onPointerLeave={(e) => handleCaretPosition(e)}
        ></StyledTextarea>
      </StyledAnswerInputContainer>
      <Button
        disabled={!isHomeworkSend || !currentValue}
        onClick={handleAnswerSend}
        color={isHomeworkSend ? "primary" : "disabled"}
        py={13}
        px={15}
        children
      >
        Закончить и скопировать
      </Button>
    </StyledAnswerContainer>
  );
};
