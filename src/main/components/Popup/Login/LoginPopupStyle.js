import { ReactComponent as ClosePopup } from "../../../../assets/svg/close-popup.svg";
import styled from "styled-components";

export const StyledLoginHeader = styled.p`
  text-align: center;
  margin-bottom: 25px;
`;
export const StyledErrorMessage = styled.p`
  margin-top: 5px;
  color: #d71414;
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

export const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const StyledFolderNameInput = styled.input`
  width: 100%;
  padding: 13px 10px;
  border: 1px solid #d5dfe4;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 7px;
  ::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #b4bdc1;
  }
`;

export const StyledFolderPassInput = styled.input`
  width: 100%;
  padding: 13px 10px;
  border: 1px solid #d5dfe4;
  box-sizing: border-box;
  border-radius: 5px;
  margin-top: 7px;
  ::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #b4bdc1;
  }
`;

export const StyledShowPassIcon = styled.i`
  margin-left: -30px;
  color: #606060;
  cursor: pointer;
  &:hover {
    color: #000000;
  }
`;

export const StyledUserNameContainer = styled.div`
  margin-bottom: 20px;
`;

export const StyledPasswordContainer = styled.div`
  margin-bottom: 20px;
`;

export const StyledButtonAdd = styled.p`
  text-align: center;
  padding: 13px;
  width: 150px;
  background: #fadb67;
  border-radius: 5px;
  box-sizing: border-box;
  transition: 0.2s;
  &:hover {
    background: #ddc053;
  }
  &:active {
    background: #c3a947;
  }
`;

export const StyledButtonCancel = styled.p`
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

export const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: space-around;
  cursor: pointer;
`;
