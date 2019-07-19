import React from 'react';

import {Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../Sign/SignOut';
import { AuthUserContext } from '../Session';

const Navigation = () => (
	<header className="root">
		<h1 className="fa fa-twitter">PWA twitter</h1>
		<AuthUserContext.Consumer>
			{authUser => authUser ? (
					<NavigationAuth authUser={authUser} />
				) : (
					<NavigationNonAuth />
				)
			}
		</AuthUserContext.Consumer>
	</header>
);

const NavigationAuth  = ({ authUser }) => (
	
	<ul>
		<li>
			<Link to={ROUTES.HOME}>Home</Link>
		</li>
		<li>
			<Link to={ROUTES.ACCOUNT}>Account</Link>
		</li>
		<li>
			<Link to={ROUTES.LISTEAMIS}>messagerie</Link>
		</li>
		<li>
			<Link to={ROUTES.NOTIFICATION}>Notification</Link>
		</li>
		<li style={{float: 'right'}}>
			<SignOutButton />
		</li>
	</ul>
);

const NavigationNonAuth = () => (
	<ul>
		<li>
			<Link to={ROUTES.SIGN_IN}>Sign In</Link>
		</li>
		<li>
			<Link to={ROUTES.SIGN_UP}>Sign Up</Link>
		</li>
	</ul>
);
	
	
	

export default Navigation;