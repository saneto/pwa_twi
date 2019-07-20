import React, {Component}   from 'react';

class MessageCard extends Component
{
    render(){
        const isSent = this.props.isSent;
        return(
            <div className={isSent? "outgoing_msg" : "incoming_msg" }>
                    {isSent? "" : 
                        <div className="incoming_msg_img"> 
                            <img className="avatar" src={this.props.pictureSrc} alt="sunil"/> 
                        </div> }
                <div className={isSent? "sent_msg" : "received_msg" } >
                    <div className={isSent? "" : "received_withd_msg" } >
                        <p>{this.props.message.text}</p>
                        <span className="time_date"> {this.props.message.createdAt} 10 </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageCard;