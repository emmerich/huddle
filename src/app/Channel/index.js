import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { sendMessage } from '../../store/reducers/messages'
import { loadChannel, unloadChannel } from '../../store/reducers/channels'
import ChannelPage from './ChannelPage'

const mapDispatchToProps = {
  sendMessage,
  loadChannel,
  unloadChannel
}

const mapStateToProps = (state, props) => ({
  channelKey: props.match.params.id,
  channel: state.channels[props.match.params.id],
  messages: state.messages[props.match.params.id] || {},
  users: state.users[props.match.params.id] || {}
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelPage))
