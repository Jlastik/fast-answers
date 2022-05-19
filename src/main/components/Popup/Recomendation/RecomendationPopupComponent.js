import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  StyledModalContent,
  StyledScrollableContent,
  StyledClosePopup,
} from "./RecomendationPopupStyle";

const contentStyle = {
  padding: "20px 20px 30px",
  width: "430px",
  boxShadow: "0px 3px 10px rgba(0, 73, 129, 0.1)",
  borderRadius: "10px",
};

export const RecomendationPopupComponent = ({ open, closeModal, text }) => {
  const textElement = (
    <>
      {text.split("\n").map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </>
  );
  return (
    <div>
      <Popup
        {...{ contentStyle }}
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
      >
        <div className="modal">
          <StyledModalContent>
            <StyledClosePopup className="close" onClick={closeModal} />
            <p>Рекомендации к проверке</p>
            <StyledScrollableContent>{textElement}</StyledScrollableContent>
          </StyledModalContent>
        </div>
      </Popup>
    </div>
  );
};
