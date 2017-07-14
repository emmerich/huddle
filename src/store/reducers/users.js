import { assocPath, dissocPath } from 'ramda'

export const USER_ADDED = 'USER_ADDED'
export const USER_CHANGED = 'USER_CHANGED'
export const USER_REMOVED = 'USER_REMOVED'

export const userAdded = (channel, key, user) => ({
  type: USER_ADDED,
  channel,
  key,
  user
})

export const userChanged = (channel, key, user) => ({
  type: USER_CHANGED,
  channel,
  key,
  user
})

export const userRemoved = (channel, key) => ({
  type: USER_REMOVED,
  channel,
  key
})

const initialState = {}

const removeUser = (channel, key, users) => dissocPath([channel, key], users)
const addUser = (channel, key, user, users) => assocPath([channel, key], user, users)

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_ADDED:
      return addUser(action.channel, action.key, action.user, state)
    case USER_REMOVED:
      return removeUser(action.channel, action.key, state)
    case USER_CHANGED:
      return addUser(action.channel, action.key, action.user,
        removeUser(action.channel, action.key, state))
    default:
      return state
  }
}
