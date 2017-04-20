import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Icon from '../index'

@CSSModules(styles, {allowMultiple: true})
export default class extends Component {
  render () {
    return <div styleName='wrap'>

      <section>
        <h2>1.首页:</h2>
        <Icon icon = {'bedroom'} />
        <Icon icon = {'wooden'} />
        <Icon icon = {'wooden'} />

        <br/><br/>

        <Icon icon = {'personal'} size = {14} stroke = {'#FFF'} />
        <Icon icon = {'cart'} size={18} stroke = {'#FFF'}/>

        <br/><br/>
        <h2>2.专题页:</h2>
        <Icon icon = {'arrow'} size={6} style = {{color: '#000'}}/>
        <Icon icon = {'arrow'} size={6} style = {{color: '#bbbdbe'}}/>
        <br/> <br/>
        <h2>3.商品详情页</h2>
        <Icon icon = {'ensureTag1'} size={38} style = {{color: '#6B7072'}} />
        <Icon icon = {'ensureTag2'} size={38} style = {{color: '#6B7072'}} />
        <Icon icon = {'ensureTag3'} size={38} style = {{color: '#6B7072'}} />
        <br/> <br/>
        <h2>4.其它</h2>
        <Icon icon = {'checked'} size={15} style = {{color: '#394043'}} />
        <Icon icon = {'unChecked'} size={15} style = {{color: '#394043'}} />
        <Icon icon = {'quotes'} size={24} fill = {'#394043'} />
        <Icon icon = {'switchBtn'} size={21} fill={'#FFF'}/>
        <Icon icon = {'location'} size={12} style = {{color: '#000'}} />
        <Icon icon = {'successBig'} size = {'45px'} fill = {'#00AE66'} />
      </section>


    </div>
  }
}
