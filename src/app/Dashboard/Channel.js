import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { map, values } from 'ramda'

export default class Channel extends React.Component {

  static propTypes = {
    channel: PropTypes.shape.isRequired,
    channelKey: PropTypes.string.isRequired,
    messages: PropTypes.shape.isRequired,
    users: PropTypes.shape.isRequired
  }

  render() {
    const { channel, channelKey, messages, users } = this.props

    if (!channel) {
      return <div>Loading ...</div>
    }

    return (
      <div>
        <div>
          <Link to={`/channel/${channelKey}`}>{channel.name} ({Object.keys(users || {}).length} users)</Link>
        </div>
        <ol>
          {values(map(message => (
            <div>{message.text}</div>
          ), Object.keys(messages || {})))}
        </ol>
      </div>
    )
  }
}
