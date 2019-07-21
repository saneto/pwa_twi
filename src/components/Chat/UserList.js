import React,{Component} from 'react';
import UserCard from './UserCard';

class UserList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user : props.authUser,
			text :''
		};
	}

	onChangeText = value =>{
        this.setState({ text: value.target.value });
		this.props.onChangeText(value);
	}
	
	render() {
		const {text } = this.state;
		const {users} = this.props;
		return (
			<div className= "inbox_people">
				<div className="headind_srch">
					<div className="recent_heading">
						<h4>Recent</h4>
					</div>
					<div className="srch_bar">
						<div className="stylish-input-group">
							<label>
								<input 	type="text" 
										className="search-bar"  
										name='text'
										value={text}
										onChange={this.onChangeText}
										placeholder="Search" />
							</label>
							<span className="input-group-addon">
								<button onClick={this.props.onSearch} type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
							</span> 
						</div>
					</div>
				</div>
				<div className="inbox_chat">
					{users.map(user => (
						<div key={user.uid}>	
							{user.uid!==this.state.user.uid? <UserCard  authUser={this.state.user} user = {user} onChangeChat={this.props.onChangeChat} currentUserId = {this.props.currentUserId}/> : ''}
						</div>
					))}
				</div>
			</div>
		);
	}
}

export default UserList;