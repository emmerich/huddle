import React from 'react'
import PropTypes from 'prop-types'

export default class Channel extends React.Component {

  static propTypes = {
    sendMessage: PropTypes.func.isRequired,
    channelKey: PropTypes.string.isRequired,
    channel: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    messages: PropTypes.shape.isRequired,
    users: PropTypes.shape.isRequired
  }

  state = { text: '' }

  sendMessage() {
    this.props.sendMessage(this.props.channelKey, this.state.text)
    this.setState({ text: '' })
  }

  render() {
    const { channel, messages, users } = this.props

    if(!channel) {
      return <div>Loading..</div>
    }

    return (<div>
      <div>{channel.name} ({Object.keys(users).length} users)</div>
      <ul>
        {Object.keys(messages).map(key => (
          <li>{messages[key].text}</li>
        ))}
      </ul>
      <input type="text" value={this.state.text} onChange={event => this.setState({ text: event.target.value })} />
      <input type="button" onClick={() => this.sendMessage()} value="Send" />
    </div>)
  }
}
