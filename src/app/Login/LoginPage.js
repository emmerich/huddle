import React from 'react'

const UI_CONFIG = {
  signInSuccessUrl: '/',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>'
}


export default class extends React.Component {
  componentDidMount() {
    // Initialize the FirebaseUI Widget using Firebase.
    this.ui = new firebaseui.auth.AuthUI(firebase.auth())
    // The start method will wait until the DOM is loaded.
    this.ui.start('#firebaseui-auth-container', UI_CONFIG)
  }

  render() {
    return <div id="firebaseui-auth-container" />
  }
}
