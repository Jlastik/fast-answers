import React, { useState } from "react";

import { ReactComponent as ClosePopup } from "../../../../assets/svg/close-popup.svg";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { deletePhrases } from "../../Constructor/ConstructorAction";

const StyledClosePopup = styled(ClosePopup)`
  margin-bottom: 20px;
  align-self: flex-end;
  cursor: pointer;
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
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background: #ddc053;
  }
  &:active {
    background: #c3a947;
  }
  ${(props) => props.disabled && "pointer-events: none; cursor: default;"}
`;
const StyledButtonCancel = styled.p`
  text-align: center;
  padding: 13px;
  width: 150px;
  border: 1px solid #d5dfe4;
  box-sizing: border-box;
  border-radius: 5px;
  transition: 0.2s;
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
const StyledButtonGroupDelete = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  p:first-child {
    margin-right: 10px;
  }
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 210px;
  padding: 13px 10px;
  margin-top: 12px;
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
const StyledButtonDelete = styled.p`
  text-align: center;
  padding: 13px;
  min-width: 150px;
  background: #fadb67;
  transition: 0.2s;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  background: #e1e1e1;
  &:hover {
    background: #c3c3c3;
  }
  &:active {
    background: #9f9f9f;
  }
`;
const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
const StyledDeleteButton = styled.div`
  transition: 0.2s;
  box-sizing: border-box;
  border-radius: 5px;
  align-self: center;
  margin-top: 20px;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #fa6767;
  cursor: pointer;
  padding: 10px;
  &:hover {
    background: #fff3f3;
  }
  &:active {
    background: #ffdada;
  }
`;
const StyledPopupAcceptDelet = styled(Popup)`
  &-content {
    padding: 20px;
    width: 430px;
    box-shadow: 0px 3px 10px rgba(0, 73, 129, 0.1);
    border-radius: 10px;
  }
`;
export const EditAnswerPopupComponent = ({
  open,
  closeModal,
  selectedAnswerText,
  handleAnswerChange,
  handleEditAnswer,
  selectedPhraseId,
  subFolderId,
}) => {
  const dispatch = useDispatch();
  const [acceptOpen, setAcceptOpen] = useState(false);

  const handleDeleteAnswer = () => {
    setAcceptOpen(false);
    dispatch(deletePhrases(selectedPhraseId, subFolderId));
  };
  return (
    <div>
      <StyledPopupAcceptDelet
        open={acceptOpen}
        closeOnDocumentClick
        onClose={() => setAcceptOpen(false)}
      >
        <div className="modal">
          <StyledModalContent>
            <StyledClosePopup
              className="close"
              onClick={() => setAcceptOpen(false)}
            />
            <p>Вы действительно хотите удалить выбранный ответ?</p>
            <StyledButtonGroupDelete>
              <StyledButtonCancel onClick={() => setAcceptOpen(false)}>
                Не удалять
              </StyledButtonCancel>
              <StyledButtonDelete onClick={handleDeleteAnswer}>
                Удалить
              </StyledButtonDelete>
            </StyledButtonGroupDelete>
          </StyledModalContent>
        </div>
      </StyledPopupAcceptDelet>
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
              <p>Отредактируйте ответ</p>
              <StyledTextarea
                onChange={(e) => handleAnswerChange(e)}
                value={selectedAnswerText}
              ></StyledTextarea>
            </div>
            <StyledButtonGroup>
              <StyledButtonCancel onClick={closeModal}>
                Отмена
              </StyledButtonCancel>
              <StyledButtonAdd onClick={handleEditAnswer}>
                Сохранить изменения
              </StyledButtonAdd>
            </StyledButtonGroup>
            <StyledDeleteButton onClick={() => setAcceptOpen(true)}>
              Удалить ответ
            </StyledDeleteButton>
          </StyledEditAnswerContainer>
        </div>
      </Popup>
    </div>
  );
};
