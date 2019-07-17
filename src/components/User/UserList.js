import React, { Component } from 'react';

import { withFirebase } from '../Firebase';

class UserList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			user : props.authUser
		};
	}

	componentDidMount() {
		this.setState({ loading: true });

		this.props.firebase.users().on('value', snapshot => {
			const usersObject = snapshot.val();

			const usersList = Object.keys(usersObject).map(key => ({
				...usersObject[key],
				uid: key,
			}));

			this.setState({
				users: usersList,
				loading: false,
			});
		});
	}

	componentWillUnmount() {
		this.props.firebase.users().off();
	}

	changeColor= uid => {
		
    }

	render() {
		const { users } = this.state;
		return (
			<div className= "inbox_people">
				<div className="headind_srch">
					<div className="recent_heading">
						<h4>Recent</h4>
					</div>
					<div className="srch_bar">
						<div className="stylish-input-group">
							<input type="text" className="search-bar"  placeholder="Search" />
								<span className="input-group-addon">
									<button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
								</span> 
						</div>
					</div>
				</div>
				<div className="inbox_chat">
					{users.map(user => (
						<div key={user.uid} onClick={ () => this.changeColor(user.uid)} className="chat_list">
							<div className="chat_people">
								<div className="chat_img"> <img className="avatar" src={user.src} alt="sunil"/> </div>
								<div className="chat_ib">
									<h5>{user.username} <span className="chat_date"> </span></h5>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default withFirebase(UserList);


/*:



				<ul style={{background_color: '#FFF'}}>
					
				</ul>
			</div>
*/