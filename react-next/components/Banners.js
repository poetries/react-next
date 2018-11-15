import React,{Component,PureComponent} from 'react';
import {storage} from '@utils'
import { Carousel,Flex, WingBlank,List,WhiteSpace,Modal,Button,ActionSheet,Toast } from 'antd-mobile';
import Router from 'next/router'

export default class Banners extends PureComponent {
  constructor(props) {
		super(props)
	}
  state={

  }
  render(){
    const {data,height,pathname} = this.props
    const isDetail = pathname.indexOf('detail')!==-1
    return (
      <div>
      {data && data.length?<Carousel
        autoplay={true}
        autoplayInterval={2000}
        swipeSpeed={12}
        infinite
      >
        {data.map(v => (
          <div
            onClick={()=>{
              storage.set('__DetailGoodsName__',v.goodsName)
   					  storage.set('__goodsCategoryId__',v.goodsCategoryId)

              !isDetail && Router.push(`/detail/${v.goodsId}`)
            }}
            key={`${v}_${Math.random()}`}
            style={{ display: 'inline-block', width: '100%', height }}
          >
            <img
              src={v.imgUrl}
              alt=""
              style={{ width: '100%', verticalAlign: 'top',height }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
        </div>
        ))}
      </Carousel>:null}
    </div>
    )
  }

}
