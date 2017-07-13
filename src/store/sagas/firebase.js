import { takeEvery } from 'redux-saga/effects'
import { AUTH_UPDATED } from '../reducers/auth'
import { newChannel } from '../reducers/channels'

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
    const dbRef = `/users/${userId}/channels`

    console.log(`Subscribing to ${dbRef}`)
    db.ref(dbRef).on('child_added', data => store.dispatch(newChannel(data.val())))
  }

  // TODO if user changed?
}

export default store => function* firebaseSaga() {
  yield takeEvery(AUTH_UPDATED, subscribeToFirebase(store))
}
