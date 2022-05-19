import styled from "styled-components";

export const StyledHeaderWrapper = styled.div`
  width: 100%;
  min-width: 1142px;
  background-color: #fff;
  box-shadow: 0px 3px 10px rgba(0, 73, 129, 0.1);
  margin-bottom: 30px;
  padding: 16px;
  box-sizing: border-box;
`;

export const StyledHeaderContainer = styled.div`
  width: 100%;
  max-width: 1110px;
  min-width: 1110px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
`;

export const StyledLogoContainer = styled.div`
  display: flex;
  align-items: center;
  p {
    word-break: break-word;
    width: 85px;
    text-transform: uppercase;
    margin-left: 12px;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    text-transform: uppercase;
    color: #192229;
    span {
      font-weight: bold;
    }
  }
  img {
    width: 40px;
    height: 44px;
  }
`;

export const StyledLoginContainer = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0 15px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #192229;
  }
  a {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    text-align: right;
    color: #6a7b83;
    border: 1px solid #d5dfe4;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 13px 15px;
    transition: 0.2s;
    &:hover {
      background: #f1f1f1;
    }
    &:active {
      background: #d7d7d7;
    }
    img {
      margin-left: 7px;
    }
  }
`;
