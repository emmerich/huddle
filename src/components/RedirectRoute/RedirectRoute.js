import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

export default class RedirectRoute extends React.Component {

  static propTypes = {
    redirect: PropTypes.string.isRequired,
    redirectDone: PropTypes.func.isRequired
  }

  componentWillUpdate() {
    if (this.props.redirect) {
      this.props.redirectDone()
    }
  }

  render() {
    return this.props.redirect ? <Redirect to={this.props.redirect} /> : null
  }
}
