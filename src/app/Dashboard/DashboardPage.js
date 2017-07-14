import React from 'react'
import PropTypes from 'prop-types'
import { mapObjIndexed, values } from 'ramda'
import Channel from './Channel'

export default class DashboardPage extends React.Component {

  static propTypes = {
    channels: PropTypes.shape({}).isRequired,
    messages: PropTypes.shape({}).isRequired,
    users: PropTypes.shape({}).isRequired,

    loadChannels: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.loadChannels()
  }

  render() {
    const { channels, messages, users } = this.props

    return (
      <div>
        <div>Channels</div>
        <ol>
          {values(mapObjIndexed((channel, key) => (
            <Channel
              channel={channel}
              channelKey={key}
              messages={messages[key] || {}}
              users={users[key] || {}}
            />
          ), channels))}
        </ol>
      </div>
    )
  }
}
