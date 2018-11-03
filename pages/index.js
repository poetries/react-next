import React from 'react'
import {connect} from 'react-redux'
import {fetchTopGoods} from '../store/actions'

class Index extends React.Component {
  static getInitialProps ({ reduxStore, req }) {
    reduxStore.dispatch(fetchTopGoods())

    console.log(reduxStore.getState(),'====')
    return {}
  }

  componentDidMount () {
    const {dispatch} = this.props
  }


  render () {
    console.log(this.props,'=====props==')
    return (
      <div>首页测试</div>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  goods: state.goods,
  topGoods: state.topGoods,
  goodsDetail: state.goodsDetail
})

export default connect(mapStateToProps, {
  fetchTopGoods
})(Index)

