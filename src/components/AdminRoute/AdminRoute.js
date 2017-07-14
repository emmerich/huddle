import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const AdminRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest} render={props => (
      auth.user !== null && auth.user.email === 'shne24@gmail.com' ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    )}
  />)

AdminRoute.propTypes = {
  component: PropTypes.node.isRequired,
  auth: PropTypes.shape.isRequired
}

export default AdminRoute
