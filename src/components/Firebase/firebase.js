import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';


const config = {
	apiKey: "AIzaSyAe7hufjDHedAdKMIeT_MhjN_Oc1X34HoA",
	authDomain: "superp2-8a0d2.firebaseapp.com",
	databaseURL: "https://superp2-8a0d2.firebaseio.com",
	projectId: "superp2-8a0d2",
	storageBucket: "superp2-8a0d2.appspot.com",
	messagingSenderId: "499719922525",
	appId: "1:499719922525:web:cf330b8bb5ce987b"
};

class Firebase {
	constructor() {
		app.initializeApp(config);

		this.serverValue = app.database.ServerValue;
		//this.emailAuthProvider = app.auth.EmailAuthProvider;

		this.auth = app.auth();
		this.db = app.database();
		this.storage = app.storage();


		/*this.googleProvider = new app.auth.GoogleAuthProvider();*/

	}


	doCreateUserWithEmailAndPassword = (email, password) =>
		this.auth.createUserWithEmailAndPassword(email, password);

	doSignInWithEmailAndPassword = (email, password) =>
		this.auth.signInWithEmailAndPassword(email, password);

	doSignOut = () =>{
		this.users().off();
		this.auth.signOut();
	} 

	doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

	doPasswordUpdate = password =>
		this.auth.currentUser.updatePassword(password);

	onAuthUserListener = (next, fallback) =>
		this.auth.onAuthStateChanged(authUser => {
			if (authUser) {
				this.user(authUser.uid)
					.on('value', snapshot => {
						const dbUser = snapshot.val();
						authUser = {
							uid: authUser.uid,
							email: authUser.email,
							emailVerified: authUser.emailVerified,
							...dbUser,
						};
						next(authUser);
					});
			} else {
				fallback();
			}
		});




	doSendEmailVerification = () =>
		this.auth.currentUser.sendEmailVerification({
		  url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
		});

	
	doSignInWithGoogle = () =>
		this.auth.signInWithPopup(this.googleProvider);
	

	user = uid => this.db.ref(`users/${uid}`);

	users = () => this.db.ref('users');

	message = id => this.db.ref(`messages/${id}`);

	messages = () => this.db.ref('messages');
	
	tweet = id => this.db.ref(`tweets/${id}`);

	tweets = () => this.db.ref('tweets');

	chat = id => this.db.ref(`chats/${id}`);

	chats = () => this.db.ref(`chats`);

	notification = id => this.db.ref(`notifications/${id}`);

	notifications = () => this.db.ref(`notifications`);

	image = id => this.storage.ref(`images/${id}`);

	images = () => this.storage.ref(`images`);
}

export default Firebase;
