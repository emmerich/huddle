import { assocPath, dissocPath } from 'ramda'

export const MESSAGE_ADDED = 'MESSAGE_ADDED'
export const MESSAGE_CHANGED = 'MESSAGE_CHANGED'
export const MESSAGE_REMOVED = 'MESSAGE_REMOVED'
export const SEND_MESSAGE = 'SEND_MESSAGE'

export const messageAdded = (channel, key, message) => ({
  type: MESSAGE_ADDED,
  channel,
  key,
  message
})

export const messageChanged = (channel, key, message) => ({
  type: MESSAGE_CHANGED,
  channel,
  key,
  message
})

export const messageRemoved = (channel, key) => ({
  type: MESSAGE_REMOVED,
  channel,
  key
})

export const sendMessage = (channel, text) => ({
  type: SEND_MESSAGE,
  channel,
  message: { text }
})

const initialState = {}

const removeMessage = (channel, key, messages) => dissocPath([channel, key], messages)
const addMessage = (channel, key, message, messages) => assocPath([channel, key], message, messages)

export default (state = initialState, action) => {
  switch (action.type) {
    case MESSAGE_ADDED:
      return addMessage(action.channel, action.key, action.message, state)
    case MESSAGE_REMOVED:
      return removeMessage(action.channel, action.key, state)
    case MESSAGE_CHANGED:
      return addMessage(action.channel, action.key, action.message,
        removeMessage(action.channel, action.key, state))
    default:
      return state
  }
}
