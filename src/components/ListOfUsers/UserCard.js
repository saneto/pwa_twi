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
            <div>
                <div style={{backgroundColor: !followState? "lightblue" :"lightgreen"  }} className="chat_list">
                    <div className="chat_people">
                        <div className="chat_img"> <img className="avatar" src={user.src} alt="sunil"/> </div>
                        <div className="chat_ib">
                            <h5>{user.username} 
                            <p>{user.bio}</p>
                            </h5>
                            <button className="signoutbutton" type="button" onClick={this.onFollow}>
                                { followState? "Follow" :"Unfollow"  }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCard;  