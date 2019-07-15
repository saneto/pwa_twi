import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import * as ROUTES from '../../../constants/routes';

const SignUpPage = () => (
  <div>
    <h1>Register</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  name: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'le compte existe deja';

const ERROR_MSG_ACCOUNT_EXISTS = ` error`;

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

     onSubmit = event => {
        const { username,name, email, passwordOne } = this.state;


        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                return this.props.firebase.user(authUser.user.uid).set({
                    username,
                    name,
                    email,
                });
            })
            .then(() => {
                return this.props.firebase.doSendEmailVerification();
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
                error.message = ERROR_MSG_ACCOUNT_EXISTS;
                }

                this.setState({ error });
            });

        event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
            name,
        } = this.state;

        const   isInvalid =
                passwordOne !== passwordTwo ||
                passwordOne === '' ||
                email === '' ||
                name === '' ||
                username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <div >
                    <label for="username"><b>User Name</b></label>
                    <input name="username"  value={username}  onChange={this.onChange} type="text"  placeholder="Full Name"   />

                    <label for="username"><b>Name</b></label>
                    <input name="username"  value={name}  onChange={this.onChange} type="text"  placeholder=" Name"   />
                    
                    <label for="email"><b>Email Address</b></label>
                    <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address"  />
                    
                    <label for="passwordOne"><b>Password</b></label>
                    <input name="passwordOne" value={passwordOne} onChange={this.onChange} type="password" placeholder="Password"  />
                    
                    <label for="passwordTwo"><b>Confirm Password</b></label>
                    <input name="passwordTwo"  value={passwordTwo} onChange={this.onChange}  type="password" placeholder="Confirm Password"  />
                    
                    <button  className="registerbtn" disabled={isInvalid} type="submit">
                        Sign Up
                    </button>
                    {error && <p>{error.message}</p>}
                </div>
            </form>
        );
    }
}

    const SignUpLink = () => (
        <p>
            Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </p>
    );

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
