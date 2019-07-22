import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";

import { withFirebase } from '../Firebase';
import PasswordChangeForm from '../Password/PasswordChange';


class UserAccount extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          text: '',
          loading: false,
          messages: [],
          limit: 5,
          user : props.authUser,
          avatarURL :  props.authUser.src,
          name : props.authUser.name, 
          username : props.authUser.username, 
          email : props.authUser.email, 
          bio : props.authUser.bio, 
          changePassword: false,
        };
      }
    handleChangeUsername = event => this.setState({ username: event.target.value });
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
    };
    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        this.props.firebase
        .image(this.state.user.uid+'/'+filename)
        .getDownloadURL()
        .then(url => {
            let user = this.state.user;
            this.props.firebase.user(user.uid).child('listPhoto').push({url : url});
            this.props.firebase.user(user.uid).update({src : url});
            this.setState({ avatarURL : url})
        });
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      }; 

    onSubmit = event => {
        const { username,name, email, bio } = this.state;
        let user = this.state.user;
        user.username = username;
        user.name =  name;
        user.email =   email;
        user.bio = bio;
        this.props.firebase.user(this.state.user.uid).set({
            ...this.state.user
        }).then(() => {
            this.setState({  user : user})
        });
        event.preventDefault();
    };

    changePasswordFrom= ()=>{
        if(this.state.changePassword)
        {
            return(<PasswordChangeForm/>)
        }
    }

    changePassword = () =>{
        console.log("ee")
        this.setState({
            changePassword : !this.state.changePassword
        })
    }
    
    render()
    {
        const {user} = this.state;
        return (
            <div>    
                <form onSubmit={this.onSubmit}>
                    <div className="imgcontainer">
                        <img src={this.state.avatarURL} alt="Avatar" className="avatar_cardVersion" />
                    </div>
                    <div  className="container">
                        <label htmlFor="username"><b>Nickname</b>
                        <input name="username"  value={this.state.username}  onChange={this.onChange} type="text"  placeholder="Full Name"   />
                        </label>

                        <label htmlFor="name"><b>Name</b>
                        <input name="name"  value={this.state.name}  onChange={this.onChange} type="text"  placeholder=" Name"   />
                        </label>

                        <label htmlFor="email"><b>Email Address</b>
                        <input name="email" value={this.state.email} onChange={this.onChange} type="text" placeholder="Email Address"  />
                        </label>

                        <label htmlFor="bio"><b>bio</b>
                        <textarea 
                                name='bio'
                                value={this.state.bio}
                                onChange={this.onChange}
                        ></textarea>
                    </label>

                        <label className="open_button_tweet" style={{backgroundColor: 'steelblue', color: 'white', width:'100%' , pointer: 'cursor'}}>
                            Select your awesome avatar
                            <FileUploader
                            hidden
                            accept="image/*"
                            storageRef={this.props.firebase.image(user.uid)}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                            onProgress={this.handleProgress}
                            />
                        </label>
                        <br/>
                        <br/>

                        <button  className="registerbtn"  type="submit">
                            Valider
                        </button>
                    </div>
                </form>
			    <div  className="container">
                    <button onClick={this.changePassword} className="open_button_tweet">
                        Change password
                    </button>
                    {this.changePasswordFrom()}
                </div>
            </div>
        );
    }
}

export default withFirebase(UserAccount);