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
          user : props.authUser,
          avatarURL :  props.authUser.src
        };


            this.props.firebase
            .image(this.state.user.uid).listAll().then(function(res) {
                console.log(res)
                res.prefixes.forEach(function(folderRef) {
                    console.log(folderRef)
                });
                res.items.forEach(function(itemRef) {
                  // All the items under listRef.
                  console.log(itemRef.location)
                  console.log(itemRef.location.bucketOnlyServerUrl())
                  //console.log(itemRef.location.path())                  
                  console.log(itemRef.location.fullServerUrl())
                });
              }).catch(function(error) {
                // Uh-oh, an error occurred!
              });
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
            user.src = url;
            this.props.firebase.user(user.uid).set({
                ...user
            });
            this.setState({ avatarURL : url})

        });

        this.props.firebase
        .image(this.state.user.uid)
        .listFiles()
        .then(url => {
            console.log(url)
        });
    };

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
 
    render()
    {
        const {user} = this.state;

        /*
            className="avatar"  à garder pour les images miniature 
        */
        return (
            <form onSubmit={this.onSubmit}>
                <div className="imgcontainer">
                    <img src={this.state.avatarURL} alt="Avatar" className="avatar_cardVersion" />
                </div>
                <div  className="container">
                    <label htmlFor="username"><b>User Name</b></label>
                    <input name="username"  value={user.username}  onChange={this.onChange} type="text"  placeholder="Full Name"   />

                    <label htmlFor="username"><b>Name</b></label>
                    <input name="username"  value={user.name}  onChange={this.onChange} type="text"  placeholder=" Name"   />
                    
                    <label htmlFor="email"><b>Email Address</b></label>
                    <input name="email" value={user.email} onChange={this.onChange} type="text" placeholder="Email Address"  />
                    
                    <label htmlFor="bio"><b>bio</b></label>

                    <textarea className="tweet_text" 
                            name='bio'
                            value={user.bio}
                            onChange={this.onChange}
                    ></textarea>
                   
                   
                   
                    <label style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, pointer: 'cursor'}}>
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
                </div>
            </form>
        );
    }
}

export default withFirebase(UserAccount);