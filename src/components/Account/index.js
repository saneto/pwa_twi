import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';

import UserAccount from "./userAccout";
const AccountPage = () => (
     <UserAccount/>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);