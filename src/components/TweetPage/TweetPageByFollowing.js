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
            limit: 15, 

        }
        console.log(this.props)
    }

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
                        let tweetsList = [];
                        Object.keys(tweetsObject).forEach(key => {
                            if(Object.values(this.state.authUser.following).filter(rt => rt === tweetsObject[key].userId).length === 0 ){
                                tweetsList.push({
                                    ...tweetsObject[key],
                                    tid: key,
                                })
                            }  
                        });
                        
                        if(tweetsList.length<this.state.limit){
                            this.setState({
                                limit: this.state.limit+5
                            });
                        }
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
    withRouter,
	withAuthorization(condition),
)(TweetPageByUser);