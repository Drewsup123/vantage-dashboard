import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import store from '../store';
export const POPULATE_FILES = "POPULATE_FILES";
export const ADD_FILE = "ADD_FILE";
export const DELETE_FILE = "DELETE_FILE";

export const populateFiles = (files) => {
    return { type : POPULATE_FILES, payload: files };
}

export const addFile = (file) => {
    return {type: ADD_FILE, payload: file};
}

export const deleteFile = (file) => {
    return {type: DELETE_FILE, payload: file};
}

export const login = (loginInfo) => async(dispatch) => {
    
}