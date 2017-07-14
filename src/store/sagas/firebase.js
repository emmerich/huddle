import { takeEvery } from 'redux-saga/effects'
import { AUTH_UPDATED } from '../reducers/auth'
import { channelAdded, channelChanged, channelRemoved, CHANNEL_ADDED } from '../reducers/channels'
import { messageAdded, messageChanged, messageRemoved, SEND_MESSAGE } from '../reducers/messages'
import { userAdded, userChanged, userRemoved } from '../reducers/users'

let subscribed = false

const subscribeToFirebase = store => (action) => {
  if (subscribed) {
    return
  }

  if (action.user !== null) {
    subscribed = true

    // Subscribe
    const db = firebase.database()
    const userId = action.user.uid
    const channelsRef = db.ref(`/users/${userId}/channels`)

    channelsRef.on('child_added', data => store.dispatch(channelAdded(data.key, data.val())))
    channelsRef.on('child_changed', data => store.dispatch(channelChanged(data.key, data.val())))
    channelsRef.on('child_removed', data => store.dispatch(channelRemoved(data.key)))
  }

  // TODO if user changed?
}

const subscribeToChannel = store => (channel) => {
  const db = firebase.database()
  const messagesRef = db.ref(`/public/messages/${channel.key}`)
  const usersRef = db.ref(`/public/users/${channel.key}`)

  messagesRef.on('child_added', data => store.dispatch(messageAdded(channel.key, data.key, data.val())))
  messagesRef.on('child_changed', data => store.dispatch(messageChanged(channel.key, data.key, data.val())))
  messagesRef.on('child_removed', data => store.dispatch(messageRemoved(channel.key, data.key)))

  usersRef.on('child_added', data => store.dispatch(userAdded(channel.key, data.key, data.val())))
  usersRef.on('child_changed', data => store.dispatch(userChanged(channel.key, data.key, data.val())))
  usersRef.on('child_removed', data => store.dispatch(userRemoved(channel.key, data.key, data.val())))
}

function* sendMessage(action) {
  const { channel, message } = action

  const db = firebase.database()
  const messagesRef = db.ref(`/public/messages/${channel}`)

  yield messagesRef.push().set(message)
}

export default store => function* firebaseSaga() {
  yield takeEvery(AUTH_UPDATED, subscribeToFirebase(store))
  yield takeEvery(CHANNEL_ADDED, subscribeToChannel(store))
  yield takeEvery(SEND_MESSAGE, sendMessage)
}
