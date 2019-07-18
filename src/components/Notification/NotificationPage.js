import React, { Component } from "react"
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import { AuthUserContext, withAuthorization } from '../Session';

class NotificationPage extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = { 
            authUser :  this.props.authUser,
            limit : 20,
        }   
    };
  
    componentDidMount() {
        this.onListenForTweets();
    };

    onListenForTweets = () => {
        this.setState({ loading: true });

        this.props.firebase.notifications()
            .orderByChild('uid')
            .equalTo(this.state.authUser.uid)
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
        const { loading} = this.state;
        console.log(this.state)
        return(
            <div>
                {loading && <div>Loading ...</div>}  
            </div>
        )
    }

}

const condition = authUser => !!authUser;

export default compose(
    withFirebase,
	withAuthorization(condition),
)(NotificationPage);
