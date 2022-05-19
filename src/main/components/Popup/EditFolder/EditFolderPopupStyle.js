import { ReactComponent as ClosePopup } from "../../../../assets/svg/close-popup.svg";
import styled from "styled-components";
import Select from "react-select";

export const StyledClosePopup = styled(ClosePopup)`
  align-self: flex-end;
  margin-bottom: 20px;
  cursor: pointer;
  &:hover {
    path {
      stroke: #303030;
    }
  }
`;

export const StyledSelect = styled(Select)`
  margin-top: 10px;
  width: 100%;
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
  :focus-visible {
    outline: none;
  }
`;

export const StyledFolderNameContainer = styled.div`
  margin: 20px 0;
`;

export const StyledButtonAdd = styled.p`
  text-align: center;
  padding: 13px;
  min-width: 150px;
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
  ${(props) =>
    props.disabled && "pointer-events: none; cursor: default; opacity: 0.6;"}
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
  justify-content: space-between;
  margin-top: 20px;
`;

export const StyledButtonDelete = styled.p`
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

export const StyledDeleteFolderContainer = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #fa6767;
  margin-top: 20px;
  div {
    ${(props) =>
      props.disabled && "pointer-events: none; cursor: default; color: #ccc;"}
    transition: 0.2s;
    box-sizing: border-box;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px;
    &:hover {
      background: #fff3f3;
    }
    &:active {
      background: #ffdada;
    }
  }
`;
