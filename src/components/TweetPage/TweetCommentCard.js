import React, {Component} from 'react'
import * as ROUTES from '../../constants/routes';
import {Link } from 'react-router-dom';

class TweetCommentCard extends Component{

    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        const {comment} = this.props
        const userRoute = ROUTES.USERTWEET+"/"+comment.username;
        return(
            <li>
                <div className="comment_body">
                    <div className="replied_to">
                        <p>
                            <span className="user">
                                <Link to={userRoute}>@{comment.username}</Link>
                            </span>
                            {comment.text}
                        </p>
                    </div>
                </div>
            </li>
        )
    }

}

export default TweetCommentCard;