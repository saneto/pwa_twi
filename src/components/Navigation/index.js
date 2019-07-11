import React from 'react';

import {Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {
      authUser => authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationAuth />
      )
    }
  </AuthUserContext.Consumer>
);
  
  /*const NavigationAuth  = ({ authUser }) => (
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      {!!authUser.roles[ROLES.ADMIN] && (
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
      )}
      <li>
        <SignOutButton />
      </li>
    </ul>
  );*/
  const NavigationAuth  = () => (
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>

      <li>
        <SignOutButton />
      </li>
    </ul>
  );
  
  

export default Navigation;