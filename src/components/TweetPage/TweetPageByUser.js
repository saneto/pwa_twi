import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import { withFirebase } from '../Firebase';
//import TweetList from './TweetList';
//import TweetInput from "./TweetInput";
import { withAuthorization } from '../Session';
import { compose } from 'recompose';


class TweetPageByUser extends Component{
    constructor(props){
        super(props)
        this.state = {
            authUser : this.props.authUser,
            limit : 5,
            id : this.props.match.params.id
        }
    }

    componentDidMount() {
        this.onListenForTweets();
    };

    onListenForTweets = () => {
        this.setState({ loading: true });
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
                        console.log(tweetsList)
                        this.setState({
                            tweets: tweetsList,
                            loading: false,
                        });
                    } else {
                        this.setState({ tweets: null, loading: false });
                    }
            });    
    };

    componentWillUnmount() {
        this.props.firebase.tweets().off();
    };

    render(){
        return(
            <div></div>
        )
    }
}

const condition = authUser => !!authUser;

export default compose(
    withFirebase,
	withAuthorization(condition),
    withRouter,
)(TweetPageByUser);