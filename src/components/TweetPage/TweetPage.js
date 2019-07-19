import React, { Component } from "react"
import { withFirebase } from '../Firebase';
import TweetList from './TweetList';
import TweetInput from "./TweetInput";
import { withAuthorization } from '../Session';
import { compose } from 'recompose';

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
            follow: (this.props.authUser.following) ?  Object.values(this.props.authUser.following)  : [],
            authUser :  this.props.authUser,
        }   
    };
  
    componentDidMount() {
        this.onListenForTweets();
        this.onListenForUserDataUpdate();
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
                            tid: key,
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

    onListenForUserDataUpdate=()=>{
        this.props.firebase.user(this.state.authUser.uid).on('value', snapshot=>
        {
            this.setState({
                authUser:snapshot.val(),
            });
        });
           
    }


    onCloseText = (event) => {
        event.preventDefault()
        this.setState({ openText: false })
      }

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
        if (this.state.likes.filter(rt => rt === tweet.tid).length === 0 )
        {   
            this.props.firebase.tweet(tweet.tid).child('listLike').push({
                userId: user.uid,
                username: user.username,
            });
            tweet.like++;
            this.props.firebase.tweet(tweet.tid).child('like').set(tweet.like);
            this.props.firebase.user(user.uid).child('listLike').push(tweet.tid);
            this.state.likes.push(tweet.tid);
        }
    }

  
    onReTweet = (tweet, user) =>{    
        this.state.tweets.push(tweet)
        if (this.state.retweets.filter(rt => rt === tweet.tid).length === 0 )
        {   
            this.props.firebase.tweet(tweet.tid).child('listreTweets').push({
                text: this.state.text,
                userId: user.uid,
                src: user.src,
                username: user.username,
                createdAt: this.props.firebase.serverValue.TIMESTAMP,
                like: 0,
                retweets: 0,
            });
            tweet.retweets++;
            this.props.firebase.tweet(tweet.tid).child('retweets').set(tweet.retweets);
            this.props.firebase.user(user.uid).child('listRetweet').push(tweet.tid);
            this.state.retweets.push(tweet.tid);
        }
       
    }
    
    onFollow= (followingId, user) =>{
        if (this.state.follow.filter(rt => rt === followingId).length === 0 )
        {   
            this.props.firebase.user(followingId).child('followers').push(user.uid);
            this.props.firebase.user(user.uid).child('following').push(followingId);
            this.props.firebase.notification(user.notifId).push({
                uid : user.uid,
                message : "l'utilisateur vous a follow",
                vue : false,
            })
            this.state.follow.push(followingId);
        }else{
            this.props.firebase.user(followingId).child("followers").once('value', snapshot => {
                snapshot.forEach(child =>{
                    if(child.val()===user.uid)
                    {
                        child.ref.remove();
                    }
                });
            })
            this.props.firebase.user(user.uid).child("following").once('value', snapshot => {
                snapshot.forEach(child =>{
                    if(child.val()===followingId)
                    {
                        child.ref.remove();
                    }
                });
            })
            
            this.state.follow.splice(this.state.follow.indexOf(followingId), 1);
        }
    }

    onCreateTweet = (event) => {
        this.props.firebase.tweets().push({
            text: this.state.text,
            userId: this.state.authUser.uid,
            username: this.state.authUser.username,
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
        const { tid, ...tweetSnapshot } = tweet;

        this.props.firebase.tweet(tweet.tid).set({
            ...tweetSnapshot,
            text,
            editedAt: this.props.firebase.serverValue.TIMESTAMP,
        });
    };    

    componentWillUnmount() {
        this.props.firebase.tweets().off();
    };

    onRemoveTweet = tid => {
        this.props.firebase.tweet(tid).remove();
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
        this.onUpdate();
        event.preventDefault()
        this.setState({ openText: true})
      }


    onUpdate = () =>{
        this.changeStateabc.current.toto();
    }

    render() {
        const { tweets, loading, authUser, follow,name } = this.state;
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
                            name = {name}
                            onEditTweet={this.onEditTweet}
                            onRemoveTweet={this.onRemoveTweet}
                            onReTweet ={this.onReTweet}
                            onaddFavorite={this.onaddFavorite}
                            onReplyTweet={this.onReplyTweet}
                            onFollow = {this.onFollow}
                            follow = {follow}
                        />
                    )}

                    {!tweets && <div>Aucun tweet trouver ...</div>}
                

                    
                </div>
        )
    }

}




const condition = authUser => !!authUser;

export default compose(
    withFirebase,
	withAuthorization(condition),
)(TweetPage);
