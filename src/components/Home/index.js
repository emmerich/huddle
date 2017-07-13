import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Home from './Home'

const mapDispatchToProps = {}
const mapStateToProps = state => ({
  channels: state.channels
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
