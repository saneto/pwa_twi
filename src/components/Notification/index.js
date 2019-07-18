import NotificationPage from "./NotificationPage";
import { AuthUserContext } from '../Session';
import React from 'react';

const Notification = () => (
	<div>
		<AuthUserContext.Consumer>
			{authUser => (
                <NotificationPage authUser={authUser}/>
			)}
		</AuthUserContext.Consumer>
			
	</div>
);

export default Notification;
