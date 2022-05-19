import styled from "styled-components";

export const StyledHomeworkContainer = styled.div``;
export const StyledHomeworkHeader = styled.div`
  display: flex;
  margin-bottom: 5px;
`;
export const StyledTextarea = styled.textarea`
  font-family: "PT sans";
  width: 100%;
  height: 210px;
  padding: 13px 10px;
  box-sizing: border-box;
  border: 1px solid #d5dfe4;
  border-radius: 5px;
  background: ${(props) => (props.disabled ? "#f8f8f8" : "#fff")};
  resize: none;
  font-weight: 400;
  font-size: 16px;
  line-height: 135%;
  &:focus-visible {
    outline: none !important;
    border: 1px solid #3897f0;
    box-shadow: 0px 2px 4px rgba(56, 151, 240, 0.25);
  }
  &::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 135%;
    color: #b4bdc1;
  }
`;
export const StyledHomeworkInputContainer = styled.div`
  margin-bottom: 15px;
`;
export const StyledHomeworkButton = styled.p`
  margin-top: 22px;
  text-align: center;
  background: #fadb67;
  border-radius: 5px;
  padding: 13px 15px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #ddc056;
  }
  &:active {
    background: #c9ae4d;
  }
`;

export const StyledOriginText = styled.div`
  margin: 10px 0;
  opacity: ${(props) => (props.isVisible ? "1;" : "0;")};
  transition: 0.1s;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  color: ${(props) =>
    props.origin > 75
      ? "#2ad200;"
      : props.origin <= 75 && props.origin >= 50
      ? "#d5b648;"
      : props.origin < 50
      ? "#ff0c0c;"
      : ""};
`;
