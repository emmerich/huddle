export const AUTH_UPDATED = 'AUTH_UPDATED'

// ------------------------------------
// Actions
// ------------------------------------
export const authUpdated = user => ({
  type: AUTH_UPDATED,
  user
})

const initialState = { pending: false, user: null }

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_UPDATED:
      return { pending: false, user: action.user }
    default:
      return state
  }
}
