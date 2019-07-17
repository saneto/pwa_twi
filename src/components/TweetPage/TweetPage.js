import React, { Component } from "react"
import { withFirebase } from '../Firebase';
import TweetList from './TweetList';
import TweetInput from "./TweetInput";

class TweetPage extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            text: '',
            loading: false,
            tweets: [],
            limit: 15, 
            openText: false,
            userNameToReply: '',
            isReply : false,
            retweets: (this.props.authUser.listRetweet) ?  Object.values(this.props.authUser.listRetweet)  : [],
            likes: (this.props.authUser.listLike) ?  Object.values(this.props.authUser.listLike)  : [],
            authUser :  this.props.authUser,
        }   
        console.log(this.state)  
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

    onaddFavorite = (tweet, user) =>{
        if (this.state.likes.filter(rt => rt === tweet.uid).length === 0 )
        {   
            this.props.firebase.tweet(tweet.uid).child('listLike').push({
                userId: user.uid,
                username: user.username,
            });
            tweet.like++;
            this.props.firebase.tweet(tweet.uid).child('like').set(tweet.like);
            this.props.firebase.user(user.uid).child('listLike').push(tweet.uid);
            this.state.likes.push(tweet.uid);
        }
    }

  
    onReTweet = (tweet, user) =>{    
         if (this.state.retweets.filter(rt => rt === tweet.uid).length === 0 )
         {   
            tweet.retweets++;
            this.props.firebase.tweet(tweet.uid).child('listreTweets').push({
                text: this.state.text,
                userId: user.uid,
                src: user.src,
                username: user.username,
                createdAt: this.props.firebase.serverValue.TIMESTAMP,
                like: 0,
                retweets: 0,
            });
            this.props.firebase.tweet(tweet.uid).child('retweets').set(tweet.retweets);
            this.props.firebase.user(user.uid).child('listRetweet').push(tweet.uid);
            this.state.retweets.push(tweet.uid);
         }
       
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
