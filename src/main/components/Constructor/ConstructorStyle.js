import styled from "styled-components";

export const StyledConstructorHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  p {
    font-weight: 400;
    font-size: 18px;
    line-height: 135%;
    color: #192229;
    margin-right: 32px;
  }
`;

export const StyledIconButton = styled.a`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #6a7b83;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #4e4e4e;
    svg {
      path {
        fill: #4e4e4e;
        opacity: 0.5;
      }
    }
  }
  svg {
    margin-right: 6px;
  }
  &:last-child {
    margin-left: 21px;
  }
  ${(props) => props.disabled && "pointer-events: none; cursor: default;"}
`;

export const StyledBreadcrumb = styled.div`
  display: flex;
  align-items: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #b4bdc1;
  margin-bottom: 15px;
`;
export const StyledBreadItem = styled.div`
  cursor: pointer;
  color: #b4bdc1;
  transition: 0.3s;
  &:hover {
    color: #828789;
  }
  margin-left: 10px;
  ::before {
    margin-right: 10px;
    content: "—";
  }
`;

export const StyledBreadItemFirst = styled.div`
  cursor: pointer;
  color: #b4bdc1;
  transition: 0.3s;
  &:hover {
    color: #828789;
  }
`;

export const StyledConstructorFolderContainer = styled.div`
  ${(props) => props.currentStage && "justify-content: space-between;"}
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  p {
    border: 1px solid #d5dfe4;
  }
`;
