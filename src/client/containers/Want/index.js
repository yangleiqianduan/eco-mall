import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Upload from 'components/Upload/'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export class Want extends PureComponent {
  render () {
    const { collocation: testList } = this.props.home.toJS()
    return <div styleName='wrap'>
      <h2 styleName='title'>你想买什么，告诉我们</h2>
      <p>有任何想购买的“尖货”，请告诉我们，后续它就有可能出现在这里！</p>
      <div>
        <textarea styleName='input' type='text' placeholder='点此输入商品名称或淘宝地址' />
      </div>
      <div>
        上传商品截图
        <div styleName='uploadOuter'>
          <Upload list={testList.map(item => ({src: item.img_url}))} url='123' size={{width: '6.2rem', height: '6.2rem'}} />
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  home: state.home
})

export default connect(mapStateToProps)(Want)
