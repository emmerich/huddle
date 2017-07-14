export const AUTH_UPDATED = 'AUTH_UPDATED'

export const authUpdated = user => ({
  type: AUTH_UPDATED,
  user
})

const initialState = { user: null }

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_UPDATED:
      return { user: action.user }
    default:
      return state
  }
}
