import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'

import styles from './FullScreen.styl'
import Slider from './index.js'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  state = {
    current: this.props.currentImage
  }
  render () {
    const { data, onClose, currentImage = 0 } = this.props
    const { current } = this.state
    return <section styleName='showPic' onClick={onClose}>
      {
        data.length > 0
        ? <div styleName='page' />
        : null
      }
      <div styleName='sliderWrap'>
        <Slider
          onClick={e => { e.preventDefault(); onClose() }}
          data={data}
          setting={{initialSlide: currentImage, dots: false, autoplay: false, afterChange: (e) => this.setState({current: e})}} />
      </div>
      {
        data.length > 0
        ? <div styleName='page'><strong>{current + 1}</strong>/{data.length}</div>
        : null
      }
    </section>
  }
}
