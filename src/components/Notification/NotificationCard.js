import React , {Component} from 'react'

class NotificationCard extends Component{

    render(){
        const {notification} = this.props;
        return(
            <li>{notification.message}<span class="close">&times;</span></li>
        )
    }
}

export default NotificationCard;