import React from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

export class LogIn extends React.Component {
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

    this.props.loginWithPassword({email}, password, (err)=>{
      if(err) {
        this.setState({error: err.message});
      } else {
        this.setState({error: ''});
      }
      console.log('Login callback', err);
    });

  }
  // goto = () => {
  //   browserHistory.push('/signup');
  // } 用push換頁

  render() {
    return (
      <div className="boxed-view">
        <div className="boxed-view__box">
            <h1>Login</h1>

            {this.state.error ? <p>{this.state.error}</p>: undefined}

            <form onSubmit={this.onSubmit.bind(this)} noValidate className="boxed-view__form">
              <input type="email" ref ='emailref' name="email" placeholder="Email"/>
              <input type="password" ref='passwordref' name="password" placeholder="Password"/>
              <button className="button">Login</button>
            </form>
            <button onClick={()=>browserHistory.push('/signup')}>Have an Account?</button>
        </div>
      </div>
    );
  }
}

LogIn.propTypes = {
  loginWithPassword: PropTypes.func.isRequired
};

export default withTracker(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  };
})(LogIn);
