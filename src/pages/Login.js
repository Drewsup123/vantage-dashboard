import React from 'react';
import { connect } from 'react-redux';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { login } from '../store/user/actions';

const Login = (props) => {
    const { login } = props;
    const loginWithGoogle = (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(token, user);
            login(user);
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorCode, errorMessage, email, credential);
        });
    }

    return (
        <div className="grid">
            <div className="col-12">
                <h1>Login</h1>
                <h1>Hello World!</h1>
                <button onClick={loginWithGoogle}>Login With Google!</button>
            </div>
        </div>
    );
}

const mapStateToProps = () => ({});

export default connect(mapStateToProps, { login })(Login);