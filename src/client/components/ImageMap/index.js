import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

export default CSSModules(({data}) => <div styleName='wrap'>
  <div styleName='imgOuter'>
    <img styleName='img' src={data.pictureUrl} />
    {
      data.productInfo.map((item, i) => <div styleName='tag' style={{top: `${item.yCoordinate * 100}%`, left: `${item.xCoordinate * 100}%`}}>
        <div styleName='tagPoint' />
        <div styleName='tagContainer'>{item.title}</div>
      </div>)
    }
  </div>
  <section>
    <h2>阅读角·安心一隅</h2>
    <p>阿萨德法师打发多发点飒飒的，阿萨德发的发生的，撒的发生</p>
  </section>
</div>, styles)
