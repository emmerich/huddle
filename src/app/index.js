import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import Dashboard from './Dashboard'
import Test from './Test'
import Login from './Login'
import Channel from './Channel'
import AuthenticatedRoute from '../components/AuthenticatedRoute'
import RedirectRoute from '../components/RedirectRoute'
import AdminRoute from '../components/AdminRoute'

export default class extends React.Component {
  static propTypes = {
    store: PropTypes.shape.isRequired
  }

  shouldComponentUpdate() {
    return false
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <div>
            <h1>React Redux Starter Kit</h1>

            <Link to="/">Home</Link>

            <div>
              <RedirectRoute path="/" />
              <Route exact path="/login" component={Login} />

              <AuthenticatedRoute exact path="/" component={Dashboard} />
              <AuthenticatedRoute path="/channel/:id" component={Channel} />

              <AdminRoute path="/test" component={Test} />
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
