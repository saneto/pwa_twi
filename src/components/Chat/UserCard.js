import React,{Component} from "react";

class UserCard extends Component
{
    constructor(props)
    {
        super(props)
        this.state={
            user : this.props.user,
            followState : this.props.currentUserId,
        }
    }

    changeDis = ()=>{
        this.props.onChangeChat(this.state.user.uid)
    }

    render()
    {
        const {user} = this.state;
        return(
            <div key={user.uid} value={user.username} onClick={this.changeDis} style={{backgroundColor: this.props.currentUserId===user.uid? "lightblue" :"lightgreen"  }}  className="chat_list">
                <div className="chat_people" >
                    <div className="chat_img"> <img className="avatar" src={user.src} alt="sunil"/> </div>
                    <div className="chat_ib">
                        <h5>{user.username} <span className="chat_date"> </span></h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCard;  