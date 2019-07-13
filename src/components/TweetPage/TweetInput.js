import React, {Component} from 'react';


class TweetInput extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            text: '',
            classes : props.classes,
            userNameToReply :'toto',
        }
    };

    onsubmit = event =>{
        this.props.onCreateTweet(event)
        this.setState({ text: '' });
    }

    onChangeText = event =>
    {
        this.setState({ text: event.target.value });
        this.props.onChangeText(event.target.value);
    }
    
    render()
    {
        const { text, userNameToReply  } = this.state;
        return(
            <form onSubmit={this.onsubmit}>
                <textarea className="tweet_text" 
                        name='text'
                        value={text}
                        onChange={this.onChangeText}
                >
                    {(userNameToReply) ? `@${userNameToReply} ` : ''}
                </textarea>
                <div className="tweet_button">
                    <button className="tweet_close" 
                            onClick={this.props.onCloseText} >
                        Close
                    </button>
                    <button className="tweet_send" type='submit'> Send </button>
                </div>
            </form>
        )
    }

}

export default  TweetInput;