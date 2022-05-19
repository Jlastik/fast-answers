import React from "react";

import { ReactComponent as ClosePopup } from "../../../../assets/svg/close-popup.svg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styled from "styled-components";

const StyledClosePopup = styled(ClosePopup)`
  margin-bottom: 20px;
  align-self: flex-end;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    path {
      stroke: #303030;
    }
  }
`;

const StyledButtonAdd = styled.p`
  text-align: center;
  padding: 13px;
  background: #fadb67;
  border-radius: 5px;
  box-sizing: border-box;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    background: #ddc053;
  }
  &:active {
    background: #c3a947;
  }
  ${(props) =>
    props.disabled && "pointer-events: none; cursor: default; opacity: 0.6;"}
`;
const StyledButtonCancel = styled.p`
  text-align: center;
  padding: 13px;
  width: 150px;
  border: 1px solid #d5dfe4;
  box-sizing: border-box;
  border-radius: 5px;
  transition: 0.3s;
  cursor: pointer;
  &:hover {
    background: #f1f1f1;
  }
  &:active {
    background: #d9d9d9;
  }
`;
const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 210px;
  padding: 13px 10px;
  margin-top: 12px;
  font-family: "PT Sans";
  box-sizing: border-box;
  border: 1px solid #d5dfe4;
  border-radius: 5px;
  background: ${(props) => (props.disabled ? "#f8f8f8" : "#fff")};
  resize: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 135%;
  &:focus-visible {
    outline: none !important;
    border: 1px solid #3897f0;
    box-shadow: 0px 2px 4px rgba(56, 151, 240, 0.25);
  }
  &::placeholder {
    font-family: "PT Sans";
    font-weight: 400;
    font-size: 14px;
    line-height: 135%;
    color: #b4bdc1;
  }
`;
const StyledEditAnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const contentStyle = {
  padding: "20px",
  width: "430px",
  boxShadow: "0px 3px 10px rgba(0, 73, 129, 0.1)",
  borderRadius: "10px",
};

export const AddAnswerPopupComponent = ({
  open,
  closeModal,
  newAnswerText,
  handleNewAnswerText,
  handleAddAnswer,
  setNewAnswerText,
}) => {
  return (
    <div>
      <Popup
        {...{ contentStyle }}
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
      >
        <div className="modal">
          <StyledEditAnswerContainer>
            <StyledClosePopup className="close" onClick={closeModal} />
            <div>
              <p>Новый ответ</p>
              <StyledTextarea
                placeholder="Введите ответ в это поле"
                onChange={(e) => handleNewAnswerText(e)}
                value={newAnswerText}
              ></StyledTextarea>
            </div>
            <StyledButtonGroup>
              <StyledButtonCancel onClick={closeModal}>
                Отмена
              </StyledButtonCancel>
              <StyledButtonAdd
                disabled={!newAnswerText}
                onClick={handleAddAnswer}
              >
                Сохранить
              </StyledButtonAdd>
            </StyledButtonGroup>
          </StyledEditAnswerContainer>
        </div>
      </Popup>
    </div>
  );
};
