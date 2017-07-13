import { combineReducers } from 'redux'
import messagesReducer from './reducers/messages'
import authReducer from './reducers/auth'
import redirectReducer from './reducers/redirect'

export default asyncReducers => combineReducers({
  messages: messagesReducer,
  auth: authReducer,
  redirect: redirectReducer,
  ...asyncReducers
})
