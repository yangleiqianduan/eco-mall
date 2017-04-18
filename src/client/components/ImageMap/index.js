import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import { Link } from 'react-router-dom'

export default CSSModules(({data}) => <div styleName='wrap'>
  <div styleName='imgOuter'>
    <img styleName='img' src={data.pictureUrl} />
    {
      data.productInfo.map((item, i) => <Link to={`/item?id=${item.productId}`} key={i}>
        <div styleName='tag' style={{top: `${item.yCoordinate * 100}%`, left: `${item.xCoordinate * 100}%`}}>
          <div styleName='tagPoint' />
          <div styleName='tagContainer'>{item.title}</div>
        </div>
      </Link>)
    }
  </div>
  <section>
    <h2>{data.productMixName}</h2>
    <p>{data.productMixDescription}</p>
  </section>
</div>, styles)
