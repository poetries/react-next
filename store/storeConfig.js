import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import withRedux from 'next-redux-wrapper'
import apiMiddleware from './middleware/api'
import rootReducers from './reducers'

// 开发模式
const configureStore = (initialState={})=> {
  const middlewares = [thunkMiddleware, apiMiddleware]
  const store = createStore(
    rootReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
  )
  return store
}

export default comp => withRedux(configureStore)(comp)
