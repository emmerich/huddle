import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import { authUpdated } from './store/reducers/auth'
import App from './app'

/* eslint-disable import/newline-after-import */
;(async () => {
  const store = createStore(window.__INITIAL_STATE__)

  await new Promise(resolve => window.firebase.auth().onAuthStateChanged((user) => {
    store.dispatch(authUpdated(user))
    resolve()
  }))

  const MOUNT_NODE = document.getElementById('root')

  let render = () => {
    ReactDOM.render(
      <App store={store} />,
      MOUNT_NODE
    )
  }

  if (__DEV__) {
    if (module.hot) {
      const renderApp = render
      const renderError = (error) => {
        /* eslint-disable global-require */
        const RedBox = require('redbox-react').default

        ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
      }

      render = () => {
        try {
          renderApp()
        } catch (e) {
          console.error(e)
          renderError(e)
        }
      }

      // Setup hot module replacement
      module.hot.accept([
        './app'
      ], () =>
        setImmediate(() => {
          ReactDOM.unmountComponentAtNode(MOUNT_NODE)
          render()
        })
      )
    }
  }

  // Let's Go!
  // ------------------------------------
  if (!__TEST__) render()
})()
