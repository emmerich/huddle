import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AdminRoute from './AdminRoute'

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminRoute))
