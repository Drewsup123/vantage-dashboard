import { collection, doc, setDoc, getDoc, query, where, getDocs, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../Firebase';
import store from '../store';
export const POPULATE_FILES = "POPULATE_FILES";
export const ADD_FILE = "ADD_FILE";
export const DELETE_FILE = "DELETE_FILE";
export const ADD_FOLDER = "ADD_FOLDER";
export const DELETE_FOLDER = "DELETE_FOLDER";
export const TOGGLE_LOADING = "TOGGLE_LOADING";
export const GET_USER_FILES = "GET_USER_FILES";
export const MOVE_FILE = "MOVE_FILE";

const GetFiles = () => store.getState().files;

export const populateFiles = (files) => {
    return { type : POPULATE_FILES, payload: files };
}

export const addFile = (file) => {
    return {type: ADD_FILE, payload: file};
}

export const deleteFile = (file) => {
    //? Check for parentId and remove from child array
    return {type: DELETE_FILE, payload: file};
}

export const moveFile = (fileToMove, destination) => async (dispatch) => {
    let StateFiles = GetFiles().files;
    let updatedFile = StateFiles.find(file => file.id === fileToMove.id);
    let updatedDestination = StateFiles.find(file => file.id === destination.id);
    if(updatedFile && updatedDestination){
        const fileToMoveRef = doc(db, "files", fileToMove.id);
        const destinationRef = doc(db, "files", destination.id);
        await updateDoc(fileToMoveRef, {
            ...updatedFile,
            parentId: destination.id
        });
        await updateDoc(destinationRef, {
            ...updatedDestination,
            isDir: true,
            childrenIds: [...updatedDestination.childrenIds, updatedFile.id]
        });
    }
    console.log("Updated Documents!");
    dispatch({ type: MOVE_FILE, payload: { fileToMove, destination } });
}   

export const getUserFiles = () => async (dispatch) => {
    dispatch({ type: TOGGLE_LOADING, payload: true });
    const filesRef = collection(db, "files");
    const q = query(filesRef, where("id", "in", store.getState().User.files));
    const querySnapshot = await getDocs(q);
    console.log("Query Snap: ", querySnapshot);
    let fileData = []
    querySnapshot.forEach(doc => fileData.push(doc.data()));
    dispatch({ type: GET_USER_FILES, payload: fileData });
    dispatch({ type: TOGGLE_LOADING, payload: false });
}

export const addFolder = (newFolderName) => async(dispatch) => {
    const uid = store.getState().User.uid;
    let newFileRef = doc(collection(db, "files"));
    console.log(newFileRef);
    console.log(newFileRef.id);
    // let thumb = await toBase64String(file);
    // console.log("Thumbnail Generated: ", thumb);
    const newFolder = {
        path: "",
        id: newFileRef.id,
        // size: snapshot.metadata.size,
        modifiedDate: Date.now(),
        modifiedBy: uid,
        createdDate: Date.now(),
        createdBy: uid,
        // value: snapshot.metadata.fullPath,
        // thumbnail: url || "",
        contentType: "folder",
        fileName: newFolderName,
        parentId: "",
        childrenIds: [],
        isDir: true
    };
    let docRef = await setDoc(newFileRef, newFolder);
    console.log("Added Document! -> ", docRef, "New File -> ", newFolder);
    //? Add this object to the files array
    //? Add file reference id to userData file array
    const userDataRef = doc(db, "userData", uid);
    await updateDoc(userDataRef, { files: arrayUnion(newFileRef.id) });
    dispatch({ type: ADD_FOLDER, payload: newFolder })
}