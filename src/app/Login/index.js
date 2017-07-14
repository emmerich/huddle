import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import LoginPage from './LoginPage'

const mapDispatchToProps = {}
const mapStateToProps = () => ({})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage))
