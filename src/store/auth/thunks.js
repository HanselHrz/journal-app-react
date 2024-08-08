import { loginWithEmailAndPassword, logoutFirebase, registerUserWithEmailAndPassword, signInWithGoogle } from '../../firebase/providers';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = ( email, password) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
    };
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage))
        dispatch(login(result));
    };
}

export const stratCreateUserWithEmailAndPassword = ({email, password, displayName}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const {ok, uid, photoURL} = await registerUserWithEmailAndPassword({email, password, displayName});
        if (!ok) return dispatch(logout({errorMessage: 'Error al crear la cuenta'}));
        dispatch(login({uid, email, displayName, photoURL}));
    };
}


export const startLoginWithEmailAndPassword = ({email, password}) => {
    return async (dispatch) => {
        dispatch(checkingCredentials());
        const result = await loginWithEmailAndPassword({email, password});
        if (!result.ok) return dispatch(logout({errorMessage: result.errorMessage}));
        dispatch(login(result));
    };
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();
        dispatch(logout());
    };
}
