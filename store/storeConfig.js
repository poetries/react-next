
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import apiMiddleware from './middleware/api'
import rootReducers from './reducers'

const initializeStore = (initialState = {})=> {
  return createStore(
  	rootReducers, 
  	initialState, 
  	composeWithDevTools(applyMiddleware(thunkMiddleware,apiMiddleware)))
}

export default initializeStore 

