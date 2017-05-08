import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Item.styl'
import classNames from 'classnames/bind'

import Icon from 'components/Icons/'

@CSSModules(styles, { allowMultiple: true })
export default class extends PureComponent {
  state = {
    showDelete: false,
    touchStartPosition: 0,
    innerHeight: 135
  }
  componentDidMount () {
    this.setState({innerHeight: this.refs.inner.getBoundingClientRect().height})
  }
  componentWillUnount () {
    window.clearTimeout(this.hidden)
  }
  showDelete = () => {
    this.setState({
      showDelete: true
    })
    this.hidden = setTimeout(() => this.setState({showDelete: false}), 2000)
  }
  hiddenDelete = () => {
    window.clearTimeout(this.hidden)
    this.setState({showDelete: false})
  }
  onTouchStart = (e) => {
    this.setState({touchStartPosition: e.changedTouches[0].clientX})
  }
  onTouchMove = (e) => {
    const currentPosition = e.changedTouches[0].clientX
    if (currentPosition - this.state.touchStartPosition < -70) {
      this.setState({touchStartPosition: currentPosition})
      this.showDelete()
    } else if (currentPosition - this.state.touchStartPosition > 70) {
      this.setState({touchStartPosition: currentPosition})
      this.hiddenDelete()
    }
  }
  render () {
    const deleteStyl = classNames('delete', {showDelete: this.state.showDelete})
    return <div styleName='wrap' style={{height: this.state.innerHeight + 'px'}}>
      <div styleName='inner' ref='inner'>
        <div styleName='pannel' onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} style={{width: document.body.getBoundingClientRect().width + 'px'}}>
          <div styleName='checkArea'><Icon icon='checked' width={18} /></div>
          <div><img styleName='img' /></div>
          <div styleName='titleArea'>
            <div styleName='title'>这里是文案文字最多一行是是</div>
            <div styleName='light'>尺寸: 150cmX80cm;颜色:火山黑</div>
            <div>￥1999</div>
          </div>
        </div>
        <div styleName={deleteStyl}>
          删除
        </div>
      </div>
    </div>
  }
}
