const NEW_MESSAGE = 'NEW_MESSAGE'

export const newMessage = message => ({
  type: NEW_MESSAGE,
  message
})

const initialState = []
export default (state = initialState, action) => {
  switch (action.type) {
    case NEW_MESSAGE:
      return state.concat(action.message)
    default:
      return state
  }
}
