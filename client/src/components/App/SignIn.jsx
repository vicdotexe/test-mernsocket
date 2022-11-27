import React, { Component } from 'react'
import SignInForm from '../SignInForm'

export default class SignIn extends Component {
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
