import React, { useEffect, useState } from "react";

import Popup from "reactjs-popup";
import {
  StyledAnswerContainer,
  StyledAnswerHeader,
  StyledAnswerContent,
  StyledAnswerText,
  StyledAnswerContentButtonGroup,
  StyledPopupTooltip,
  StyledCopyTooltip,
  StyledPriorityContainer,
  StyledCopyIcon,
} from "./AnswerItemStyle";
import { ReactComponent as ShowMore } from "../../../assets/svg/show-more.svg";
import { ReactComponent as CopyAnswer } from "../../../assets/svg/copy-answer.svg";
import { ReactComponent as HelpTooltip } from "../../../assets/svg/help-tooltip.svg";
import Copy from "../../../assets/img/copy.png";
import {
  ANSWER_ACTION_TYPE,
  ANSWER_STORE_NAME,
} from "../../components/Answer/AnswerConstant";
import { useDispatch, useSelector } from "react-redux";

export const AnswerItemComponent = ({
  answerText,
  id,
  open,
  priority,
  handleChangePriority,
  handleSendNewPriority,
  created,
  caretRow,
  caretCol,
  isHomeworkSend,
  closeModal,
}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [fullText, setFulltext] = useState(false);
  const dispatch = useDispatch();
  const { currentAnswerValue } = useSelector(
    (store) => store[ANSWER_STORE_NAME]
  );

  const copyAnswer = () => {
    setTooltipOpen(true);

    if (isHomeworkSend) {
      dispatch({
        type: ANSWER_ACTION_TYPE.SET_ANSWER_VALUE,
        payload: currentAnswerValue
          ? currentAnswerValue + "\n👇\n" + answerText
          : answerText,
      });
      closeModal();
    }

    setTimeout(() => {
      setTooltipOpen(false);
    }, 1000);
  };

  const handleFullAnswer = (e) => {
    setFulltext(!fullText);
  };

  useEffect(() => {
    return () => {
      setTooltipOpen(false);
    };
  }, []);

  return (
    <StyledAnswerContainer>
      <StyledAnswerHeader>
        <StyledPriorityContainer>
          <p>Приоритет</p>
          <div>
            <input
              id={"r0-" + id}
              type="radio"
              name={"priority" + id}
              checked={priority === 0}
              onChange={(e) => handleSendNewPriority(e)}
            ></input>
            <label htmlFor={"r0-" + id}>0</label>
          </div>
          <div>
            <input
              id={"r1-" + id}
              type="radio"
              name={"priority" + id}
              checked={priority === 1}
              onChange={(e) => handleSendNewPriority(e)}
            ></input>
            <label htmlFor={"r1-" + id}>1</label>
          </div>
          <div>
            <input
              id={"r2-" + id}
              type="radio"
              name={"priority" + id}
              checked={priority === 2}
              onChange={(e) => handleSendNewPriority(e)}
            ></input>
            <label htmlFor={"r2-" + id}>2</label>
          </div>
          <div>
            <input
              id={"r3-" + id}
              type="radio"
              name={"priority" + id}
              checked={priority === 3}
              onChange={(e) => handleSendNewPriority(e)}
            ></input>
            <label htmlFor={"r3-" + id}>3</label>
          </div>
          <div>
            <input
              id={"r4-" + id}
              type="radio"
              name={"priority" + id}
              checked={priority === 4}
              onChange={(e) => handleSendNewPriority(e)}
            ></input>
            <label htmlFor={"r4-" + id}>4</label>
          </div>
          <div>
            <input
              id={"r5-" + id}
              type="radio"
              name={"priority" + id}
              checked={priority === 5}
              onChange={(e) => handleSendNewPriority(e)}
            ></input>
            <label htmlFor={"r5-" + id}>5</label>
          </div>
          <Popup
            trigger={() => <HelpTooltip />}
            position="right center"
            on={["click"]}
            closeOnDocumentClick
          >
            <StyledPopupTooltip>
              Вы можете расставить порядок ответов так, как вам нравится,
              изменив их приоритетность. 5 - ответ будет в самом верху, 0 -
              внизу, в порядке от нового к старому
            </StyledPopupTooltip>
          </Popup>
        </StyledPriorityContainer>
        <p>{new Date(created).toLocaleString()}</p>
      </StyledAnswerHeader>
      <StyledAnswerContent>
        <StyledAnswerText fullText={fullText}>
          {answerText.split("\n").map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </StyledAnswerText>
        <StyledAnswerContentButtonGroup>
          <StyledCopyTooltip
            open={tooltipOpen}
            onOpen={copyAnswer}
            isHomeworkSend={isHomeworkSend}
            trigger={() => (
              <p>
                Вставить в «Мой ответ»{" "}
                <StyledCopyIcon src={Copy} alt=""></StyledCopyIcon>
              </p>
            )}
            position="top center"
            closeOnDocumentClick
          >
            {isHomeworkSend ? (
              <p>Ответ скопирован в поле «Мой ответ»</p>
            ) : (
              <p>Вставьте домашнее заданее для работы с ответами</p>
            )}
          </StyledCopyTooltip>
          <p id={id} onClick={(e) => handleFullAnswer(e)}>
            {fullText ? "Свернуть ответ" : "Развернуть ответ"}
          </p>
        </StyledAnswerContentButtonGroup>
      </StyledAnswerContent>
    </StyledAnswerContainer>
  );
};
