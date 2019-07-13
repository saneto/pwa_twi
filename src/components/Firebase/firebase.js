import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyAe7hufjDHedAdKMIeT_MhjN_Oc1X34HoA",
    authDomain: "superp2-8a0d2.firebaseapp.com",
    databaseURL: "https://superp2-8a0d2.firebaseio.com",
    projectId: "superp2-8a0d2",
    storageBucket: "",
    messagingSenderId: "499719922525",
    appId: "1:499719922525:web:cf330b8bb5ce987b"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.serverValue = app.database.ServerValue;

    this.auth = app.auth();
    this.db = app.database();

  }


  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);


  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);


  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

    



  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');
  
  tweet = uid => this.db.ref(`tweets/${uid}`);

  tweets = () => this.db.ref('tweets');
}

export default Firebase;
