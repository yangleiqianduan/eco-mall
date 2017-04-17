import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Slider from 'components/Slider/'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import { Link } from 'react-router-dom'
import FootBar from 'components/FootBar/'

@CSSModules(styles, {allowMultiple: true})
export class Detail extends PureComponent {
  state = {
    currentImage: 0
  }

  render () {
    const { banner, baseInfo, choose, detailInfo, goodsStandard, ensureInfo, telUs } = this.props.data.toJS()
    const { currentImage } = this.state
    return <div styleName='wrap'>
      <section styleName='banner'>
        <Slider data={banner} setting={{dots: false, autoplay: false, afterChange: (e) => this.setState({currentImage: e})}} />
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
        <Link to='/want'><img src={telUs.pic} /></Link>
      </section>

      <FootBar />
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.detail
})

export default connect(mapStateToProps)(Detail)
