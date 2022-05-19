import React from "react";
import {
  StyledHomeworkContainer,
  StyledHomeworkHeader,
  StyledHomeworkInputContainer,
  StyledTextarea,
  StyledOriginText,
} from "./HomeworkStyle";
import { Button } from "../../elements";

export const HomeworkComponent = ({
  currentText,
  origin,
  isHomeworkPending,
  handlePostHomework,
  isHomeworkSend,
  currentLesson,
}) => {
  return (
    <StyledHomeworkContainer>
      <StyledHomeworkHeader>
        <p>Домашка ученика</p>
      </StyledHomeworkHeader>
      <StyledHomeworkInputContainer>
        <StyledOriginText origin={origin} isVisible={!!origin}>
          {origin > 75
            ? `Уникальность: ${origin}%. Снижение баллов не требуется.`
            : origin <= 75 && origin >= 50
            ? `Уникальность:  ${origin}%. Средняя уникальность`
            : origin < 50
            ? `Уникальность:  ${origin}%. Уникальность низкая, требуется снижение балов`
            : ""}
        </StyledOriginText>
        <StyledTextarea
          readOnly
          value={currentText}
          disabled={true}
          placeholder={
            currentLesson.value === "no-value"
              ? "Выберите урок"
              : "Нажмите кнопку «Вставить», чтобы добавить домашку ученика из буфера обмена и начать на нее отвечать."
          }
        ></StyledTextarea>
      </StyledHomeworkInputContainer>
      <Button
        disabled={isHomeworkSend || currentLesson.value === "no-value"}
        onClick={handlePostHomework}
        color={isHomeworkSend ? "secondary" : "primary"}
        py={13}
        px={15}
        children
      >
        Вставить
      </Button>
    </StyledHomeworkContainer>
  );
};
