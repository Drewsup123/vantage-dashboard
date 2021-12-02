import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../Firebase';
import store from '../store';
export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";

export const logout = () => {

    return { type : LOGOUT };
}

export const login = (loginInfo) => async(dispatch) => {
    const { accessToken, displayName, email, phoneNumber, photoUrl, uid } = loginInfo;
    let loginData = {
        username: displayName, 
        email, 
        phoneNumber: phoneNumber ? phoneNumber : null, 
        photoUrl: photoUrl ? photoUrl : null , 
        uid, 
        files: []
    };
    const docRef = doc(db, "userData", uid);
    const userInfo = await getDoc(docRef);
    if(userInfo.exists()){
        console.log("User Data: ", userInfo.data());
        loginData = {...loginData, ...userInfo.data()};
    }else{
        await setDoc(doc(db, "userData", uid), {...loginData}, {merge: true});
    }
    //? Adding access token back to save to redux
    dispatch({ type: LOGIN, payload: {...loginData, accessToken} }) 
}