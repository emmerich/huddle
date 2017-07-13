// import { takeEvery, put } from 'redux-saga/effects'
// import { AUTH_UPDATED } from '../reducers/auth'
// import { newChannel } from '../reducers/channels'
//
// let subscribed = false

// function subscribeToFirebase(action) {
//   if (subscribed) {
//     return
//   }
//
//   if (action.user !== null) {
//     subscribed = true
//
//     // Subscribe
//     const db = firebase.database()
//     const userId = action.user.uid
//     const dbRef = `/channels/${userId}`
//
//     console.log(`Subscribing to ${dbRef}`)
//     db.ref(dbRef).on('child_added', data => {
//       const _action = newChannel(data.val())
//       console.log('new channel 1', data.val(), _action)
//       put(action)
//     })
//   }
//
//   // TODO if user changed?
// }

function* rootSaga() {
  // yield takeEvery(AUTH_UPDATED, subscribeToFirebase)
}

export default rootSaga
