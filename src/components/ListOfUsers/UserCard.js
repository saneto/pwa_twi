import React,{Component} from "react";

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
        
        return(
            <div className="user_list_card"  style={{backgroundColor: !followState? "lightblue" :"lightgreen"  }} >
                <div className="chat_img"> <img className="avatar" src={user.src} alt="sunil"/> </div>
                <div className="chat_ib">
                    <h5>@{user.username}  <button className="signoutbutton" type="button" onClick={this.onFollow}>
                        { followState? "Follow" :"Unfollow"  }
                    </button>
                    </h5>

                    <p>{user.bio}</p>
                </div>
            </div>
        );
    }
}

export default UserCard;  