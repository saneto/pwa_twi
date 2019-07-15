import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";

import { withFirebase } from '../Firebase';

class UserAccount extends Component
{
    constructor(props) {
        super(props);
        this.state = {
          text: '',
          loading: false,
          messages: [],
          limit: 5,
        };
      }
    handleChangeUsername = event => this.setState({ username: event.target.value });
    handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
    handleProgress = progress => this.setState({ progress });
    handleUploadError = error => {
        this.setState({ isUploading: false });
        console.error(error);
    };
    handleUploadSuccess = filename => {
        this.setState({ avatar: filename, progress: 100, isUploading: false });
        this.props.firebase
        .storage()
        .ref("images")
        .child(filename)
        .getDownloadURL()
        .then(url => this.setState({ avatarURL: url }));
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
 
    render()
    {
        const src="";
        const username="";
        const name="";
        const bio="";
        const email="";
        return (
            <form onSubmit={this.onSubmit}>
                <div className="imgcontainer">
                    <img src={src} alt="Avatar" className="avatar"/>
                </div>
                <div  className="container">
                    <label htmlFor="username"><b>User Name</b></label>
                    <input name="username"  value={username}  onChange={this.onChange} type="text"  placeholder="Full Name"   />

                    <label htmlFor="username"><b>Name</b></label>
                    <input name="username"  value={name}  onChange={this.onChange} type="text"  placeholder=" Name"   />
                    
                    <label htmlFor="email"><b>Email Address</b></label>
                    <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address"  />
                    
                    <label htmlFor="bio"><b>bio</b></label>

                    <textarea className="tweet_text" 
                            name='bio'
                            value={bio}
                            onChange={this.onChange}
                    ></textarea>
                   
                   
                   
                    <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'}}>
                        Select your awesome avatar
                        <FileUploader
                        hidden
                        accept="image/*"
                        storageRef={this.props.firebase.images}
                        onUploadStart={this.handleUploadStart}
                        onUploadError={this.handleUploadError}
                        onUploadSuccess={this.handleUploadSuccess}
                        onProgress={this.handleProgress}
                        />
                    </label>
                </div>
            </form>
        );
    }
}

export default withFirebase(UserAccount);