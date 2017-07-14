import React from 'react'

export default class extends React.Component {

  state = {
    id: null,
    channelKey: '',
    connected: false,
    messages: []
  }

  componentWillUnmount() {
    this.leaveChannel()
  }

  async joinChannel() {
    const response = await fetch(`/join?channel=${this.state.channelKey}`)
    const { id, channels } = await response.json()

    this.messageRefs = channels.map((channel) => {
      const ref = firebase.database().ref(`/public/messages/${channel}`)
      ref.on('child_added', data => this.setState({ messages: this.state.messages.concat(data.val()) }))
      return ref
    })

    this.setState({ channelKey: '', connected: true, id })
  }

  leaveChannel() {
    this.messageRefs.forEach(ref => ref.off('child_added'))
    fetch(`/leave?user=${this.state.id}`)
    this.setState({ connected: false, messages: [] })
  }

  render() {
    return (<div>
      <h1>Test Page</h1>
      <div>
        <input type="text" value={this.state.channelKey} onChange={event => this.setState({ channelKey: event.target.value })} />
        <input type="button" onClick={() => this.joinChannel()} value="Join" disabled={this.state.connected} />
        <input type="button" onClick={() => this.leaveChannel()} value="Leave" disabled={!this.state.connected} />
        <div>
          <div>Messages ({ this.state.connected ? 'Connected' : 'Not Connected'})</div>
          <div>{this.state.messages.map(m => <div>{m.text}</div>)}</div>
        </div>
      </div>
    </div>)
  }
}
