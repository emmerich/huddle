export const NEW_CHANNEL = 'NEW_CHANNEL'

// ------------------------------------
// Actions
// ------------------------------------
export const newChannel = channel => ({
  type: NEW_CHANNEL,
  channel
})

const initialState = []

export default (state = initialState, action) => {
  console.log('channels', action.type)
  switch (action.type) {
    case NEW_CHANNEL:
      console.log('new channel', action.channel)
      return state.concat(action.channel)
    default:
      return state
  }
}
