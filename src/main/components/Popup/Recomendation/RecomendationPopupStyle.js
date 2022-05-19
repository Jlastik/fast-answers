import styled from "styled-components";
import { ReactComponent as ClosePopup } from "../../../../assets/svg/close-popup.svg";

export const StyledModalContent = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin-bottom: 16px;
  }
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
