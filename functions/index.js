const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

admin.initializeApp(functions.config().firebase)

exports.join = functions.https.onRequest((req, res) => cors(req, res, () => {
  const user = `${Date.now()}`

  // TODO channel decided by config
  const channels = [req.query.channel]

  const allUsersDB = admin.database().ref(`/admin/users/${user}`)
  const publicChannelsDBs = channels.map(channel => admin.database().ref(`/public/users/${channel}/${user}`))

  allUsersDB.set({ id: user, channels })
  publicChannelsDBs.forEach(db => db.set({ id: user }))

  res.json({
    id: user,
    channels
  })
}))

exports.leave = functions.https.onRequest((req, res) => cors(req, res, () => {
  const user = req.query.user
  const allUsersDB = admin.database().ref(`/admin/users/${user}`)

  allUsersDB.once('value').then((snapshot) => {
    const { channels } = snapshot.val()
    const userDBs = channels.map(channel => admin.database().ref(`/public/users/${channel}/${user}`))
    userDBs.forEach(db => db.remove())

    res.status(200).end()
  })
}))
