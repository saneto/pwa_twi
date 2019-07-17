import React,{Component} from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import {UserList} from '../User';
import {MessageList} from '../Messages';


class ListeAmisPage extends Component{
	constructor(props)
	{
		super(props);
	}

	render()
	{
		return(
			<AuthUserContext.Consumer>	
				{authUser => (
					<div className="messaging">	
						<div className="inbox_msg">
							< UserList authUser={authUser}/>  
							< MessageList authUser={authUser} /> 
						</div>
					</div>
				)}
			</AuthUserContext.Consumer>
		)
	}
	

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ListeAmisPage);
