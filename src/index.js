import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import * as serviceWorker from './serviceWorker';
import App from "../src/components/App"
import Firebase, { FirebaseContext } from './components/Firebase';
import HttpsRedirect from 'react-https-redirect';

ReactDOM.render(
	<HttpsRedirect>
		<FirebaseContext.Provider value={new Firebase()}>
			<App />
		</FirebaseContext.Provider>
	</HttpsRedirect>,
	document.getElementById('root')
);

serviceWorker.register();

