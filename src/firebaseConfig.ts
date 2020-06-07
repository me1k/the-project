import firebase from 'firebase'

export const config = {
  apiKey: 'AIzaSyCO5IGoiX0dFurcZP3jwaJr2EP_qbpOj9Q',
  authDomain: 'the-project-4ab27.firebaseapp.com',
  databaseURL: 'https://the-project-4ab27.firebaseio.com'
};

export const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false
  }
};


