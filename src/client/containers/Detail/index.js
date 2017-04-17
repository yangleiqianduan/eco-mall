import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { createArray } from 'common/utils'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
import FootBar from 'components/FootBar/'
import Slider from 'components/Slider/'
import BuyPanel from 'components/BuyPanel'

@CSSModules(styles, {allowMultiple: true})
export class Detail extends PureComponent {
  state={
    show: false
  }
  handleBuyItem = () => {
    this.setState({show: true})
  } 
  handleCover = () => {
    this.setState({show: false})
  }
  render () {
    const { banner, baseInfo, choose, detailInfo, goodsStandard ,ensureInfo , telUs} = this.props.data.toJS()
    return <div styleName='wrap'>
      <section styleName='banner'>
        <Slider data={banner} />
      </section>
      <section styleName='card baseInfo'>
        <header>
          <div styleName='left'>
            <h1>{baseInfo.title}</h1>
            {
              baseInfo.tags
              ? <div styleName='tags'>
                  {
                    baseInfo.tags.map((item,i) => {
                      return <span styleName='item' key={i}>{item} ></span>
                    })
                  }
                </div>
              : <div styleName='tags'></div>
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
              baseInfo.tips.map((item,i) => {
                return <li key={i} styleName='item'>{item}</li>
              })
            }
          </ul>
        </footer>
      </section>

      <section styleName='card choose'>
        已选：<span>{choose.standard}</span>
      </section>

      <section styleName='card detailInfo'>
        <h2>商品详情</h2>
        <img src={detailInfo.pic} alt=""/>
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
            ensureInfo.map((item, i) => {
              return  <li key={i}>
                <div styleName='picWrap'><img src={item.icon} alt=""/></div>
                <div>
                  <p styleName='tit'>{item.tit}</p>
                  <p styleName='info'>{item.info}</p>
                </div>
              </li>
            })
          }
        </ul>
      </section>

      <section styleName='card telUs'>
        <a href="#"><img src={telUs.pic} alt=""/></a>
      </section>
      <BuyPanel 
        show={this.state.show} 
        onClickCover={this.handleCover.bind(this)}
        price={'￥2310'}
        info={'预定111111111111112222222222333333'}
        content={[{label: '手机号', type: 'text'}, {label: '系统号', type: 'text'}]}
      >
      </BuyPanel>
      <FootBar icon={null} text={'确认购买'} onClick={this.handleBuyItem.bind(this)}/>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.detail
})

export default connect(mapStateToProps)(Detail)
