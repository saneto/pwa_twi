import React from 'react';
import TweetPage from '../TweetPage';
import { compose } from 'recompose';
import { AuthUserContext } from '../Session';

import { withAuthorization } from '../Session';
const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <AuthUserContext.Consumer>
                {authUser => (
                    <TweetPage authUser={authUser} />
                    )}
                    </AuthUserContext.Consumer>
        
    </div>
);

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(HomePage);

