import React, {Component}   from 'react';
import moment from 'moment';

class MessageCard extends Component
{
    render(){
        const isSent = this.props.isSent;
        const dateFormat = moment(this.props.message.createdAt).fromNow();
        return(
            <div className={isSent? "outgoing_msg" : "incoming_msg" }>
                    {isSent? "" : 
                        <div className="incoming_msg_img"> 
                            <img className="avatar" src={this.props.pictureSrc} alt="sunil"/> 
                        </div> }
                <div className={isSent? "sent_msg" : "received_msg" } >
                    <div className={isSent? "" : "received_withd_msg" } >
                        <p>{this.props.message.text}</p>
                        <span className="time_date"> {dateFormat} </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageCard;