const CONFIG = {
  apiKey: 'AIzaSyCgaldWWVvaeZ8cjl1JF83sZ69p6jxrMz0',
  authDomain: 'huddle-300a5.firebaseapp.com',
  databaseURL: 'https://huddle-300a5.firebaseio.com',
  projectId: 'huddle-300a5',
  storageBucket: '',
  messagingSenderId: '823928664801'
}

const init = () => firebase.initializeApp(CONFIG)

export default init
