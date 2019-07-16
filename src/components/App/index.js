import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Header from '../Header';
import SignUpPage from '../Sign/SignUp';
import SignInPage from '../Sign/SignIn';
import PasswordForgetPage from '../Password/PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import ListeAmisPage from '../ListeDesAmis';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import LandingPage from '../Landing';

const App = () => (
	<Router>
		<div>
			<Header />
			<hr />
			<div  className="container">
				<Route exact path={ROUTES.LANDING} component={LandingPage} />
				<Route path={ROUTES.HOME} component={HomePage} />
				<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
				<Route path={ROUTES.SIGN_IN} component={SignInPage} />
				<Route path={ROUTES.LISTEAMIS} component={ListeAmisPage} />
				<Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage}	/>
				<Route path={ROUTES.ACCOUNT} component={AccountPage} />
			</div>
		</div>
	</Router>
);

export default withAuthentication(App);