import React, { useState } from "react";
import {
  StyledConstructorHeaderContainer,
  StyledBreadcrumb,
  StyledConstructorFolderContainer,
  StyledIconButton,
  StyledBreadItem,
  StyledBreadItemFirst,
} from "./ConstructorStyle";
import { ReactComponent as AddFolder } from "../../../assets/svg/add-folder.svg";
import { ReactComponent as EditFolder } from "../../../assets/svg/edit-folder.svg";

import {
  EditAnswerPopupComponent,
  EditFolderPopupComponent,
  AddFolderPopupContainer,
  AddAnswerPopupComponent,
} from "../";

import { Button, FolderButton, LoaderComponent } from "../../elements";
import { AcceptDeletePhrasePopupComponent } from "../Popup/DeleteAnswer/AcceptDeletePhrasePopupComponent";

export const ConstructorComponent = ({
  folders,
  subFolders,
  phrases,
  handleFolderClick,
  handleSubFolderClick,
  handlePhraseClick,
  currentStage,
  currentLesson,
  setEditAnswerOpen,
  editAnswerOpen,
  selectedAnswerText,
  handleAnswerChange,
  handleEditAnswer,
  handleNewAnswerText,
  newAnswerText,
  handleAddAnswer,
  addAnswerOpen,
  setAddAnswerOpen,
  folderId,
  subFolderId,
  handleReturnFolder,
  handleReturnSubFolder,
  handleReturnPhrases,
  username,
  selectedPhraseId,
  isHomeworkSend,
  acceptDeletePhraseOpen,
  setAcceptDeletePhraseOpen,
  handleDeletePhrase,
  setNewAnswerText,
}) => {
  const [addFolderOpen, setAddFolderOpen] = useState(false);
  const [editFolderOpen, setEditFolderOpen] = useState(false);

  const sortFolders = (a, b) => {
    return a.priority > b.priority ? 1 : -1;
  };

  return (
    <div>
      <AcceptDeletePhrasePopupComponent
        handleDeletePhrase={handleDeletePhrase}
        acceptDeletePhraseOpen={acceptDeletePhraseOpen}
        setAcceptDeletePhraseOpen={setAcceptDeletePhraseOpen}
      />
      <AddAnswerPopupComponent
        handleNewAnswerText={handleNewAnswerText}
        newAnswerText={newAnswerText}
        handleAddAnswer={handleAddAnswer}
        open={addAnswerOpen}
        setNewAnswerText={setNewAnswerText}
        closeModal={() => {
          setAddAnswerOpen(false);
          setNewAnswerText("");
        }}
      />
      <EditAnswerPopupComponent
        handleAnswerChange={handleAnswerChange}
        selectedAnswerText={selectedAnswerText}
        handleEditAnswer={handleEditAnswer}
        open={editAnswerOpen}
        selectedPhraseId={selectedPhraseId}
        subFolderId={subFolderId}
        closeModal={() => {
          setEditAnswerOpen(false);
          selectedAnswerText("");
        }}
      />
      <AddFolderPopupContainer
        open={addFolderOpen}
        closeModal={() => setAddFolderOpen(false)}
        currentStage={currentStage}
        folderId={folderId}
      />
      <EditFolderPopupComponent
        folderId={folderId}
        open={editFolderOpen}
        closeModal={() => setEditFolderOpen(false)}
        currentStage={currentStage}
        subFolders={subFolders}
        folders={folders}
        currentLesson={currentLesson}
        username={username}
      />
      <StyledConstructorHeaderContainer>
        <p>Конструктор готовых ответов</p>
        {currentStage === "phrase" ? (
          <StyledIconButton onClick={() => setAddAnswerOpen(true)}>
            <AddFolder />
            Добавить новый ответ
          </StyledIconButton>
        ) : (
          <React.Fragment>
            <StyledIconButton
              disabled={currentLesson.value === "no-value"}
              onClick={() => setAddFolderOpen(true)}
            >
              <AddFolder />
              Добавить папку
            </StyledIconButton>
            <StyledIconButton
              disabled={currentLesson.value === "no-value"}
              onClick={() => setEditFolderOpen(true)}
            >
              <EditFolder />
              Редактировать папку
            </StyledIconButton>
          </React.Fragment>
        )}
      </StyledConstructorHeaderContainer>
      <StyledBreadcrumb>
        {currentStage === "folder" ? (
          <StyledBreadItemFirst onClick={handleReturnFolder}>
            Конструктор
          </StyledBreadItemFirst>
        ) : currentStage === "subfolder" ? (
          <React.Fragment>
            <StyledBreadItemFirst onClick={handleReturnFolder}>
              Конструктор
            </StyledBreadItemFirst>
            <StyledBreadItem onClick={handleReturnSubFolder}>
              {folders &&
                folders.data.find((item) => item.id === folderId).name}
            </StyledBreadItem>
          </React.Fragment>
        ) : currentStage === "phrase" ? (
          <React.Fragment>
            <StyledBreadItemFirst onClick={handleReturnFolder}>
              Конструктор
            </StyledBreadItemFirst>
            <StyledBreadItem onClick={handleReturnSubFolder}>
              {folders &&
                folders.data.find((item) => item.id === folderId).name}
            </StyledBreadItem>
            <StyledBreadItem onClick={handleReturnPhrases}>
              {subFolders &&
                subFolders.data.find((item) => item.id === subFolderId).name}
            </StyledBreadItem>
          </React.Fragment>
        ) : (
          ""
        )}
      </StyledBreadcrumb>
      {folders?.isPending || subFolders?.isPending || phrases?.isPending ? (
        <LoaderComponent />
      ) : (
        <StyledConstructorFolderContainer
          currentStage={currentStage === "phrase"}
        >
          {currentStage === "folder" &&
            (folders && folders?.data.length === 0
              ? "Нет ни одной доступной папки"
              : folders &&
                folders?.data
                  ?.sort((a, b) =>
                    a.priority > b.priority
                      ? 1
                      : a.priority < b.priority
                      ? -1
                      : 0
                  )
                  .map((item) => {
                    return (
                      <Button
                        onClick={(e) => handleFolderClick(e)}
                        id={"f" + item.id}
                        key={item.id}
                        py={13}
                        px={15}
                      >
                        {item.name}
                      </Button>
                    );
                  }))}
          {currentStage === "subfolder" &&
            (subFolders && subFolders?.data.length === 0
              ? "Нет ни одной доступной подпапки"
              : subFolders &&
                subFolders?.data
                  ?.sort((a, b) =>
                    a.priority > b.priority
                      ? 1
                      : a.priority < b.priority
                      ? -1
                      : 0
                  )
                  .map((item) => {
                    return (
                      <Button
                        onClick={(e) => handleSubFolderClick(e)}
                        id={"s" + item.id}
                        key={item.id}
                        py={13}
                        px={15}
                      >
                        {item.name}
                      </Button>
                    );
                  }))}
          {currentStage === "phrase" &&
            (!isHomeworkSend
              ? "Вставьте домашнее заданее для работы с ответами"
              : phrases && phrases?.data.length === 0
              ? "Нет ни одной доступной фразы"
              : phrases &&
                phrases?.data?.map((item) => {
                  return (
                    <FolderButton
                      onClick={(e) => handlePhraseClick(e)}
                      id={item.id}
                      key={item.id}
                      creator={item?.creator?.username}
                      username={username}
                    >
                      {item.phrase}
                    </FolderButton>
                  );
                }))}
          {currentStage !== "phrase" &&
          currentStage !== "subfolder" &&
          currentStage !== "folder" ? (
            <div>Выберите урок для отображения папок</div>
          ) : (
            ""
          )}
        </StyledConstructorFolderContainer>
      )}
    </div>
  );
};
