import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'

import styles from './FullScreen.styl'
import Slider from './index.js'
import Icon from 'components/Icons/'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  state = {
    current: this.props.currentImage
  }
  render () {
    const { data, onClose, currentImage = 0 } = this.props
    const { current } = this.state
    return <section styleName='showPic' onClick={onClose}>
      <span styleName='close' onClick={onClose}>
        <Icon icon={'layerClose'} width={'40'} />
      </span>
      <div styleName='sliderWrap' onClick={(e) => e.stopPropagation()}>
        <Slider
          data={data}
          setting={{initialSlide: currentImage, dots: false, autoplay: false, afterChange: (e) => this.setState({current: e})}} />
      </div>
      {
        data.length > 0
        ? <div onClick={onClose} styleName='page'><strong>{current + 1}</strong>/{data.length}</div>
        : null
      }
    </section>
  }
}
