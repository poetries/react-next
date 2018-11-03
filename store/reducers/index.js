import {combineReducers} from 'redux'

const rootReducer = combineReducers({
  goods			    : require('./goods').default,
  topGoods			: require('./topGoods').default,
  goodsDetail		: require('./goodsDetail').default
})

export default rootReducer