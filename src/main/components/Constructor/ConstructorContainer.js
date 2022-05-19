import React, { useEffect, useState, useMemo } from "react";
import { ConstructorComponent } from "./ConstructorComponent";
import {
  CONSTRUCTOR_ACTION_TYPE,
  CONSTRUCTOR_STORE_NAME,
} from "./ConstructorConstant";
import { LESSON_STORE_NAME } from "../LessonSelect/LessonSelectConstant";
import { useSelector, useDispatch } from "react-redux";
import {
  getFolders,
  getSubFolders,
  getPhrases,
  editPhrases,
  deletePhrases,
  addPhrase,
} from "./ConstructorAction";
import {
  ANSWER_ACTION_TYPE,
  ANSWER_STORE_NAME,
} from "../Answer/AnswerConstant";
import { HEADER_STORE_NAME } from "../../Header";
import { HOMEWORK_STORE_NAME } from "../Homework/HomeworkConstant";

const ConstructorContainer = ({ caretRow, caretCol }) => {
  const dispatch = useDispatch();

  const [editAnswerOpen, setEditAnswerOpen] = useState(false);
  const [selectedPhrase, setSelectedPhrase] = useState("");
  const [selectedPhraseId, setSelectedPhraseId] = useState();
  const [subFolderId, setSubFolderId] = useState();
  const [folderId, setFolderId] = useState();
  const [addAnswerOpen, setAddAnswerOpen] = useState(false);
  const [newAnswerText, setNewAnswerText] = useState("");
  const [acceptDeletePhraseOpen, setAcceptDeletePhraseOpen] = useState(false);

  const { isHomeworkSend } = useSelector((store) => store[HOMEWORK_STORE_NAME]);
  const { folders, subFolders, phrases, currentStage } = useSelector(
    (store) => store[CONSTRUCTOR_STORE_NAME]
  );
  const { currentLesson } = useSelector((store) => store[LESSON_STORE_NAME]);
  const { currentAnswerValue, isPhraseBreak } = useSelector(
    (store) => store[ANSWER_STORE_NAME]
  );
  const {
    user: { username },
  } = useSelector((store) => store[HEADER_STORE_NAME]);

  const handleFolderClick = (e) => {
    const id = e.target.id.split("");
    id.shift();
    setFolderId(Number(id.join("")));
    dispatch(getSubFolders(id.join("")));
  };
  const handleSubFolderClick = (e) => {
    const id = e.target.id.split("");
    id.shift();
    setSubFolderId(Number(id.join("")));
    dispatch(getPhrases(id.join("")));
  };
  const handleAnswerChange = (e) => {
    setSelectedPhrase(e.target.value);
  };
  const handleEditAnswer = () => {
    dispatch(editPhrases(selectedPhraseId, selectedPhrase, subFolderId));
    setEditAnswerOpen(false);
  };
  const handlePhraseClick = (e) => {
    let id = e.target.id.split("");
    const prefix = id[0];
    id.shift();
    id = Number(id.join(""));
    const text = e.target.innerText;
    //Реализация вставки текста на место курсора
    // let temp = currentAnswerValue.split("\n");
    // let splitted = temp[caretRow - 1].split("");
    // splitted.splice(caretCol, 0, text);
    // temp[caretRow - 1] = splitted.join("");
    if (prefix === "p") {
      dispatch({
        type: ANSWER_ACTION_TYPE.SET_ANSWER_VALUE,
        payload: currentAnswerValue
          ? isPhraseBreak
            ? currentAnswerValue + "\n\n" + text
            : currentAnswerValue + text
          : text,
      });
    } else if (prefix === "e") {
      setSelectedPhraseId(id);
      setSelectedPhrase(phrases.data.find((item) => item.id === id).phrase);
      setEditAnswerOpen(true);
    } else if (prefix === "d") {
      setSelectedPhraseId(id);
      setAcceptDeletePhraseOpen(true);
    }
  };
  const handleDeletePhrase = () => {
    dispatch(deletePhrases(selectedPhraseId, subFolderId));
    setAcceptDeletePhraseOpen(false);
  };
  const handleNewAnswerText = (e) => {
    setNewAnswerText(e.target.value);
  };
  const handleAddAnswer = () => {
    dispatch(addPhrase(subFolderId, newAnswerText));
    setAddAnswerOpen(false);
  };
  const handleReturnFolder = () => {
    dispatch(getFolders(currentLesson.value));
  };
  const handleReturnSubFolder = () => {
    dispatch(getSubFolders(folderId));
  };
  const handleReturnPhrases = () => {
    dispatch(getPhrases(subFolderId));
  };

  useEffect(() => {
    if (currentLesson.value !== "no-value") {
      dispatch(getFolders(currentLesson.value));
    }
  }, [currentLesson]);

  useEffect(() => {
    return function cleanUp() {
      dispatch({ type: CONSTRUCTOR_ACTION_TYPE.CLEAN_UP });
    };
  }, []);

  return (
    <ConstructorComponent
      handleDeletePhrase={handleDeletePhrase}
      acceptDeletePhraseOpen={acceptDeletePhraseOpen}
      setAcceptDeletePhraseOpen={setAcceptDeletePhraseOpen}
      folders={folders}
      subFolders={subFolders}
      phrases={phrases}
      handleFolderClick={handleFolderClick}
      handleSubFolderClick={handleSubFolderClick}
      handlePhraseClick={handlePhraseClick}
      currentStage={currentStage}
      currentLesson={currentLesson}
      editAnswerOpen={editAnswerOpen}
      setEditAnswerOpen={setEditAnswerOpen}
      selectedAnswerText={selectedPhrase}
      handleAnswerChange={handleAnswerChange}
      handleEditAnswer={handleEditAnswer}
      handleNewAnswerText={handleNewAnswerText}
      newAnswerText={newAnswerText}
      handleAddAnswer={handleAddAnswer}
      addAnswerOpen={addAnswerOpen}
      setAddAnswerOpen={setAddAnswerOpen}
      folderId={folderId}
      subFolderId={subFolderId}
      handleReturnFolder={handleReturnFolder}
      handleReturnSubFolder={handleReturnSubFolder}
      handleReturnPhrases={handleReturnPhrases}
      username={username}
      selectedPhraseId={selectedPhraseId}
      isHomeworkSend={isHomeworkSend}
      setNewAnswerText={setNewAnswerText}
    />
  );
};

export default React.memo(ConstructorContainer);
