import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import {Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

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
		const { user } = this.state;
		const userRoute = ROUTES.USER+"/"+user.username;
		return (
			<div className="card">
				<Link to={userRoute}>
					<img src="https://www.pokepedia.fr/images/thumb/2/29/Ouisticram-Pt.png/250px-Ouisticram-Pt.png" alt="singe" style={{ width:'100%' }}/>  
				
				</Link>
				<h1>
					<Link to={userRoute}>
						{user.name} dddd
					</Link>
				</h1>
				<p className="title">
					<Link to={userRoute}>
						@{user.username}
					</Link>
				</p>
				<p>{user.bio} sqdsq defaultsqd qs
				dsq defaultsqdsq dsq
				dsqdsqd
				sqdqsd qsd
				sqdsqdsqd
				 qsdsqd
				 sqdqsdqsdsqd</p>
			</div>			
		);
	}
}

export default withFirebase(UserCard);