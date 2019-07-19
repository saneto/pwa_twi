import React, {Component} from 'react';
import { AuthUserContext } from '../Session';
import ListOfAllUser from './ListOfAllUser';
import ListOfFollowing from './ListOfFollowing';

import { withFirebase } from '../Firebase';


class ListOfUserPage extends Component{
    constructor(props){
        super(props);
        console.log(this.context);
    }


    render(){
        const authUser = this.context;
        return(
            <div>
               <ListOfAllUser authUser={authUser}/> 
               {/*<ListOfFollower follower={user.followers}/> 
               <ListOfFollowing following={user.following}/> */}
            </div>
        )
    };
}

ListOfUserPage.contextType = AuthUserContext;

export default withFirebase(ListOfUserPage);