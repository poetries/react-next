import React,{Component,PureComponent} from 'react';
import { Tabs, WhiteSpace, Badge,Toast } from 'antd-mobile';
import {tabs} from '@config'
import styled from 'styled-components'
import {storage} from '@utils'
import Router from 'next/router'

export default class GoodsTab extends PureComponent {
  constructor(props) {
		super(props)
	}
  state={

  }
  render(){
    const {fetchGoods,clearGoodsList,clearSearchList,fetchTopGoods,path,asPath,location,onTabChange} = this.props
    const queryCategory = storage.get('__queryCategory__')
    const initTabIdx = queryCategory && queryCategory.tabIndex || 0

    // const initTabIdx = asPath.split('tabIndex=').pop()

    return (
      <Tabs tabs={tabs.map(v=>{
          if(v.categoryId=='18'){
            v.title = <Badge text="热">爆款榜单</Badge>
          }
          return {...v}
        })}
        tabBarActiveTextColor="#f00"
        tabBarUnderlineStyle={{border:'1px #f60016 solid'}}
        initialPage={initTabIdx}
        onTabClick={(tab, index) => {
          storage.set('__queryCategory__',{categoryId:tab.categoryId,tabIndex:index})

          Toast.loading('加载中,请稍后...',1.5)

          onTabChange && onTabChange(tab)

          if(!tab.categoryId){
            fetchTopGoods()
          }else{
            fetchGoods({goodsCategoryId:tab.categoryId})
          }
          Router.push(`/?category_id=${tab.categoryId}&tabIndex=${index}`)
        }}

      >
      </Tabs>
    )
  }
}
