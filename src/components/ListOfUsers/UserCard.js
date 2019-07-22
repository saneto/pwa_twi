import React,{Component} from "react";

import {Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
class UserCard extends Component
{
    constructor(props)
    {
        super(props)
        this.state={
            user : this.props.user,
            followState : this.props.user.isFollow,
        }
    }

    onFollow = () =>{
        this.setState({
            followState:!this.state.followState
        })
        this.props.onFollow(this.state.user, this.state.followState)
    }

    render()
    {
        const {user, followState} = this.state;
        const userRoute = ROUTES.PATHUSERTWEET+"/"+user.username;
        return(
            <div className="user_list_card"  style={{backgroundColor: !followState? "lightblue" :"lightgreen"  }} >
                <div className="chat_img"> 
                    <Link to={userRoute}>
                        <img className="avatar" src={user.src} alt="sunil"/> 
                    </Link>
                </div>
                <div className="chat_ib">
                    <h5>
                        <Link to={userRoute}>
                            @{user.username} 
                        </Link>
                    
                        <button className="signoutbutton" type="button" onClick={this.onFollow}>
                            { followState? "Follow" :"Unfollow"  }
                        </button>

                        <p>
                            {user.bio}
                        </p>
                    </h5>

                    <p>{user.bio}</p>
                </div>
            </div>
        );
    }
}

export default UserCard;  