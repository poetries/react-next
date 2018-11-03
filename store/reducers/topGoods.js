import * as ActionTypes from '../actions'
import {formatGoodsListData} from '../../utils/formatData'

export default (state = {
	fetching : false,
	error 	 : false,
	data 	 : []
}, action) => {

	if (action.type === ActionTypes.FETCH_TOP_GOODS_SUCCESS) {
		const {topGoods} = action.response

		return Object.assign({},{
      ...state,
			data 	 : topGoods.list?topGoods.list.map(formatGoodsListData).map(vv=>{
				vv.isTop = true
				return vv
			}):[]
		})
	}else if(action.type === ActionTypes.FETCH_TOP_GOODS_REQUEST){
		return Object.assign({},{
      ...state,
			fetching : true
		})
	}else if(action.type === ActionTypes.FETCH_GOODS_SUCCESS){
		//合并Goods数据
		const {goods} = action.response

		return Object.assign({
        ...state,
			data: [...state.data].concat(goods.list)
		})
	}else if(action.type === ActionTypes.CLEAR_TOP_GOODS){
		return Object.assign({
			...state
		})
	}

	return state
}
