import React from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import {UserList} from '../User';


const ListeAmisPage = () => (
  <AuthUserContext.Consumer>
      
      {authUser => (
            < UserList authUser/>
        )}
  </AuthUserContext.Consumer>
  
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ListeAmisPage);