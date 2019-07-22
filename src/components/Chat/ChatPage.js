import React, {Component} from 'react'
import {withFirebase} from '../Firebase'
import UserList from './UserList';
import MessageList from './MessageList';
import { AuthUserContext, withAuthorization } from '../Session';

import { compose } from 'recompose';

class ChatPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            messageList : [],
            limit : 20,
            users:[],
            currentUser:{},
            message:'',
            chatId:'',
            messagelimit: 30,
            oldchatId:''
        }
    }

    componentDidMount() {
        this.onListenForUsers();
	}

	componentWillUnmount() {
		this.props.firebase.users().off();
		this.props.firebase.chats().off();
	}

	onListenForUsers = () => {
        this.props.firebase.users()
            .limitToLast(this.state.limit)
            .once('value', snapshot => {
                const usersObject = snapshot.val();    
            this.convertFirebaseObjectToArray(usersObject)
        }).then(()=>{
            this.checkIfChatExist();
            // eslint-disable-next-line 
            const chatid = Object.values(this.context.chat).find(element => {
                if(this.state.currentUser.uid===element.targetId)
                {   
                    return element; 
                }
            })
            this.setState({
                chatId: chatid.chatId
            });
        }).then(() => {
            this.onListenForMessage()
        });        
    };


    checkIfChatExist = ()=>{
        if(this.context.chat === undefined || Object.values(this.context.chat).filter(rt => rt.targetId === this.state.currentUser.uid).length === 0 ){
            let chatid = this.props.firebase.chats().push().key;
            this.props.firebase.user(this.context.uid).child("chat").push({
                chatId :chatid,
                targetId : this.state.currentUser.uid
            })
            this.props.firebase.user(this.state.currentUser.uid ).child("chat").push({
                chatId :chatid,
                targetId : this.context.uid
            })
            this.context.chat = {
                chatid :{
                    chatId : chatid,
                    targetId : this.state.currentUser.uid
                }
            };
        }
    }

    onListenForMessage = () => {
        this.props.firebase.chat(this.state.chatId)
            .limitToLast(this.state.messagelimit)
            .on('value', snapshot => {
                if(snapshot.key === this.state.chatId)
                {
                    const chatObject = snapshot.val();    
                    if (chatObject) {
                        const messageList = Object.keys(chatObject).map(key => ({
                            ...chatObject[key],
                            mid: key,
                        }));
                        this.setState({
                            messageList : messageList,
                        });
                    } else {
                        this.setState({ messageList : [] });
                    }
                }
            });    
    };

    
	onSearch= ()=>{
        this.props.firebase.users().orderByChild('username').equalTo(this.state.text).once("value", snapshot=>{
            const usersObject = snapshot.val();
            this.convertFirebaseObjectToArray(usersObject)
        }).then(() => {
            this.props.firebase.users().off();
        });
    }
    

	
	convertFirebaseObjectToArray = usersObject =>
    {
        if (usersObject) {
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            const arrayFolow=(this.context.following) ?  Object.values(this.context.following)  : [];
            usersList.forEach(value =>{
                    value.isFollow = false;
                    if (arrayFolow.filter(rt => rt === value.uid).length === 0 )
                    {   
                        value.isFollow = true;
                    }
                }
            )
            if(usersList.length > 0){
                this.setState({
                    users: usersList,
                    currentUser:usersList[0],
                    currentUserId: usersList[0].uid
                });
            }else{
                this.setState({
                    users: usersList
                });
            }
           
        } else {
            this.setState({ users: [], currentUser:{} });
        }
    }
    onChangeText = value =>{
        this.setState({ text: value.target.value });
        if( value.target.value ==='')
        {
            this.onListenForUsers();
        }
    }

    onChangeMessage = value =>{
        this.setState({ message: value.target.value });
    }

    onSendMessage = ()=>{
        this.props.firebase.chat(this.state.chatId).push({
            text : this.state.message,
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
            sentBy : this.context.uid
        });
    }

    
    onChangeChat = (uid) =>{
        this.props.firebase.chat(this.state.currentUserId).off('value');
        this.setState({ currentUserId: uid});
        this.props.firebase.user(uid)
            .once('value', snapshot => {
                const userObject = snapshot.val();    
                if (userObject) {
                    this.setState({
                        currentUser:userObject,
                        currentUserId: userObject.uid
                    });
                   
                } else {
                    this.setState({
                        currentUser: this.state.usersList[0],
                        currentUserId:  this.state.usersList[0].uid
                    });
                }
        }).then(()=>{
            this.checkIfChatExist();
            // eslint-disable-next-line 
            const chatid = Object.values(this.context.chat).find(element => {
                if(this.state.currentUser.uid===element.targetId)
                {   
                    return element; 
                }
            })
            this.setState({
                chatId: chatid.chatId
            });
        }).then(() => {
            this.onListenForMessage()
        });       
    }

    render(){

        return(
            <div className="messaging">	
				<div className="inbox_msg">
					< UserList 	users = {this.state.users}
								onSearch = {this.onSearch}
                                authUser = {this.context}
                                currentUserId ={this.state.currentUserId} 
                                onChangeText = {this.onChangeText}
                                onChangeChat = {this.onChangeChat}
					/>  
                    < MessageList   messageList = {this.state.messageList}
                                    authUser = {this.context}
                                    currentUser = {this.state.currentUser}
                                    onChangeMessage={this.onChangeMessage}
                                    message = {this.state.message}
                                    onSendMessage = {this.onSendMessage}/>
				</div>
			</div>
        )
    }
}


ChatPage.contextType = AuthUserContext;
const condition = authUser => !!authUser;
export default compose(withFirebase,
                    withAuthorization(condition))(ChatPage)