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
            messages: [],
            authUser :  Object.assign({}, props.authUser, { retweets: [] }, { favorites: [] }),
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


    handleCloseText (event) {
        event.preventDefault();
        this.setState({ openText: false });
    };

    onCloseText ( userNameToReply) {
        this.setState({
            openText: true,
            userNameToReply
        });
    };

    renderTweetInput () {
        if (this.state.openText) {
            return (
                <TweetInput
                    authUser={this.state.authUser}
                    onChangeText={this.onChangeText}
                    onCreateTweet={this.onCreateTweet}
                    text = {this.state.text}
                    onCloseText={this.onCloseText}
                    userNameToReply={this.state.userNameToReply}
                />
            )
        }
    };


    onReTweet = (tweet) =>{
        if(tweet.Listretweets === undefined)
        {
            tweet.Listretweets = [];
        }
        tweet.Listretweets.push({
            text: this.state.text,
            userId: this.state.authUser.uid,
            username: this.state.authUser.email.split('@')[0],
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
            favorites: 0,
            retweets: 0,
        });
        tweet.retweets++;
        this.props.firebase.tweet(tweet.uid).set({
            tweet
        });

    }

    onCreateTweet = (event) => {
        this.props.firebase.tweets().push({
            text: this.state.text,
            userId: this.state.authUser.uid,
            username: this.state.authUser.email.split('@')[0],
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
            favorites: 0,
            retweets: 0,
        });

        this.setState({ text: '' });

        event.preventDefault();
    };

    onEditTweet = (tweet, text) => {
        console.log("sdqsd")
        this.onReTweet(tweet);
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


    onChangeText = value => {
        this.setState({ text: value });
    };


    render() {
        const { text, tweets, loading, authUser } = this.state;
        return (
                <div>
                    <h2>Actu</h2>
                    {loading && <div>Loading ...</div>}   

                    {tweets && (
                        <TweetList
                            authUser={authUser}
                            tweets={tweets}
                            onEditTweet={this.onEditTweet}
                            onRemoveTweet={this.onRemoveTweet}
                        />
                    )}

                    {!tweets && <div>Aucun tweet trouver ...</div>}
                
                    <TweetInput
                        onChangeText={this.onChangeText}
                        onCreateTweet={this.onCreateTweet}
                        text = {text}
                    />
                    
                </div>
        )
    }

}




export default withFirebase(TweetPage) ;
