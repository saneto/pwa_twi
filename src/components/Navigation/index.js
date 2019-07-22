import React from 'react';

import {Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from '../Sign/SignOut';
import { AuthUserContext } from '../Session';

const Navigation = () => (
	
		<AuthUserContext.Consumer>
			{authUser => authUser ? (
					<NavigationAuth />
				) : (
					<NavigationNonAuth />
				)
			}
		</AuthUserContext.Consumer>
);

const NavigationAuth  = () => (
	
	<div className="navbar">
		
			<Link to={ROUTES.HOME}>Home</Link>

			<Link to={ROUTES.FOLLOWINGTWEET}>Abonnement</Link>
	
			<Link to={ROUTES.ACCOUNT}>Account</Link>
		
			<Link to={ROUTES.LISTEAMIS}>messagerie</Link>
		
			<Link to={ROUTES.NOTIFICATION}>Notification</Link>
		
			<Link to={ROUTES.LISTOFUSER}>Listes des utilisateurs</Link>
		
		
			<Link className="right" to="#"><SignOutButton /></Link>
	</div>
);

const NavigationNonAuth = () => (

	<div className="navbar">
		<Link className="right" to={ROUTES.SIGN_IN}>Sign In</Link>
		<Link className="right" to={ROUTES.SIGN_UP}>Sign Up</Link>
	</div>
);
	
	
	

export default Navigation;