import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
import wantPic from 'common/img/want.png'

import { Link } from 'react-router-dom'
import Slider from 'components/Slider/'
import FootBar from 'components/FootBar/'
import BuyPanel from 'components/BuyPanel'

import * as actions from 'actions/detail'

@CSSModules(styles, {allowMultiple: true})
export class Detail extends PureComponent {
  state={
    show: false,
    currentImage: 0,
    showFullscreen: false
  }
  handleBuyItem = () => {
    this.setState({show: true})
  }
  handleCover = () => {
    this.setState({show: false})
  }
  handleSubmit = () => {
    let data = this.props.data.toJS().buyInfo.content
    let param = {
      telNo: data[0].value,
      sysNo: data[0].value
    }
    console.log(param)
  }
  handleChangeBuyInfo = (map, e) => {
    let value = e.target.value
    this.props.dispatch(actions.UPDATE_ORDER_INFO_ACTION(['buyInfo'].concat(map), value))
  }
  handleShowFullscreen = (e) => {
    e.preventDefault()
    this.setState({showFullscreen: true})
  }
  render () {
    const { banner, baseInfo, choose, detailInfo, goodsStandard, ensureInfo, buyInfo } = this.props.data.toJS()
    const { currentImage, showFullscreen } = this.state
    return <div styleName='wrap'>
      <section styleName='banner'>
        <Slider data={banner} onClick={this.handleShowFullscreen} setting={{dots: false, autoplay: false, afterChange: (e) => this.setState({currentImage: e})}} />
        {
          banner.length > 0
          ? <div styleName='page'><strong>{currentImage + 1}</strong>/{banner.length}</div>
          : null
        }
      </section>
      <section styleName='card baseInfo'>
        <header>
          <div styleName='left'>
            <h1>{baseInfo.title}</h1>
            {
              baseInfo.tags
              ? <div styleName='tags'>
                {
                  baseInfo.tags.map((item, i) => {
                    return <span styleName='item' key={i}>{item} ></span>
                  })
                }
              </div>
              : <div styleName='tags' />
            }
          </div>
          <div styleName='right'>
            <p styleName='curPrice'>￥{baseInfo.curPrice}</p>
            <p styleName='normalPrice'>市场价：￥{baseInfo.normalPrice}</p>
          </div>
        </header>
        <section styleName='main'>
          <div>快递：{baseInfo.farePrice}</div>
          <div>库存：{baseInfo.count}</div>
          <div>发货：{baseInfo.adress}</div>
        </section>
        <footer>
          <ul>
            {
              baseInfo.tips.map((item, i) => <li key={i} styleName='item'>{item}</li>)
            }
          </ul>
        </footer>
      </section>

      <section styleName='card choose'>
        已选：<span>{choose.standard}</span>
      </section>

      <section styleName='card detailInfo'>
        <h2>商品详情</h2>
        <img src={detailInfo.pic} alt='' />
      </section>

      <section styleName='card goodsStandard'>
        <h2>规则参数</h2>
        <ul>
          {
            goodsStandard.map((item, i) => {
              return <li key={i} styleName={item.long && 'long'}>
                <p styleName='tit'>{item.key}：</p>
                <p>{item.value}</p>
              </li>
            })
          }
        </ul>
      </section>

      <section styleName='card ensureInfo'>
        <h2>售后保障</h2>
        <ul>
          {
            ensureInfo.map((item, i) => <li key={i}>
              <div styleName='picWrap'><img src={item.icon} /></div>
              <div>
                <p styleName='tit'>{item.tit}</p>
                <p styleName='info'>{item.info}</p>
              </div>
            </li>)
          }
        </ul>
      </section>

      <section styleName='card telUs'>
        <Link to='/want'><img src={wantPic} /></Link>
      </section>
      <BuyPanel
        show={this.state.show}
        price={'￥' + buyInfo.price}
        info={buyInfo.info}
        content={buyInfo.content}
        onChange={this.handleChangeBuyInfo.bind(this)}
        onSubmit={this.handleSubmit.bind(this)}
        onClickCover={this.handleCover.bind(this)} />
      <FootBar onBuy={this.handleBuyItem.bind(this)} />
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
