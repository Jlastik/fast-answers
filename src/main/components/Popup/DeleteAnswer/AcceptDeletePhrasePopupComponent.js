import React from "react";
import Popup from "reactjs-popup";
import { ReactComponent as ClosePopup } from "../../../../assets/svg/close-popup.svg";
import styled from "styled-components";

const contentStyle = {
  padding: "20px",
  width: "430px",
  boxShadow: "0px 3px 10px rgba(0, 73, 129, 0.1)",
  borderRadius: "10px",
};

const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;
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
const StyledPopupHeader = styled.p`
  margin-top: 10px;
`;
const StyledButtonGroupDelete = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  p:first-child {
    margin-right: 10px;
  }
`;
export const AcceptDeletePhrasePopupComponent = ({
  handleDeletePhrase,
  acceptDeletePhraseOpen,
  setAcceptDeletePhraseOpen,
}) => {
  return (
    <Popup
      {...{ contentStyle }}
      open={acceptDeletePhraseOpen}
      closeOnDocumentClick
      onClose={() => setAcceptDeletePhraseOpen(false)}
    >
      <div className="modal">
        <StyledModalContent>
          <StyledClosePopup
            className="close"
            onClick={() => setAcceptDeletePhraseOpen(false)}
          />
          <StyledPopupHeader>
            Вы действительно хотите удалить выбранный ответ ?
          </StyledPopupHeader>
          <StyledButtonGroupDelete>
            <StyledButtonCancel
              onClick={() => setAcceptDeletePhraseOpen(false)}
            >
              Не удалять
            </StyledButtonCancel>
            <StyledButtonDelete onClick={handleDeletePhrase}>
              Удалить
            </StyledButtonDelete>
          </StyledButtonGroupDelete>
        </StyledModalContent>
      </div>
    </Popup>
  );
};
