import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';

import PasswordChangeForm from '../Password/PasswordChange';
import { UserItem } from '../User';

const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <h1>Account: {authUser.email}</h1>
                <UserItem {...authUser}/>
                <PasswordChangeForm />
            </div>
        )}
     </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);