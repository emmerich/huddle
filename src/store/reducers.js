import { combineReducers } from 'redux'
import messagesReducer from './reducers/messages'
import authReducer from './reducers/auth'
import redirectReducer from './reducers/redirect'
import channelsReducer from './reducers/channels'
import usersReducer from './reducers/users'

export default asyncReducers => combineReducers({
  messages: messagesReducer,
  auth: authReducer,
  redirect: redirectReducer,
  channels: channelsReducer,
  users: usersReducer,
  ...asyncReducers
})
