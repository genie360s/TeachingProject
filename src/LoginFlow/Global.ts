import firebase from "firebase/compat";
import ConfirmationResult = firebase.auth.ConfirmationResult;
import RecaptchaVerifier = firebase.auth.RecaptchaVerifier;

declare global {

    interface Window {
        confirmationResult: ConfirmationResult;
        recaptchaVerifier: RecaptchaVerifier;
    }
}
