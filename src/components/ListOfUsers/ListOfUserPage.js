import React, {Component} from 'react';
import { AuthUserContext } from '../Session';
import ListOfAllUser from './ListOfAllUser';

import { withFirebase } from '../Firebase';


class ListOfUserPage extends Component{
    render(){
        const authUser = this.context;
        return(
            <div>
               <ListOfAllUser authUser={authUser}/> 
            </div>
        )
    };
}

ListOfUserPage.contextType = AuthUserContext;

export default withFirebase(ListOfUserPage);