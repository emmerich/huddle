const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

const user_in_admin = user => admin.database().ref(`/admin/users/${user}`)
const user_in_public_channel = channel => user => admin.database().ref(`/public/users/${channel}/${user}`)
const messages_in_public_channel = channel => admin.database().ref(`/public/messages/${channel}`)

exports.join = functions.https.onRequest((req, res) => {
  // TODO generate a user id based on browser/IP and try not to have duplicates
  const user_id = `${Date.now()}`
  const user = { id: user_id }

  // TODO channel decided by config
  const channels = [req.query.channel]

  user_in_admin(user_id).set({ channels })
  channels.forEach(channel => user_in_public_channel(channel)(user_id).set(user))

  res.json({
    id: user_id,
    channels
  })
})

exports.leave = functions.https.onRequest((req, res) => {
  const user = req.query.user
  const user_ref = user_in_admin(user)

  user_ref.once('value').then((user_snapshot) => {
    const { channels } = user_snapshot.val()

    channels.forEach(channel => user_in_public_channel(channel)(user).remove())
    user_ref.remove()

    res.status(200).end()
  })
})

exports.sendMessage = functions.https.onRequest((req, res) => {
  const { channel, message } = req.body
  const message_with_ts = Object.assign({}, message, { timestamp: Date.now() })

  // TODO Check for message structure.

  messages_in_public_channel(channel).push().set(message_with_ts)

  res.status(200).end()
})
