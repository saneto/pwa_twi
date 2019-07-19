import React, {Component} from 'react';
import { renderComponent } from 'recompose';

import { withFirebase } from '../Firebase';
class ListOfAllUser extends Component{
    constructor(props){
        super(props);
        console.log(props)
        this.state={
            loading : true,
            users :[],
            limit : 20,
            authUser : this.props.authUser
        }
    }

    componentDidMount() {
        this.onListenForTweets();
    };

    onListenForTweets = () => {

        this.props.firebase.users()
            .limitToLast(this.state.limit)
            .on('value', snapshot => {
                const usersObject = snapshot.val();
                if (usersObject) {
                    const usersList = Object.keys(usersObject).map(key => ({
                        ...usersObject[key],
                        uid: key,
                    }));
                    const arrayFolow=(this.state.authUser.following) ?  Object.values(this.props.authUser.following)  : [];
                    usersList.forEach(value =>{
                            value.isFollow = false;
                            if (arrayFolow.filter(rt => rt === value.uid).length === 0 )
                            {   
                                value.isFollow = true;
                            }
                        }
                    )
                    this.setState({
                        users: usersList,
                        loading: false,
                    });
                } else {
                    this.setState({ users: null, loading: false });
                }

        });
    };
    render(){
        console.log(this.state)
        const {users} = this.state;
        return(
            <div>
                {users.map(user=> (
                        <div>
                            {user.email} /////// ////// 
                        
                        </div>
                    )).reverse()
                }
            </div>
        )
    }

}

export default withFirebase(ListOfAllUser);