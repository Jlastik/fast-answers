import React from "react";
import { StyledTimer, StyledTimerContainer } from "./TimerStyle";

export const TimerComponent = ({ minutes, seconds, isTimerOver }) => {
  return (
    <StyledTimerContainer>
      <StyledTimer isTimerOver={isTimerOver}>
        Время ответа: {minutes}:{seconds < 10 ? "0" + seconds : seconds}
      </StyledTimer>
    </StyledTimerContainer>
  );
};
