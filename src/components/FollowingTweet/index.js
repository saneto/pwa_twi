import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import { compose } from 'recompose';
import {TweetPage} from '../TweetPage';
import {UserCard} from '../Home';


class TweetPageByFollowing extends Component{
    constructor(props){
        super(props)
        this.state = {
            authUser : null,
            limit: 15, 
            tweets : [],
            loading : true

        }
        this.state.authUser = this.context;
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
                        let tweetsList = [];
                        Object.keys(tweetsObject).forEach(key => {
                            if(Object.values(this.context.following).filter(rt => rt === tweetsObject[key].userId).length === 0 ){
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
    onListenForUserDataUpdate=()=>{
        this.props.firebase.user(this.context.uid).on('value', snapshot=>
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
        const { tweets, loading} = this.state;
        const authUser =  this.context;
        return(
            <div className="row">
                    <div className="leftcolumn">
                        <UserCard  {...authUser}/>
                    </div>
                    {loading && <div>Loading ...</div>}  
                    <div className="rightcolumn">
                        <TweetPage authUser = {authUser}
                                tweets = {tweets} />
                    </div>
            </div>
        )
    }
}

TweetPageByFollowing.contextType = AuthUserContext;
export default compose(
    withFirebase,
    withRouter,
)(TweetPageByFollowing);