import React from "react";
import { AddFolderPopupComponent } from "./AddFolderPopupComponent";
import { useSelector, useDispatch } from "react-redux";
import { CONSTRUCTOR_STORE_NAME } from "../../Constructor/ConstructorConstant";
import { addSubFolder, addFolder } from "../../Constructor/ConstructorAction";
import { LESSON_STORE_NAME } from "../../LessonSelect";
import { HEADER_STORE_NAME } from "../../../Header";

export const AddFolderPopupContainer = ({ open, closeModal, folderId }) => {
  const dispatch = useDispatch();
  const { folders, subFolders, currentStage } = useSelector(
    (store) => store[CONSTRUCTOR_STORE_NAME]
  );
  const {
    currentLesson: { value },
  } = useSelector((store) => store[LESSON_STORE_NAME]);

  const {
    user: { username },
  } = useSelector((store) => store[HEADER_STORE_NAME]);

  const handleAddFolder = (name, afterFolderId, priority) => {
    if (currentStage === "folder") {
      dispatch(
        addFolder(name, value, afterFolderId, folders, username, priority)
      );
    } else if (currentStage === "subfolder") {
      dispatch(
        addSubFolder(
          name,
          folderId,
          afterFolderId,
          subFolders,
          username,
          priority
        )
      );
    } else {
    }
    closeModal();
  };

  return (
    <AddFolderPopupComponent
      currentStage={currentStage}
      open={open}
      closeModal={closeModal}
      folders={currentStage === "folder" ? folders : subFolders}
      handleAddFolder={handleAddFolder}
      username={username}
    />
  );
};
