import React, { Component } from "react"
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import {  withAuthorization } from '../Session';
//AuthUserContext
class NotificationPage extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            authUser :  this.props.authUser,
            notifications: [],
            limit : 20,
            loading: true,
        }   
    };
  
    componentDidMount() {
        this.onListenForTweets();
    };

    onListenForTweets = () => {
        this.setState({ loading: true });

        this.props.firebase.notification(this.state.authUser.notifId)
            .limitToLast(this.state.limit)
            .on('value', snapshot => {
                const notificationsObject = snapshot.val();
                if (notificationsObject) {
                    const notificationsList = Object.keys(notificationsObject).map(key => ({
                        ...notificationsObject[key],
                        nid: key,
                    }));
                
                    this.setState({
                        notifications: notificationsList,
                        loading: false,
                    });
                } else {
                    this.setState({ notifications: null, loading: false });
                }

        });
    };

    render(){
        const {notifications, loading} = this.state;
        console.log(this.state)
        console.log(this.state)
        return(
            <div>
                {loading && <div>Loading ...</div>}  
                <ul id="myUL">
                    {notifications.map(notification => (
                        <div>
                        <li style={{backgroundColor: "lightblue"}}>{notification.message}</li>
                        <br/></div>
                    )).reverse()}
                </ul>
            </div>
        )
    }

}

const condition = authUser => !!authUser;

export default compose(
    withFirebase,
	withAuthorization(condition),
)(NotificationPage);
