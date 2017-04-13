import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import ProductItem from 'components/ProductItem/'

export default CSSModules(({ data = [] }) => <div styleName='wrap'>
  {
    data.map((item, i) => <div key={i} styleName='container'>
      <div styleName='inner'>
        <ProductItem data={item} />
      </div>
    </div>)
  }
</div>, styles, {allowMultiple: true})
