import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAwjVARmZAcuDatofWouOIT0A2p15W5j-s",
    authDomain: "twitterlite-e7f00.firebaseapp.com",
    databaseURL: "https://twitterlite-e7f00.firebaseio.com",
    projectId: "twitterlite-e7f00",
    storageBucket: "",
    messagingSenderId: "486222898715",
    appId: "1:486222898715:web:125f3911667a1803"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }


   // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);
   
    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');
}

export default Firebase;