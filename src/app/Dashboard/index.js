import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import DashboardPage from './DashboardPage'
import { loadChannels } from '../../store/reducers/channels'

const mapDispatchToProps = {
  loadChannels
}

const mapStateToProps = state => ({
  channels: state.channels,
  messages: state.messages,
  users: state.users
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardPage))
