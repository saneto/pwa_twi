import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import { withFirebase } from '../Firebase';
import {TweetPage} from '../TweetPage';
import { compose } from 'recompose';
import {UserCard} from '../Home';

class TweetPageByUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            authUser : null,
            limit : 5,
            id : this.props.match.params.id,
            loadingUser : false, 
            loadingTweet: false
        }
    }

    componentDidMount() {
        this.onListenForTweets();
        this.onListenForUserDataUpdate();
    };

    onListenForTweets = () => {
        this.setState({ loadingTweet: false });
        this.props.firebase.tweets()
            .orderByChild('username')
            .equalTo(this.state.id)
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
                        loadingTweet: true,
                    });
                } else {
                    this.setState({ tweets: null, loadingTweet: true });
                }
            });    
    };
    onListenForUserDataUpdate=()=>{
        this.props.firebase.users().orderByChild('username').equalTo(this.state.id).on('value', snapshot=>
        {
            this.setState({
                authUser:snapshot.val()[Object.keys(snapshot.val())],
                loadingUser: true,
            });
        });
           
    }

    componentWillUnmount() {
        this.props.firebase.tweets().off();
        this.props.firebase.users().off();
    };

    render(){
        const{loadingUser, loadingTweet, authUser, tweets} = this.state;
        console.log(tweets)
        return(
            <div className="row">

                {loadingUser && 
                    <div className="leftcolumn">
                        <UserCard  {...authUser}/>
                    </div>
                }  

                
                {loadingTweet&&loadingUser  && 
                    <div className="rightcolumn">
                        <TweetPage authUser = {authUser}
                                tweets = {tweets} />
                    </div>
                } 

                {!loadingTweet&&!loadingUser && 
                    <div className="rightcolumn">
                        ...chargement en cours veuillez patienter.    
                    </div>
                } 
            </div>
        )
    }
}

export default compose(
    withFirebase,
    withRouter,
)(TweetPageByUser);