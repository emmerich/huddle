import { applyMiddleware, compose, createStore as createReduxStore } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import makeRootReducer from './reducers'
import sagas from './sagas'
import firebaseSaga from './sagas/firebase'

const createStore = (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()
  const middleware = [thunk, sagaMiddleware]

  const enhancers = []
  let composeEnhancers = compose

  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
  }

  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  )

  sagaMiddleware.run(sagas)
  sagaMiddleware.run(firebaseSaga(store))
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      /* eslint-disable global-require */
      const reducers = require('./reducers').default
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
}

export default createStore
