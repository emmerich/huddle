import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

const AuthenticatedRoute = ({ component: Component, auth, ...rest }) => {
  console.log('auth', auth)
  return <Route {...rest} render={props => {
    console.log('render authenticated route', auth)
    return (
      auth.user !== null ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
    )
  }} />
}

// )

AuthenticatedRoute.propTypes = {
  component: PropTypes.node,
  auth: PropTypes.object,
  location: PropTypes.string
}

export default AuthenticatedRoute
