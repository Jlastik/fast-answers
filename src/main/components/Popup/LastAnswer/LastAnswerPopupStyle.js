import styled from "styled-components";
import { ReactComponent as ClosePopup } from "../../../../assets/svg/close-popup.svg";

export const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  p {
  }
`;

export const StyledNoAnswers = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #192229;
  margin-top: 10px;
`;

export const StyledScrollableContent = styled.div`
  overflow: auto;
  max-height: 500px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #192229;
`;

export const StyledClosePopup = styled(ClosePopup)`
  margin-bottom: 20px;
  align-self: flex-end;
  cursor: pointer;
  &:hover {
    path {
      stroke: #303030;
    }
  }
`;

export const StyledAnswerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  p {
    display: flex;
    align-items: center;
    input {
      background: #ffffff;
      border: 1px solid #d5dfe4;
      box-sizing: border-box;
      border-radius: 5px;
      max-width: 34px;
      padding: 3px 5px;
      margin: 0 7px 0 4px;
    }
  }
`;

export const StyledAnswerContent = styled.div`
  background: #f8f8f8;
  border: 1px solid #d5dfe4;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px 12px;
`;

export const StyledAnswerContentButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
  margin-top: 10px;
  p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 1px solid #d5dfe4;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 6px 10px;
    background: #ffffff;
    transition: 0.2s;
    cursor: pointer;
    &:hover {
      background: #f1f1f1;
    }
    &:active {
      background: #d9d9d9;
    }
  }
`;

export const StyledAnswerContainer = styled.div`
  margin-top: 24px;
`;

export const StyledAnswerText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  ${(props) =>
    !props.fullText &&
    "display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;"}
`;
