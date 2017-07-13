import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Login from './Login'

const mapDispatchToProps = {}

const mapStateToProps = () => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
