import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import AuthenticatedRoute from './AuthenticatedRoute'

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  auth: state.auth
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthenticatedRoute))
