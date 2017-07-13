import React from 'react'
import ReactDOM from 'react-dom'
import createStore from './store/createStore'
import initFirebase from './firebase/init'
import './styles/main.scss';

(async () => {
  // Store Initialization
  // ------------------------------------
  const store = createStore(window.__INITIAL_STATE__)

  // Firebase Initialization
  await initFirebase(store)

  // Render Setup
  // ------------------------------------
  const MOUNT_NODE = document.getElementById('root')

  let render = () => {
    /* eslint-disable global-require */
    const App = require('./components/App').default

    ReactDOM.render(
      <App store={store} />,
      MOUNT_NODE
    )
  }

  // Development Tools
  // ------------------------------------
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
        './components/App'
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
