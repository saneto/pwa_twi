import React , {Component} from 'react'
import {Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

class NotificationCard extends Component{

    render(){
        const {notification} = this.props;
        const userRoute = ROUTES.PATHUSERTWEET+"/"+notification.username;
        return(
            <li>    
                <Link to={userRoute}>
                    {notification.message}<span className="close">&times;</span>
                </Link>
            </li>
        )
    }
}

export default NotificationCard;