import React, { Component } from 'react'
import { withRouter } from '../../utils/withRouter'
import SignInForm from '../SignInForm'
import socket from '../../utils/socket'

class SignIn extends Component {
  constructor(props){
    super(props);
    
  }
  render() {
    return (
      <div>
        <h2>Sign in to register your socket with your login info and be taken to the lobby view.</h2>
        <p>or just go directly to the lobby view with '/lobby' after the localhost in the url and you will be considered a guest.</p>
        <SignInForm></SignInForm>
      </div>
    )
  }
}

export default withRouter(SignIn);
