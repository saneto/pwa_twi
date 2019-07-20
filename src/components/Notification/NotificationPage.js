import React, { Component } from "react"
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import {  withAuthorization } from '../Session';
import NotificationCard from './NotificationCard';

class NotificationPage extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            authUser :  this.props.authUser,
            notifications: [],
            limit : 20,
            loading: true,
        }   
        
		this.props.firebase.notifications().off();
    };
  
    componentDidMount() {
        this.onListenForTweets();
    };

    componentWillUnmount() {
		this.props.firebase.notifications().off();
	}

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
        return(
            <div>
                {loading && <div>Loading ...</div>}  
                <ul >
                    {notifications ? notifications.map(notification => (
                        <NotificationCard key={notification.nid} notification={notification}/>
                    )).reverse() : <div>Vous n'avez aucune notification</div>}
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
