import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';

import UserAccount from "./userAccout";
const AccountPage = () => (
     <AuthUserContext.Consumer> 
      {authUser => (
            <UserAccount authUser = {authUser}/>
        )}
     </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);