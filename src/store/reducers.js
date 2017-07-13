import { combineReducers } from 'redux'
import messagesReducer from './reducers/messages'
import authReducer from './reducers/auth'
import redirectReducer from './reducers/redirect'
import channelsReducer from './reducers/channels'

export default asyncReducers => combineReducers({
  messages: messagesReducer,
  auth: authReducer,
  redirect: redirectReducer,
  channels: channelsReducer,
  ...asyncReducers
})
