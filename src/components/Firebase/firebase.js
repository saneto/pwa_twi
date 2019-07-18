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

		this.auth = app.auth();
		this.db = app.database();
		this.storage = app.storage();
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
