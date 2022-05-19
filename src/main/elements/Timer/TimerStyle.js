import styled from "styled-components";

export const StyledTimerContainer = styled.div`
  align-self: flex-end;
  justify-self: flex-end;
  width: 185px;
`;
export const StyledTimer = styled.p`
  display: flex;
  justify-content: center;
  background: #f8f8f8;
  ${(props) =>
    props.isTimerOver
      ? "border: 2px solid #d31616;"
      : "border: 1px solid #d5dfe4;"}
  box-sizing: border-box;
  border-radius: 5px;
  padding: 13px 10px;
`;
