import React from 'react'
import PropTypes from 'prop-types'

export default class Channel extends React.Component {

  static propTypes = {
    channelKey: PropTypes.string.isRequired,
    channel: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    messages: PropTypes.shape.isRequired,
    users: PropTypes.shape.isRequired,

    sendMessage: PropTypes.func.isRequired,
    loadChannel: PropTypes.func.isRequired,
    unloadChannel: PropTypes.func.isRequired
  }

  state = { text: '' }

  componentDidMount() {
    this.props.loadChannel(this.props.channelKey)
  }

  componentWillUnmount() {
    this.props.unloadChannel(this.props.channelKey)
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.sendMessage(this.props.channelKey, this.state.text)
    this.setState({ text: '' })
    return false
  }

  render() {
    const { channel, messages, users } = this.props

    if (!channel) {
      return <div>Loading..</div>
    }

    return (<div>
      <div>{channel.name} ({Object.keys(users).length} users)</div>
      <ul>
        {Object.keys(messages).map(key => (
          <li>{messages[key].text}</li>
        ))}
      </ul>
      <form onSubmit={this.onSubmit}>
        <input type="text" value={this.state.text} onChange={event => this.setState({ text: event.target.value })} />
        <input type="submit" value="Send" />
      </form>
    </div>)
  }
}
