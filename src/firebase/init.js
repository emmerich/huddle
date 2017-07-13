import { newMessage } from '../store/reducers/messages'
import { authUpdated } from '../store/reducers/auth'

const CONFIG = {
  apiKey: 'AIzaSyCgaldWWVvaeZ8cjl1JF83sZ69p6jxrMz0',
  authDomain: 'huddle-300a5.firebaseapp.com',
  databaseURL: 'https://huddle-300a5.firebaseio.com',
  projectId: 'huddle-300a5',
  storageBucket: '',
  messagingSenderId: '823928664801'
}

const init = async store => new Promise((resolve) => {
  // Firebase Initialization
  firebase.initializeApp(CONFIG)

  firebase.auth().onAuthStateChanged((user) => {
    resolve()
    store.dispatch(authUpdated(user))
  })

  firebase.database().ref('messages').on('child_added', data => store.dispatch(newMessage(data.val())))
})

export default init
