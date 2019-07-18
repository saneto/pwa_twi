import React,{Component} from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import {UserList} from '../User';
import {MessageList} from '../Messages';


class ListeAmisPage extends Component{
	constructor(props)
	{
		super(props);
		this.state={
			loading: true
		}
		console.log(props)
		this.props.firebase.tweets().child("listreTweets").orderByChild("tweet").equalTo("azsqdqs").on("value", snapshot => {
			console.log(snapshot.val());
		});
		this.props.firebase.tweets().orderByChild("tweet").on("value", snapshot => {
	console.log(snapshot.val());
});
		this.props.firebase.tweets().orderByChild("listreTweets").equalTo("azsqdqs").on("value", snapshot => {
			console.log(snapshot.val());
		});
	}

	componentDidMount() {
		this.onListenForMessages();
	  }
	
	  onListenForMessages = () => {
		this.setState({ loading: true });
	
		/*this.props.firebase.messages().orderByChild('createdAt').limitToLast(this.state.limit)
		  .on('value', snapshot => {
			const messageObject = snapshot.val();
	
			if (messageObject) {
					const messageList = Object.keys(messageObject).map(key => ({
					...messageObject[key],
					uid: key,
				}));
	
				this.setState({
					messages: messageList,
					loading: false,
				});
				} else {
					this.setState({ messages: null, loading: false });
				}
		  });*/
	  };
	
	onSendMessage= ()=>
	{
		this.props.firebase.messages().push({
			createdAt: this.props.firebase.serverValue.TIMESTAMP,
		});
		this.props.firebase.user(this.state.authUser.uid).orderByChild('chats').push({
			destinataire : this.state.destinataire.uid,
			chatid: "dd",
			createdAt: this.props.firebase.serverValue.TIMESTAMP,
		})
	}

	render()
	{
		return(
			<AuthUserContext.Consumer>	
				{authUser => (
					<div className="messaging">	
						<div className="inbox_msg">
							< UserList authUser={authUser}/>  
							< MessageList authUser={authUser} /> 
						</div>
					</div>
				)}
			</AuthUserContext.Consumer>
		)
	}
	

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ListeAmisPage);
