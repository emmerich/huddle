import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import TestPage from './TestPage'

const mapDispatchToProps = {}
const mapStateToProps = state => ({
  channels: state.channels
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestPage))
