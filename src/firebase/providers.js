import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        // const token = credentials.accessToken;
        const {displayName, email, photoURL, uid}    = result.user;  
        return {
            ok: true,
            displayName, email, photoURL, uid
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailAndPassword = async ({email, password, displayName}) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const {uid, photoURL} = resp.user;
        updateProfile(FirebaseAuth.currentUser, {displayName});
        return {
            ok: true,
            uid,
            displayName,
            email,
            photoURL
        }

    } catch (error) {
        const errorMessage = error.message;
        return {
            ok: false,
            errorMessage : errorMessage
        }
    }

}

export const loginWithEmailAndPassword = async ({email:emails, password}) => {
    try {
        const resp = await signInWithEmailAndPassword( FirebaseAuth, emails, password)
        const {displayName, email, photoURL, uid} = resp.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorMessage = error.message;
        console.log(errorMessage)
        return {
            ok: false,
            errorMessage: errorMessage
        }
    }
}

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
}
