import React from 'react';
import TweetPage from '../TweetPage';
import { compose } from 'recompose';
import { AuthUserContext } from '../Session';
import { Grid } from '@material-ui/core';
import { withAuthorization } from '../Session';
import { UserCard } from '../User';
const HomePage = () => (
	<div>
		<AuthUserContext.Consumer>
			{authUser => (
				<Grid container>
					<Grid item xs={3}>
					 	<UserCard {...authUser}/>
					</Grid>
					<Grid item xs={9}>
						<TweetPage authUser = {authUser} />
					</Grid>					
				</Grid>
			)}
		</AuthUserContext.Consumer>
			
	</div>
);

const condition = authUser => !!authUser;

export default compose(
	withAuthorization(condition),
)(HomePage);

