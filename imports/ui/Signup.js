import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import {Accounts} from 'meteor/accounts-base';
import { withTracker } from 'meteor/react-meteor-data';

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e){
    e.preventDefault();

    let email = this.refs.emailref.value.trim();
    let password = this.refs.passwordref.value.trim();

    if (password.length < 9) {
      return this.setState({error: 'Password must be more than 8 characters long'});
    }

    this.props.createUser({email, password}, (err)=>{
      if(err) {
        this.setState({error: err.reason});
      } else {
        this.setState({error: ''});
      }
      console.log('Signup callback', err);
    });
    // this.setState({
    //   error: "something went wrong."
    // });
  }
  render() {
    return (
      <div className="boxed-view">
        <div  className="boxed-view__box">
            <h1>Sighup</h1>

            {this.state.error ? <p>{this.state.error}</p>: undefined}

            <form onSubmit={this.onSubmit.bind(this)} noValidate>
              <input type="email" ref ='emailref' name="email" placeholder="Email"/>
              <input type="password" ref='passwordref' name="password" placeholder="Password"/>
              <button className="button">Create Account</button>
            </form>

            <Link to="/">Already have an account? Log In</Link>
        </div>
      </div>
    );
  }
}

Signup.propTypes = {
  createUser: PropTypes.func.isRequired
}

export default withTracker(() => {
  return {
    createUser: Accounts.createUser
  };
})(Signup);
