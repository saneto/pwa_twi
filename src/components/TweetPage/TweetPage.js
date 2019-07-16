import React, { Component } from "react"
import { withFirebase } from '../Firebase';
import TweetList from './TweetList';
import TweetInput from "./TweetInput";

class TweetPage extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = { 
            text: '',
            loading: false,
            tweets: [],
            limit: 15, 
            openText: false,
            userNameToReply: '',
            isReply : false,
            authUser :   props.authUser,
        }     
    };
  
    componentDidMount() {
        this.onListenForTweets();
    };

    onListenForTweets = () => {
        this.setState({ loading: true });

        this.props.firebase.tweets()
            .orderByChild('createdAt')
            .limitToLast(this.state.limit)
            .on('value', snapshot => {
                    const tweetsObject = snapshot.val();
                    if (tweetsObject) {
                        const tweetsList = Object.keys(tweetsObject).map(key => ({
                            ...tweetsObject[key],
                            uid: key,
                        }));
                    
                        this.setState({
                            tweets: tweetsList,
                            loading: false,
                        });
                    } else {
                        this.setState({ tweets: null, loading: false });
                    }

            });
    };



    renderTweetInput = () => {
        if (this.state.openText) {
            return (
                <TweetInput
                    authUser={this.state.authUser}
                    onChangeText={this.onChangeText}
                    onCreateTweet={this.onCreateTweet}
                    text = {this.state.text}
                    onCloseText={this.onCloseText}
                    userNameToReply = {this.state.userNameToReply}
                />
            )
        }
    };

    onaddFavorite = (tweet) =>{
        let user = this.state.authUser;
        if(user.likes === undefined)
        {
            user.likes = [];
        }
        if (user.likes.filter(rt => rt === tweet.uid).length >0 )
        {
            return;
        }
        user.likes.push(tweet.uid);
        if(tweet.listFav === undefined)
        {
            tweet.listFav = [];
        }
        tweet.listFav.push({
            userId: user.uid,
            username: user.username,
        });
        tweet.like++;
        this.props.firebase.tweet(tweet.uid).set({
            ...tweet
        });
    }

  
    onReTweet = (tweet) =>{    
        let user = this.state.authUser;
        if(user.retweets === undefined)
        {
            user.retweets = [];
        } 
        if (user.retweets.filter(rt => rt === tweet.uid).length >0 )
        {
            return;
        }
        user.retweets.push(tweet.uid);
        if(tweet.listreTweets === undefined)
        {
            tweet.listreTweets = [];
        } 
        tweet.listreTweets.push({
            text: this.state.text,
            userId: user.uid,
            src: user.src,
            username: user.username,
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
            like: 0,
            retweets: 0,
        });
        tweet.retweets++;
        this.props.firebase.tweet(tweet.uid).set({
            ...tweet
        });
        this.props.firebase.user(tweet.uid).set({
            ...user
        });

    }

    onCreateTweet = (event) => {
        this.props.firebase.tweets().push({
            text: this.state.text,
            userId: this.state.authUser.uid,
            username: this.state.authUser.email.split('@')[0],
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
            src: this.state.authUser.src,
            like: 0,
            retweets: 0,
            listreTweets:[],
            listFav:[],
        });

        this.setState({ text: '', openText: false });
        event.preventDefault();
    };

    onEditTweet = (tweet, text) => {
        const { uid, ...tweetSnapshot } = tweet;

        this.props.firebase.tweet(tweet.uid).set({
            ...tweetSnapshot,
            text,
            editedAt: this.props.firebase.serverValue.TIMESTAMP,
        });
    };    

    componentWillUnmount() {
        this.props.firebase.tweets().off();
    };

    onRemoveTweet = uid => {
        this.props.firebase.tweet(uid).remove();
    };

    onReplyTweet = (userNameToReply) =>{
        this.setState({ 
            openText: true,
            userNameToReply
        });
    }

    onChangeText = value => {
        this.setState({ text: value });
    };
    onOpenText  = event =>{
        event.preventDefault()
        this.setState({ openText: true })
      }

    render() {
        const { tweets, loading, authUser } = this.state;
        return (
                <div>
                    {loading && <div>Loading ...</div>}  
                    <button onClick={this.onOpenText} className="open_button_tweet">
                        <span className='fa fa-lg fa-edit'></span> Tweet!
                    </button>
                    {this.renderTweetInput()}

                    {tweets && (
                        <TweetList
                            authUser={authUser}
                            tweets={tweets}
                            onEditTweet={this.onEditTweet}
                            onRemoveTweet={this.onRemoveTweet}
                            onReTweet ={this.onReTweet}
                            onaddFavorite={this.onaddFavorite}
                            onReplyTweet={this.onReplyTweet}
                        />
                    )}

                    {!tweets && <div>Aucun tweet trouver ...</div>}
                

                    
                </div>
        )
    }

}




export default withFirebase(TweetPage) ;
