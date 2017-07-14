import { assoc, dissoc } from 'ramda'

export const CHANNEL_ADDED = 'CHANNEL_ADDED'
export const CHANNEL_CHANGED = 'CHANNEL_CHANGED'
export const CHANNEL_REMOVED = 'CHANNEL_REMOVED'

export const channelAdded = (key, channel) => ({
  type: CHANNEL_ADDED,
  key,
  channel
})

export const channelChanged = (key, channel) => ({
  type: CHANNEL_CHANGED,
  key,
  channel
})

export const channelRemoved = key => ({
  type: CHANNEL_REMOVED,
  key
})

const initialState = {}

const removeChannel = (key, channels) => dissoc(key, channels)
const addChannel = (key, channel, channels) => assoc(key, channel, channels)

export default (state = initialState, action) => {
  console.log('channels', action)
  switch (action.type) {
    case CHANNEL_ADDED:
      return addChannel(action.key, action.channel, state)
    case CHANNEL_REMOVED:
      return removeChannel(action.key, state)
    case CHANNEL_CHANGED:
      return addChannel(action.key, action.channel, removeChannel(action.key, state))
    default:
      return state
  }
}
