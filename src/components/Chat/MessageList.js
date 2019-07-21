import React from "react";
import MessageCard from "./MessageCard";

const MessageList = ({
	authUser,
	currentUser,
    messageList,
    onChangeMessage,
    message,
    onSendMessage,
}) => (
	<div className="mesgs">
        <div className="msg_history">
            {messageList.map(message =>(
                <MessageCard key={message.mid} 
                            message = {message}
                            isSent ={authUser.uid===message.sentBy ? true : false}
                            pictureSrc = {currentUser.src}     />
            ))} 
        </div>
        <div className="type_msg">
            <div className="input_msg_write">
                <label>
                    <input  type="text" 
                            className="write_msg" 
                            placeholder="Type a message"
                            value={message}
                            onChange={onChangeMessage} />
                </label>
                <button onClick={onSendMessage}  className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
            </div>
        </div>
    </div>
);




export default MessageList;