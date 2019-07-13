import React, { Component } from "react"
import { withFirebase } from '../Firebase';
import { AuthUserContext } from '../Session';
import { Paper, TextField, Button, Grid } from '@material-ui/core';
import TweetList from './TweetList';



class TweetPage extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            text: '',
            loading: false,
            tweets: [],
            limit: 5, 
        }
    }
  
    componentDidMount() {
        this.onListenForTweets();
    }

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



    componentWillUnmount() {
        this.props.firebase.tweets().off();
    }

    onCreateTweet = (event, authUser) => {
        this.props.firebase.tweets().push({
            text: this.state.text,
            userId: authUser.uid,
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
        });

        this.setState({ text: '' });

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

    onRemoveTweet = uid => {
        this.props.firebase.tweet(uid).remove();
    };


    onChangeText = event => {
        this.setState({ text: event.target.value });
    };


    render() {
        const { text, tweets, loading } = this.state;
        return (
            <AuthUserContext.Consumer>
                {authUser => (
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
                    
                        <Paper className="">
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                value={text}
                                onChange={this.onChangeText}
                            />
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        type="submit"
                                        onClick={event =>this.onCreateTweet(event, authUser)}
                                    >
                                        Tweet
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </div>
                    


                )}
            </AuthUserContext.Consumer>
        );
    }

}

export default withFirebase(TweetPage) ;
