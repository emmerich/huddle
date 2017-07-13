const REDIRECT = 'REDIRECT'

export const redirect = url => ({
  type: REDIRECT,
  url
})

const initialState = null
export default (state = initialState, action) => {
  switch (action.type) {
    case REDIRECT:
      return action.url
    default:
      return state
  }
}
