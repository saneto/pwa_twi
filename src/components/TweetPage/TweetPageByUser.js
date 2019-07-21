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
    }
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