import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styled from "styled-components";
import {
  StyledClosePopup,
  StyledModalContent,
  StyledFolderNameContainer,
  StyledFolderNameInput,
  StyledSelect,
  StyledButtonGroup,
  StyledButtonCancel,
  StyledButtonAdd,
  StyledDeleteFolderContainer,
  StyledButtonDelete,
} from "./EditFolderPopupStyle";
import {
  editFolder,
  editSubFolder,
  getFolders,
  getSubFolders,
  deleteFolder,
  deleteSubFolder,
} from "../../Constructor/ConstructorAction";
import { useDispatch } from "react-redux";

const contentStyle = {
  padding: "20px",
  width: "430px",
  boxShadow: "0px 3px 10px rgba(0, 73, 129, 0.1)",
  borderRadius: "10px",
};

const StyledPopupAcceptDelet = styled(Popup)`
  &-content {
    padding: 20px;
    width: 430px;
    box-shadow: 0px 3px 10px rgba(0, 73, 129, 0.1);
    border-radius: 10px;
  }
`;
const StyledButtonGroupDelete = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  p:first-child {
    margin-right: 10px;
  }
`;

export const EditFolderPopupComponent = ({
  open,
  closeModal,
  currentStage,
  subFolders,
  folders,
  currentLesson,
  username,
  folderId,
}) => {
  const dispatch = useDispatch();
  const [selectedEditFolder, setSelectedEditFolder] = useState({
    value: "no-value",
    label: "---------",
  });
  const [selectedFolder, setSelectedFolder] = useState({
    value: "no-value",
    label: "---------",
  });
  const [newFolderName, setNewFolderName] = useState("");
  const [acceptOpen, setAcceptOpen] = useState(false);

  const convertFilterFolder = (array) => {
    let temp = [];
    if (array) {
      temp = array.filter((item) => item.creator.username === username);
    } else {
      temp = null;
    }

    let options = [];

    if (temp) {
      temp.forEach((element) => {
        options.push({
          value: element.id,
          label: element.name,
          priority: element.priority,
        });
      });
    } else {
      options = [];
    }

    return options;
  };
  // const converFolder = (array) => {
  //   let options = [];

  //   if (array) {
  //     array.forEach((element) => {
  //       options.push({
  //         value: element.id,
  //         label: element.name,
  //         priority: element.priority,
  //       });
  //     });
  //   } else {
  //     options = [];
  //   }
  //   return options;
  // };
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
  const handleDestinationFolder = (value) => {
    setSelectedEditFolder(value);
  };
  const handleEditFolder = (value) => {
    setSelectedFolder(value);
  };

  const handleDeleteFolder = () => {
    if (currentStage === "folder") {
      dispatch(deleteFolder(selectedEditFolder.value))
        .then(() => setAcceptOpen(false))
        .then(() => closeModal())
        .then(() => dispatch(getFolders(currentLesson.value)));
      setSelectedEditFolder({
        value: "no-value",
        label: "---------",
      });
      setSelectedFolder({
        value: "no-value",
        label: "---------",
      });
      setNewFolderName("");
    } else {
      dispatch(deleteSubFolder(selectedEditFolder.value))
        .then(() => setAcceptOpen(false))
        .then(() => closeModal())
        .then(() => dispatch(getSubFolders(Number(subFolders.currentFolder))));
      setSelectedEditFolder({
        value: "no-value",
        label: "---------",
      });
      setSelectedFolder({
        value: "no-value",
        label: "---------",
      });
      setNewFolderName("");
    }
  };

  const handlePostEditFolder = () => {
    let name = newFolderName;
    if (name === "") {
      name = selectedEditFolder.label;
    }
    if (currentStage === "folder") {
      dispatch(
        editFolder(
          selectedEditFolder.value,
          name,
          currentLesson.value,
          username,
          folders,
          selectedFolder.value,
          selectedFolder.priority
        )
      )
        .then(() => closeModal())
        .then(() => dispatch(getFolders(currentLesson.value)));
      setSelectedEditFolder({
        value: "no-value",
        label: "---------",
      });
      setSelectedFolder({
        value: "no-value",
        label: "---------",
      });
      setNewFolderName("");
    } else {
      dispatch(
        editSubFolder(
          selectedEditFolder.value,
          name,
          folderId,
          username,
          subFolders,
          selectedFolder.value,
          selectedFolder.priority
        )
      )
        .then(() => closeModal())
        .then(() => dispatch(getSubFolders(Number(subFolders.currentFolder))));
      setSelectedEditFolder({
        value: "no-value",
        label: "---------",
      });
      setSelectedFolder({
        value: "no-value",
        label: "---------",
      });
      setNewFolderName("");
    }
  };

  useEffect(() => {
    return function cleanUp() {
      setSelectedFolder({
        value: "no-value",
        label: "---------",
      });
      setNewFolderName("");
      setSelectedEditFolder({
        value: "no-value",
        label: "---------",
      });
    };
  }, [open]);
  return (
    <div>
      <StyledPopupAcceptDelet
        open={acceptOpen}
        closeOnDocumentClick
        onClose={() => setAcceptOpen(false)}
      >
        <div className="modal">
          <StyledModalContent>
            <StyledClosePopup
              className="close"
              onClick={() => setAcceptOpen(false)}
            />
            <p>
              Вы действительно хотите удалить папку {selectedEditFolder.label} ?
            </p>
            <StyledButtonGroupDelete>
              <StyledButtonCancel onClick={() => setAcceptOpen(false)}>
                Не удалять
              </StyledButtonCancel>
              <StyledButtonDelete onClick={handleDeleteFolder}>
                Удалить
              </StyledButtonDelete>
            </StyledButtonGroupDelete>
          </StyledModalContent>
        </div>
      </StyledPopupAcceptDelet>
      <Popup
        {...{ contentStyle }}
        open={open}
        closeOnDocumentClick={false}
        onClose={closeModal}
      >
        <div className="modal">
          <StyledModalContent>
            <StyledClosePopup className="close" onClick={closeModal} />
            <div>
              <p>Выберите папку для редактирования</p>
              <StyledSelect
                value={selectedEditFolder}
                onChange={(selectedOption) =>
                  handleDestinationFolder(selectedOption)
                }
                options={
                  currentStage === "subfolder"
                    ? [
                        {
                          value: "no-value",
                          label: "---------",
                        },
                        ...convertFilterFolder(subFolders?.data),
                      ]
                    : [
                        {
                          value: "no-value",
                          label: "---------",
                        },
                        ...convertFilterFolder(folders?.data),
                      ]
                }
                styles={customStyles}
              />
            </div>
            <StyledFolderNameContainer>
              <p>Новое имя папки</p>
              <StyledFolderNameInput
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Например, смыслы"
              ></StyledFolderNameInput>
            </StyledFolderNameContainer>
            <div>
              <p>Переместить папку после папки</p>
              <StyledSelect
                value={selectedFolder}
                onChange={(selectedOption) => handleEditFolder(selectedOption)}
                options={
                  currentStage === "subfolder"
                    ? [
                        {
                          value: "no-value",
                          label: "---------",
                        },
                        ...convertFilterFolder(subFolders?.data),
                      ]
                    : [
                        {
                          value: "no-value",
                          label: "---------",
                        },
                        ...convertFilterFolder(folders?.data),
                      ]
                }
                styles={customStyles}
              />
            </div>
            <StyledButtonGroup>
              <StyledButtonCancel onClick={closeModal}>
                Отмена
              </StyledButtonCancel>
              <StyledButtonAdd
                disabled={
                  currentStage === "subfolder" &&
                  selectedFolder.value === "no-value" &&
                  (newFolderName === "" ||
                    selectedEditFolder.value === "no-value")
                }
                onClick={handlePostEditFolder}
              >
                Сохранить изменения
              </StyledButtonAdd>
            </StyledButtonGroup>
            <StyledDeleteFolderContainer
              disabled={selectedEditFolder.value === "no-value"}
            >
              <div onClick={() => setAcceptOpen(true)}>Удалить папку</div>
            </StyledDeleteFolderContainer>
          </StyledModalContent>
        </div>
      </Popup>
    </div>
  );
};
