import React, { Component, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import Icon from '../index'

@CSSModules(styles, {allowMultiple: true})
export default class extends Component {
  render () {
    return <div styleName='wrap'>

      <section>
        <h2>首页:</h2>
        <Icon icon = {'bedroom'} width={30} />
        <Icon icon = {'wooden'} width={30} height={29}/>
        <Icon icon = {'sofa'} width={30} height={29}/>
        <br/> <br/>
        <h2>售后保障</h2>
        <Icon icon = {'ensureTag1'} width={38} style = {{color: '#6B7072'}} />
        <Icon icon = {'ensureTag2'} width={38} style = {{color: '#6B7072'}} />
        <Icon icon = {'ensureTag3'} width={38} style = {{color: '#6B7072'}} />
        <br/><br/>
        <h2>支付</h2>
        <Icon icon = {'weixin'} width={28} fill={'#3ACB00'}/>
        <Icon icon = {'zhifubao'} width={28} fill={'#369FEC'} />
        <br/><br/>
        <h2>辅助 icon</h2>
        <Icon icon = {'personal'} width = {14} stroke = {'#FFF'} />
        <Icon icon = {'cart'} width={18} stroke = {'#FFF'}/>
        <Icon icon = {'listener'} width={18} stroke = {'#FFF'}/>

        <br/><br/>
        <h2>方向</h2>
        <Icon icon = {'arrow'} width={6} style = {{color: '#000'}}/>
        <Icon icon = {'arrow'} width={6} style = {{color: '#bbbdbe'}}/>
        <br/> <br/>

        <h2>其它</h2>
        <Icon icon = {'checked'} width={15} style = {{color: '#394043'}} />
        <Icon icon = {'unChecked'} width={15} style = {{color: '#394043'}} />
        <Icon icon = {'quotes'} width={24} fill = {'#394043'} />
        <Icon icon = {'switchBtn'} width={21} fill={'#FFF'}/>
        <Icon icon = {'location'} width={12} style = {{color: '#000'}} />
        <Icon icon = {'successBig'} width = {'45px'} fill = {'#00AE66'} />
      </section>


    </div>
  }
}
