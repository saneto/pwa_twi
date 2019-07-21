import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import UserCard from './UserCard';

class ListOfAllUser extends Component{
    constructor(props){
        super(props);
        this.state={
            loading : true,
            users :[],
            limit : 20,
            text:'',
            authUser : this.props.authUser,
            follow: (this.props.authUser.following) ?  Object.values(this.props.authUser.following)  : []
        }
    }

    componentDidMount() {
        this.onListenForUsers();
    };

    
    componentWillUnmount() {
        this.props.firebase.users().off();
    };

    onListenForUsers = () => {
        this.props.firebase.users()
            .limitToLast(this.state.limit)
            .on('value', snapshot => {
                const usersObject = snapshot.val();    
            this.convertFirebaseObjectToArray(usersObject)
        });        
    };

    onFollow= (followingUser, isFollow) =>{
        const user = this.state.authUser;
        if (isFollow)
        {   
            this.props.firebase.user(followingUser.uid).child('followers').push(user.uid);
            this.props.firebase.user(user.uid).child('following').push(followingUser.uid);
            this.props.firebase.notification(followingUser.notifId).push({
                uid : user.uid,
                message : "l'utilisateur "+ user.username+" vous a follow",
                vue : false,
            })
            this.state.follow.push(followingUser.uid);
        }else{
            this.props.firebase.user(followingUser.uid).child("followers").once('value', snapshot => {
                snapshot.forEach(child =>{
                    if(child.val()===user.uid)
                    {
                        child.ref.remove();
                    }
                });
            })
            this.props.firebase.user(user.uid).child("following").once('value', snapshot => {
                snapshot.forEach(child =>{
                    if(child.val()===followingUser.uid)
                    {
                        child.ref.remove();
                    }
                });
            })
            this.state.follow.splice(this.state.follow.indexOf(followingUser.uid), 1);
        }
    }

    convertFirebaseObjectToArray = usersObject =>
    {
        if (usersObject) {
            const usersList = Object.keys(usersObject).map(key => ({
                ...usersObject[key],
                uid: key,
            }));
            const arrayFolow=(this.state.authUser.following) ?  Object.values(this.props.authUser.following)  : [];
            usersList.splice(this.state.authUser,1)
            usersList.forEach(value =>{
                    value.isFollow = false;
                    if (arrayFolow.filter(rt => rt === value.uid).length === 0 )
                    {   
                        value.isFollow = true;
                    }
                }
            )
            this.setState({
                users: usersList,
                loading: false,
            });
        } else {
            this.setState({ users: null, loading: false });
        }
    }



    onSearch= ()=>{
        this.props.firebase.users().orderByChild('username').equalTo(this.state.text).once("value", snapshot=>{
            const usersObject = snapshot.val();
            this.convertFirebaseObjectToArray(usersObject)
        }).then(() => {
            this.props.firebase.users().off();
        });
    }
    onChangeText = value =>{
        this.setState({ text: value.target.value });
        if( value.target.value ==='')
        {
            this.onListenForTweets();
        }
    }

    render(){
        const {users, text} = this.state;
        return(
            <div className= "inbox_user_list">
                <div className="headind_srch">
					<div className="recent_heading">
						<h4>Recent</h4>
					</div>
					<div className="srch_bar">
						<div className="stylish-input-group">
                            <input type="text" className="search-bar"  
                            name='text'
                                     value={text}
                                onChange={this.onChangeText}
                         placeholder="Search" />
								<span className="input-group-addon">
									<button onClick={this.onSearch} type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
								</span> 
						</div>
					</div>
				</div>
                <div>
                    {users.map(user=> (    
                        <div key={user.uid}  >
                            {user.uid!==this.state.authUser.uid? 
                                <UserCard   
                                            user={user}
                                            onFollow={this.onFollow}/> : ''}
                        </div>))
                    }
                </div>
            </div>
        )
    }

}

export default compose( withFirebase,
	withRouter,
)(ListOfAllUser);
