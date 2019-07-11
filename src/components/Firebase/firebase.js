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
        console.log(authUser);
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();
            console.log(this.db);
            console.log(this.auth);
            console.log(snapshot);
            console.log(dbUser);

            // default empty roles
           /* if (!dbUser.roles) {
              dbUser.roles = {};
            }*/

            // merge auth and db user
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

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');

  // *** Message API ***

  message = uid => this.db.ref(`messages/${uid}`);

  messages = () => this.db.ref('messages');
}

export default Firebase;
