import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import {
  StyledClosePopup,
  StyledModalContent,
  StyledFolderNameContainer,
  StyledFolderNameInput,
  StyledSelect,
  StyledButtonGroup,
  StyledButtonCancel,
  StyledButtonAdd,
} from "./AddFolderPopupStyle";

const contentStyle = {
  padding: "20px",
  width: "430px",
  boxShadow: "0px 3px 10px rgba(0, 73, 129, 0.1)",
  borderRadius: "10px",
};

export const AddFolderPopupComponent = ({
  open,
  closeModal,
  folders,
  handleAddFolder,
  currentStage,
  username,
}) => {
  const [selectedFolder, setSelectedFolder] = useState({
    value: "no-value",
    label: "Выберите папку",
    priority: null,
  });
  const [folderName, setFolderName] = useState("");

  const covertFoldersData = () => {
    let options = [];

    folders?.data.forEach((element) => {
      options.push({
        value: element.id,
        label: element.name,
        priority: element.priority,
        creator: element.creator.username,
      });
    });
    return options;
  };

  const customStyles = {
    valueContainer: (provided) => ({
      ...provided,
      padding: "9px 11px",
    }),
    control: (provided) => ({
      ...provided,
      border: "1px solid #d5dfe4",
    }),
  };

  useEffect(() => {
    return function cleanUp() {
      setFolderName("");
      setSelectedFolder({
        value: "no-value",
        label: "Выберите папку",
        priority: 0,
      });
    };
  }, [open]);

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
            <StyledFolderNameContainer>
              <p>Название папки</p>
              <StyledFolderNameInput
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Например, смыслы"
              ></StyledFolderNameInput>
            </StyledFolderNameContainer>
            <div>
              <p>Добавить новую папку после папки</p>
              <StyledSelect
                isDisabled={
                  covertFoldersData().filter(
                    (item) => item.creator === username
                  ).length === 0
                }
                value={selectedFolder}
                onChange={(selectedOption) => setSelectedFolder(selectedOption)}
                options={covertFoldersData().filter(
                  (item) => item.creator === username
                )}
                styles={customStyles}
              />
            </div>
            <StyledButtonGroup>
              <StyledButtonCancel onClick={closeModal}>
                Отмена
              </StyledButtonCancel>
              <StyledButtonAdd
                disabled={!folderName}
                onClick={() =>
                  handleAddFolder(
                    folderName,
                    selectedFolder.value,
                    selectedFolder.priority
                  )
                }
              >
                Добавить
              </StyledButtonAdd>
            </StyledButtonGroup>
          </StyledModalContent>
        </div>
      </Popup>
    </div>
  );
};
