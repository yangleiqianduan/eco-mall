import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Slider from 'components/Slider/'
import FootBar from 'components/FootBar/'
import BuyPanel from 'components/BuyPanel/'
import InfoPanel from 'components/InfoPanel/'

import ItemOverview from 'components/ItemOverview/'
import ItemChoose from 'components/ItemChoose/'
import ItemDeatil from 'components/ItemDeatil/'
import TelUs from 'components/TelUs/'
import wantPic from 'common/img/want.png'

import { getItemDetail } from 'actions/detail'
import { confirmOrder } from 'actions/index'
import { createArray } from 'common/utils'

@CSSModules(styles, {allowMultiple: true})
export class Detail extends PureComponent {
  componentDidMount () {
    const query = this.props.location.query.id
    this.getItemDetail(query)
  }
  getItemDetail = (query) => {
    this.props.dispatch(getItemDetail(query))
  }
  state={
    currentOperate: 0,           // 1表示加入购物车， 2表示立即购买
    show: true,
    currentImage: 0,
    showFullscreen: false,
    showInfo: false,             // 1展示服务说明 2展示产品参数
    number: 1,
    skuMapKey: createArray(this.props.data.getIn(['reqData', 'product_attribute_info', 'sku_attribute_info']).size, '')
  }

  componentWillReceiveProps (np) {
    const nextItem = np.data.get('reqData')
    if (!nextItem.equals(this.props.data.get('reqData'))) {
      this.setState({
        // 创建一个和属性数长度一样的数组，用做sku map，每次选择时更新对应位置的数组元素值
        skuMapKey: createArray(nextItem.getIn(['product_attribute_info', 'sku_attribute_info']).size, '')
      })
    }
  }

  handleShowBuy = (payload, type) => this.setState({show: payload, currentOperate: type})

  handleShowInfo = (payload) => this.setState({showInfo: payload})

  handleSubmit = (type) => {
    // type: 1加入购物车 2立即购买
    console.log(type)
    // result.type_id = 1
    // result.appoint_id = this.props.location.query.id
    // this.props.dispatch(confirmOrder(result))
  }

  handleShowFullscreen = (e) => {
    e.preventDefault()
    this.setState({showFullscreen: true})
  }

  getValidMap = (keyArr) => {
    // 根据本地的skuMapKey获取合法的后端提供的sku map key(string)
    const validMap = this.props.data.toJS().reqData.sku_attribute_mapping_sku_id
    return validMap[keyArr.join(';')] || -1
  }

  handleChangeSku = (i, value) => {
    // 选择sku属性
    const newMap = this.state.skuMapKey.slice()
    newMap[i] = newMap[i] === value ? '' : value
    this.setState({
      skuMapKey: newMap
    })
  }

  handleChangeNumber = (num) => {
    this.setState({
      number: num
    })
  }

  render () {
    const { reqData } = this.props.data.toJS()
    const { show, currentOperate, showInfo, currentImage, showFullscreen, number, skuMapKey } = this.state

    // '-1'是所有图片的key
    const banner = (reqData.product_image_info || {'-1': []})['-1'] || []

    // skuId
    const skuMapStr = this.getValidMap(skuMapKey)

    const inventoryMay = (reqData.product_inv_info || {sku_inv: {}}).sku_inv[skuMapStr]
    const inventory = (inventoryMay || {})

    const skuImage = (reqData.product_image_info[skuMapStr] || []).map(img => (img.img_url || reqData.product_image_info['-1'][0].img_url))[0]

    const price = reqData.product_price_info[skuMapStr] || {}
    const {
      market_price: marketPrice,
      sale_price: salePrice
    } = price

    // 已选sku
    const skuChoose = reqData.product_attribute_info.sku_attribute_info.map((op, i) => {
      return (op.sku_attribute_value_info.filter(o => o.key === skuMapKey[i])[0] || {}).value
    }).filter(item => item).join('，')

    return <div styleName='wrap'>
      <section styleName='banner'>
        <Slider
          data={banner}
          onClick={this.handleShowFullscreen}
          setting={{dots: false, autoplay: false, afterChange: (e) => this.setState({currentImage: e})}} />
        {
          banner.length > 0
          ? <div styleName='page'><strong>{currentImage + 1}</strong>/{banner.length}</div>
          : null
        }
      </section>
      <section><ItemOverview data={reqData} marketPrice={marketPrice} salePrice={salePrice} onShowService={() => this.handleShowInfo(1)} /></section>
      <section><ItemChoose skuChoose={skuChoose} params={reqData.product_attribute_info.spu_attribute_info} onShowChoose={() => this.handleShowBuy(true, 0)} onShowParam={() => this.handleShowInfo(2)} /></section>
      <section><ItemDeatil data={reqData} /></section>
      <section><TelUs data={{link: '/want', pic: wantPic}} /></section>
      <FootBar onBuy={() => this.handleShowBuy(true, 2)} />
      <InfoPanel
        show={!!showInfo}
        type={showInfo + 0}
        title={showInfo === 1 ? '服务说明' : '产品参数'}
        data={reqData}
        onClose={() => this.handleShowInfo(false)} />
      <BuyPanel
        show={show}
        price={salePrice}
        img={skuImage}
        skuChoose={skuChoose}
        data={reqData.product_attribute_info.sku_attribute_info}
        type={currentOperate}
        inventory={inventory} inventorySkuMap={(reqData.product_inv_info || {sku_inv: {}}).sku_inv}
        skuMap={reqData.sku_attribute_mapping_sku_id}
        number={number}
        onChangeNumber={this.handleChangeNumber}
        skuMapKey={skuMapKey}
        onChangeSku={this.handleChangeSku}
        onSubmit={this.handleSubmit}
        onClickCover={() => this.handleShowBuy(false)} />
      {showFullscreen
        ? <Slider data={banner} fullscreen onClose={() => this.setState({showFullscreen: false})} setting={{dots: false, autoplay: false, afterChange: (e) => this.setState({currentImage: e})}} />
        : null
      }
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.detail
})

export default connect(mapStateToProps)(Detail)
