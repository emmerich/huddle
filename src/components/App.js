import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import Home from './Home'
import Test from './Test'
import AuthenticatedRoute from './AuthenticatedRoute'
import RedirectRoute from './RedirectRoute'
import AdminRoute from './AdminRoute'
import Login from './Login'
import Channel from './Channel'


class App extends React.Component {
  static propTypes = {
    /* eslint-disable react/forbid-prop-types */
    store: PropTypes.object.isRequired
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <div className="container text-center">
            <h1>React Redux Starter Kit</h1>

            <Link to="/">Home</Link>

            <div className="page-layout__viewport">
              <RedirectRoute path="/" />
              <Route exact path="/login" component={Login} />

              <AuthenticatedRoute exact path="/" component={Home} />
              <AuthenticatedRoute path="/channel/:id" component={Channel} />

              <AdminRoute path="/test" component={Test} />
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

export default App
