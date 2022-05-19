import React from "react";
import { Oval } from "react-loader-spinner";
import styled from "styled-components";

const StyledLoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
  box-sizing: border-box;
`;
export const LoaderComponent = () => {
  return (
    <StyledLoaderContainer>
      <Oval
        type="ThreeDots"
        secondaryColor="#fce9a1"
        color="#f8cc26"
        height={40}
        width={40}
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </StyledLoaderContainer>
  );
};
