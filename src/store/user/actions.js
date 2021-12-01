export const LOGOUT = "LOGOUT";
export const LOGIN = "LOGIN";

export const logout = () => {

    return { type : LOGOUT };
}

export const login = (loginInfo) => {
    const { accessToken, displayName, email, phoneNumber, photoUrl, uid } = loginInfo;
    return { type: LOGIN, payload: {
        username: displayName,
        accessToken, email, phoneNumber, photoUrl, uid
    } }
}