import { assoc, dissoc } from 'ramda'

export const CHANNEL_ADDED = 'CHANNEL_ADDED'
export const CHANNEL_CHANGED = 'CHANNEL_CHANGED'
export const CHANNEL_REMOVED = 'CHANNEL_REMOVED'
export const LOAD_CHANNEL = 'LOAD_CHANNEL'
export const UNLOAD_CHANNEL = 'UNLOAD_CHANNEL'
export const LOAD_CHANNELS = 'LOAD_CHANNELS'
export const UNLOAD_CHANNELS = 'UNLOAD_CHANNELS'

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

export const channelRemoved = key => ({ type: CHANNEL_REMOVED, key })
export const loadChannel = key => ({ type: LOAD_CHANNEL, key })
export const unloadChannel = key => ({ type: UNLOAD_CHANNEL, key })
export const loadChannels = () => ({ type: LOAD_CHANNELS })

const initialState = {}

const removeChannel = (key, channels) => dissoc(key, channels)
const addChannel = (key, channel, channels) => assoc(key, channel, channels)

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANNEL_ADDED:
      return addChannel(action.key, action.channel, state)
    case CHANNEL_REMOVED:
    case UNLOAD_CHANNEL:
      return removeChannel(action.key, state)
    case CHANNEL_CHANGED:
      return addChannel(action.key, action.channel, removeChannel(action.key, state))

    default:
      return state
  }
}
