import { takeEvery, select } from 'redux-saga/effects'
import { prop, take } from 'ramda'
import { AUTH_UPDATED } from '../reducers/auth'
import { channelAdded, channelChanged, channelRemoved, LOAD_CHANNELS, UNLOAD_CHANNELS, LOAD_CHANNEL, UNLOAD_CHANNEL } from '../reducers/channels'
import { messageAdded, messageChanged, messageRemoved, SEND_MESSAGE } from '../reducers/messages'
import { userAdded, userChanged, userRemoved } from '../reducers/users'

function* takeAuth() {
  let auth = yield select(prop('auth'))

  if (!auth.user || !auth.user.uid) {
    auth = yield take([AUTH_UPDATED, action => action.user !== null])
  }

  return auth
}

const subscribeToChannels = store => function* handleAction() {
  const auth = yield takeAuth()
  const channels = firebase.database().ref(`/client/${auth.user.uid}/channels`)

  channels.on('child_added', data => store.dispatch(channelAdded(data.key, data.val())))
  channels.on('child_changed', data => store.dispatch(channelChanged(data.key, data.val())))
  channels.on('child_removed', data => store.dispatch(channelRemoved(data.key)))
}

function* unsubscribeFromChannels() {
  const auth = yield takeAuth()
  const channels = firebase.database().ref(`/client/${auth.user.uid}/channels`)

  channels.off('child_added')
  channels.off('child_changed')
  channels.off('child_removed')
}

const subscribeToChannel = store => function* handleAction(action) {
  const { key } = action
  console.log(`subscribeToChannel ${key}`)
  yield subscribeToChannels(store)(action)

  const db = firebase.database()
  const messages = db.ref(`/public/messages/${key}`).orderByChild('timestamp').limitToFirst(100)
  const users = db.ref(`/public/users/${key}`)

  messages.on('child_added', data => store.dispatch(messageAdded(key, data.key, data.val())))
  messages.on('child_changed', data => store.dispatch(messageChanged(key, data.key, data.val())))
  messages.on('child_removed', data => store.dispatch(messageRemoved(key, data.key)))

  users.on('child_added', data => store.dispatch(userAdded(key, data.key, data.val())))
  users.on('child_changed', data => store.dispatch(userChanged(key, data.key, data.val())))
  users.on('child_removed', data => store.dispatch(userRemoved(key, data.key, data.val())))
}

function* unsubscribeFromChannel(action) {
  yield takeAuth()
  const { key } = action

  const db = firebase.database()
  const messages = db.ref(`/public/messages/${key}`)
  const users = db.ref(`/public/users/${key}`)

  messages.off('child_added')
  messages.off('child_changed')
  messages.off('child_removed')

  users.off('child_added')
  users.off('child_changed')
  users.off('child_removed')
}

function* sendMessage(action) {
  yield fetch('/sendMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(action)
  })
}

export default store => function* firebaseSaga() {
  yield takeEvery(LOAD_CHANNELS, subscribeToChannels(store))
  yield takeEvery(UNLOAD_CHANNELS, unsubscribeFromChannels)
  yield takeEvery(SEND_MESSAGE, sendMessage)
  yield takeEvery(LOAD_CHANNEL, subscribeToChannel(store))
  yield takeEvery(UNLOAD_CHANNEL, unsubscribeFromChannel)
}
