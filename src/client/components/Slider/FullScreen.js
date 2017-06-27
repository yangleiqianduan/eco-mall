import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'

import styles from './FullScreen.styl'
import Slider from 'react-slick-cong'
import 'slick-carousel/slick/slick.css'
import './slider.css'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  state = {
    current: this.props.currentImage || 0
  }
  render () {
    const { data, onClose, currentImage = 0, setting = {} } = this.props
    const { current } = this.state
    const settings = Object.assign({
      useCSS: true,
      customPaging: () => <a />,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplaySpeed: 5000,
      initialSlide: currentImage,
      dots: false,
      autoplay: false,
      afterChange: (e) => this.setState({current: e})
    }, setting)
    return <ReactCSSTransitionGroup
      transitionName='fade'
      transitionAppear
      transitionAppearTimeout={300}
      transitionEnter={false}
      transitionLeave={false} >
      <section styleName='showPic' onClick={onClose}>
        {
          data.length > 0
          ? <div styleName='page' />
          : null
        }
        <div styleName='sliderWrap'>
          <Slider {...settings}>
            {
              data.map((item, i) => <div key={i}>
                <img className='slick-img' src={item.img_url} />
              </div>)
            }
          </Slider>
        </div>
        {
          data.length > 0
          ? <div styleName='page'><strong>{current + 1}</strong>/{data.length}</div>
          : null
        }
      </section>
    </ReactCSSTransitionGroup>
  }
}
