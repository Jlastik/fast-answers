import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { AnswerItemComponent } from "../../../elements";
import { LoaderComponent } from "../../../elements/Loader/LoaderComponent";
import {
  StyledModalContent,
  StyledScrollableContent,
  StyledClosePopup,
  StyledNoAnswers,
} from "./LastAnswerPopupStyle";

const contentStyle = {
  padding: "20px 20px 30px",
  width: "580px",
  boxShadow: "0px 3px 10px rgba(0, 73, 129, 0.1)",
  borderRadius: "10px",
};

export const LastAnswerPopupComponent = ({
  open,
  closeModal,
  lastAnswer,
  handleChangePriority,
  handleSendNewPriority,
  caretRow,
  caretCol,
  isLastAnswerPending,
  isHomeworkSend,
}) => {
  const sortAnswers = (a, b) => {
    if (a.priority > b.priority) {
      return -1;
    }
    if (a.priority < b.priority) {
      return 1;
    }
    if (a.priority === 0 || b.priority === 0) {
      if (new Date(a.created) > new Date(b.created)) {
        return -1;
      }
      return 1;
    }
    return 0;
  };
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
            <p>Мои ответы для этого урока</p>
            <StyledScrollableContent>
              {isLastAnswerPending ? (
                <LoaderComponent />
              ) : lastAnswer.length === 0 ? (
                <StyledNoAnswers>
                  Ответов на данный урок еще не было
                </StyledNoAnswers>
              ) : (
                lastAnswer
                  ?.sort((a, b) => sortAnswers(a, b))
                  .map((item) => {
                    return (
                      <AnswerItemComponent
                        closeModal={closeModal}
                        key={item.id}
                        created={item.created}
                        answerText={item.text}
                        id={item.id}
                        open={item.open}
                        priority={item.priority}
                        handleChangePriority={handleChangePriority}
                        handleSendNewPriority={handleSendNewPriority}
                        caretRow={caretRow}
                        caretCol={caretCol}
                        isHomeworkSend={isHomeworkSend}
                      />
                    );
                  })
              )}
            </StyledScrollableContent>
          </StyledModalContent>
        </div>
      </Popup>
    </div>
  );
};
