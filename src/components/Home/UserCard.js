import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import {Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { Grid } from '@material-ui/core';

class UserCard extends Component {
	
	constructor(props) {
		super(props);		
		this.state = {
			user: this.props,
		};   
	}
	
	onSendPasswordResetEmail = () => {
		this.props.firebase.doPasswordReset(this.state.user.email);
	};

	render() {
		const { user } = this.state ||  [];
		let  listPhoto = (user.listPhoto) ?  Object.values(user.listPhoto)  : [] ;
		const userRoute = ROUTES.USER+"/"+user.username;
		return (
			<div className="card">
				<Link to={ROUTES.ACCOUNT}>
					<img src={user.src} alt="singe" style={{ width:'100%' }}/>  
				</Link>
				<h1>
					<Link to={userRoute}>
						{user.name}
					</Link>
				</h1>
				<p className="title">
					<Link to={userRoute}>
						@{user.username}
					</Link>
				</p>
				<p>{user.bio}</p>
				<Grid container>
					{listPhoto.map(message => (
						<Grid item xs={4} key={message.url}>
							<img src={message.url} alt="User_card_P" className="user_card_P" />   
						</Grid>	
					))}			
				</Grid>
			</div>			
		);
	}
}

export default withFirebase(UserCard);