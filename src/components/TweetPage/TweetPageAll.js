import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import { withFirebase } from '../Firebase';
import TweetPage from './TweetPage'
import { compose } from 'recompose';


class TweetPageALL extends Component{
    constructor(props){
        super(props)
        this.state = {
            authUser : this.props.authUser,
            limit : 20,
            id : this.props.match.params.id
        }
    }

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

    componentWillUnmount() {
        this.props.firebase.tweets().off();
        this.props.firebase.users().off();
    };

    render(){
        return(
            <div className="rightcolumn">
                <TweetPage  authUser = {this.state.authUser}
                            tweets = {this.state.tweets} />
            </div>	
        )
    }
}


export default compose(
    withFirebase,
    withRouter,
)(TweetPageALL);