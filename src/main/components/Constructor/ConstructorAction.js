import { CONSTRUCTOR_ACTION_TYPE } from "./ConstructorConstant";
import api from "../../services/api";

const setAscPriorityFolder = (
  previusFolderData,
  userName,
  lessonId,
  afterFolderId
) => {
  return async () => {
    let tempPreviusData = [];
    tempPreviusData = previusFolderData.data.filter(
      (item) => item.creator.username === userName
    );
    tempPreviusData = tempPreviusData.sort((a, b) => a.priority > b.priority);
    const afterFolderPosition = tempPreviusData.findIndex(
      (e) => e.id === afterFolderId
    );
    const afterFolderObject = tempPreviusData.find(
      (e) => e.id === afterFolderId
    );

    if (afterFolderPosition !== -1) {
      try {
        for (
          let j = 2, i = afterFolderPosition + 1;
          i < tempPreviusData.length;
          i++, j++
        ) {
          await api.patch(`/category/${tempPreviusData[i].id}/`, {
            priority: j + afterFolderObject.priority,
            lessonId: lessonId,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
};

const setAscPrioritySubfolder = (
  previusSubfolderData,
  userName,
  categoryId,
  afterFolderId
) => {
  let tempPreviusData = [];
  tempPreviusData = previusSubfolderData.data.filter(
    (item) => item.creator.username === userName
  );
  tempPreviusData = tempPreviusData.sort((a, b) => a.priority > b.priority);
  const afterFolderPosition = tempPreviusData.findIndex(
    (e) => e.id === afterFolderId
  );
  const afterFolderObject = tempPreviusData.find((e) => e.id === afterFolderId);

  return async () => {
    let tempPreviusData = [];
    tempPreviusData = previusSubfolderData.data.filter(
      (item) => item.creator.username === userName
    );
    tempPreviusData = tempPreviusData.sort((a, b) => a.priority > b.priority);

    if (afterFolderPosition !== -1) {
      try {
        for (
          let j = 2, i = afterFolderPosition + 1;
          i < tempPreviusData.length;
          i++, j++
        ) {
          await api.patch(`/subcategory/${tempPreviusData[i].id}/`, {
            priority: j + afterFolderObject.priority,
            category: categoryId,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
};

export const getFolders = (lessonId) => {
  return async (dispatch) => {
    dispatch({
      type: CONSTRUCTOR_ACTION_TYPE.GET_FOLDER_PENDING,
    });
    try {
      await api.get(`/category/?lesson=${lessonId}`).then((res) => {
        dispatch({
          type: CONSTRUCTOR_ACTION_TYPE.GET_FOLDER_SUCCESS,
          payload: res.data.results,
        });
      });
    } catch (e) {
      dispatch({
        type: CONSTRUCTOR_ACTION_TYPE.GET_FOLDER_SUCCESS,
        payload: e.message,
      });
    }
  };
};

export const editFolder = (
  folderId,
  newName,
  lessonId,
  username,
  folders,
  selectedFolder,
  priority
) => {
  console.log(priority);
  return async (dispatch) => {
    dispatch({
      type: CONSTRUCTOR_ACTION_TYPE.EDIT_FOLDER_PENDING,
    });
    await dispatch(
      setAscPriorityFolder(folders, username, lessonId, selectedFolder)
    );
    try {
      await api
        .patch(`/category/${folderId}/`, {
          name: newName,
          lesson: lessonId,
          priority: priority + 1,
        })
        .then((res) => {
          dispatch({
            type: CONSTRUCTOR_ACTION_TYPE.EDIT_FOLDER_SUCCESS,
            payload: res.data.results,
          });
        });
    } catch (e) {
      dispatch({
        type: CONSTRUCTOR_ACTION_TYPE.EDIT_FOLDER_SUCCESS,
        payload: e.message,
      });
    }
  };
};

export const editSubFolder = (
  subFolderId,
  newName,
  folderId,
  username,
  folders,
  selectedFolder,
  priority
) => {
  return async (dispatch) => {
    dispatch({
      type: CONSTRUCTOR_ACTION_TYPE.EDIT_SUBFOLDER_PENDING,
    });
    await dispatch(
      setAscPrioritySubfolder(folders, username, folderId, selectedFolder)
    );
    try {
      await api
        .patch(`/subcategory/${subFolderId}/`, {
          name: newName,
          category: folderId,
          priority: priority + 1,
        })
        .then((res) => {
          dispatch({
            type: CONSTRUCTOR_ACTION_TYPE.EDIT_SUBFOLDER_SUCCESS,
            payload: res.data.results,
          });
        });
    } catch (e) {
      dispatch({
        type: CONSTRUCTOR_ACTION_TYPE.EDIT_SUBFOLDER_SUCCESS,
        payload: e.message,
      });
    }
  };
};

export const addSubFolder = (
  name,
  folderId,
  afterFolderId,
  previusData,
  username,
  priority
) => {
  return async (dispatch) => {
    dispatch({
      type: CONSTRUCTOR_ACTION_TYPE.ADD_SUBFOLDER_PENDING,
    });
    await dispatch(
      setAscPrioritySubfolder(previusData, username, folderId, afterFolderId)
    );
    try {
      await api
        .post(`/subcategory/`, {
          name: name,
          category: folderId,
          priority: priority + 1,
        })
        .then((res) => {
          dispatch({
            type: CONSTRUCTOR_ACTION_TYPE.ADD_SUBFOLDER_SUCCESS,
            payload: res.data.results,
          });
        })
        .then(() => dispatch(getSubFolders(folderId)));
    } catch (e) {
      dispatch({
        type: CONSTRUCTOR_ACTION_TYPE.ADD_SUBFOLDER_FAILURE,
        payload: e.message,
      });
    }
  };
};

export const addFolder = (
  name,
  lessonId,
  afterFolderId,
  previusData,
  username,
  priority
) => {
  return async (dispatch) => {
    dispatch({
      type: CONSTRUCTOR_ACTION_TYPE.ADD_FOLDER_PENDING,
    });
    await dispatch(
      setAscPriorityFolder(previusData, username, lessonId, afterFolderId)
    );
    try {
      await api
        .post(`/category/`, {
          name: name,
          lesson: lessonId,
          priority: priority + 1,
        })
        .then((res) => {
          dispatch({
            type: CONSTRUCTOR_ACTION_TYPE.ADD_FOLDER_SUCCESS,
            payload: res.data.results,
          });
        })
        .then(() => dispatch(getFolders(lessonId)));
    } catch (e) {
      dispatch({
        type: CONSTRUCTOR_ACTION_TYPE.ADD_FOLDER_FAILURE,
        payload: e.message,
      });
    }
  };
};

export const getSubFolders = (categoryId) => {
  return async (dispatch) => {
    dispatch({
      type: CONSTRUCTOR_ACTION_TYPE.GET_SUBFOLDER_PENDING,
    });
    try {
      await api.get(`/subcategory/?category=${categoryId}`).then((res) => {
        dispatch({
          type: CONSTRUCTOR_ACTION_TYPE.GET_SUBFOLDER_SUCCESS,
          payload: { data: res.data.results, currentFolder: categoryId },
        });
      });
    } catch (e) {
      dispatch({
        type: CONSTRUCTOR_ACTION_TYPE.GET_SUBFOLDER_SUCCESS,
        payload: e.message,
      });
    }
  };
};

export const getPhrases = (subCategoryId) => {
  return async (dispatch) => {
    dispatch({
      type: CONSTRUCTOR_ACTION_TYPE.GET_PHRASE_PENDING,
    });
    try {
      await api.get(`/phrase/?subcategory=${subCategoryId}`).then((res) => {
        dispatch({
          type: CONSTRUCTOR_ACTION_TYPE.GET_PHRASE_SUCCESS,
          payload: res.data.results,
        });
      });
    } catch (e) {
      dispatch({
        type: CONSTRUCTOR_ACTION_TYPE.GET_PHRASE_FAILURE,
        payload: e.message,
      });
    }
  };
};

export const editPhrases = (selectedPhraseId, selectedPhrase, subFolderId) => {
  return async (dispatch) => {
    dispatch({
      type: CONSTRUCTOR_ACTION_TYPE.EDIT_PHRASE_PENDING,
    });
    try {
      await api
        .patch(`/phrase/${selectedPhraseId}/`, {
          phrase: selectedPhrase,
          subcategory: subFolderId,
        })
        .then((res) => {
          dispatch({
            type: CONSTRUCTOR_ACTION_TYPE.EDIT_PHRASE_SUCCESS,
            payload: res.data.results,
          });
        })
        .then(() => dispatch(getPhrases(subFolderId)));
    } catch (e) {
      dispatch({
        type: CONSTRUCTOR_ACTION_TYPE.EDIT_PHRASE_FAILURE,
        payload: e.message,
      });
    }
  };
};

export const deletePhrases = (selectedPhraseId, subFolderId) => {
  return async (dispatch) => {
    dispatch({
      type: CONSTRUCTOR_ACTION_TYPE.DELETE_PHRASE_PENDING,
    });
    try {
      await api
        .delete(`/phrase/${selectedPhraseId}/`)
        .then((res) => {
          dispatch({
            type: CONSTRUCTOR_ACTION_TYPE.DELETE_PHRASE_SUCCESS,
            payload: res.data.results,
          });
        })
        .then(() => dispatch(getPhrases(subFolderId)));
    } catch (e) {
      dispatch({
        type: CONSTRUCTOR_ACTION_TYPE.DELETE_PHRASE_FAILURE,
        payload: e.message,
      });
    }
  };
};

export const deleteFolder = (folderId) => {
  return async (dispatch) => {
    dispatch({
      type: CONSTRUCTOR_ACTION_TYPE.DELETE_FOLDER_PENDING,
    });
    try {
      await api.delete(`/category/${folderId}/`).then((res) => {
        dispatch({
          type: CONSTRUCTOR_ACTION_TYPE.DELETE_FOLDER_SUCCESS,
        });
      });
    } catch (e) {
      dispatch({
        type: CONSTRUCTOR_ACTION_TYPE.DELETE_FOLDER_FAILURE,
        payload: e.message,
      });
    }
  };
};

export const deleteSubFolder = (subFolderId) => {
  return async (dispatch) => {
    dispatch({
      type: CONSTRUCTOR_ACTION_TYPE.DELETE_SUBFOLDER_PENDING,
    });
    try {
      await api.delete(`/subcategory/${subFolderId}/`).then((res) => {
        dispatch({
          type: CONSTRUCTOR_ACTION_TYPE.DELETE_SUBFOLDER_SUCCESS,
        });
      });
    } catch (e) {
      dispatch({
        type: CONSTRUCTOR_ACTION_TYPE.DELETE_SUBFOLDER_FAILURE,
        payload: e.message,
      });
    }
  };
};

export const addPhrase = (subFolderId, phrase) => {
  return async (dispatch) => {
    dispatch({
      type: CONSTRUCTOR_ACTION_TYPE.ADD_PHRASE_PENDING,
    });
    try {
      await api
        .post(`/phrase/`, { phrase: phrase, subcategory: subFolderId })
        .then((res) => {
          dispatch({
            type: CONSTRUCTOR_ACTION_TYPE.ADD_PHRASE_SUCCESS,
            payload: res.data.results,
          });
        })
        .then(() => dispatch(getPhrases(subFolderId)));
    } catch (e) {
      dispatch({
        type: CONSTRUCTOR_ACTION_TYPE.ADD_PHRASE_FAILURE,
        payload: e.message,
      });
    }
  };
};
