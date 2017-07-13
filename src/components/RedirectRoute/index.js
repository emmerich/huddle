import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import RedirectRoute from './RedirectRoute'
import { redirect } from '../../store/reducers/redirect'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = { redirectDone: () => redirect(null) }
const mapStateToProps = state => ({ redirect: state.redirect })

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RedirectRoute))
