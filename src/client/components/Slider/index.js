import React, { PureComponent, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'
import classNames from 'classnames/bind'

import { Link } from 'react-router-dom'
import Slider from 'react-slick-cong'
import 'slick-carousel/slick/slick.css'
import './slider.css'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  propstypes = {
    data: PropTypes.array,
    settings: PropTypes.object,
    slideStyle: PropTypes.object,
    needDesc: PropTypes.bool,
    onClick: PropTypes.func
  }
  defaultProps = {
    data: [],
    settings: {},
    slideStyle: {}
  }

  handleRedirect = (e, url) => {
    e.preventDefault()
    window.location = url
  }

  handleClick = (e, i, item) => {
    if (this.props.onClick) {
      return this.props.onClick(e, i, item)
    }
    if ((item.redirect_url || '').indexOf('http') === 0) {
      e.preventDefault()
      window.location = item.redirect_url
    }
    if (!item.redirect_url) {
      e.preventDefault()
    }
  }

  render () {
    const { data, setting, slideStyle, needDesc } = this.props
    const settings = Object.assign({
      dots: true,
      useCSS: true,
      customPaging: () => <a />,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: data.length > 1,
      autoplaySpeed: 5000
    }, setting)
    return (
      <div styleName='wrap'>
        {
          !data.length
          ? <div styleName='empty'>loading...</div>
          : <Slider {...settings}>
            {
              data.map((item, i) => <div key={i} style={slideStyle} className={classNames({needMaxWidth: needDesc && !setting.infinite})}>
                <Link onClick={(e) => this.handleClick(e, i, item)} to={item.redirect_url ? item.redirect_url : ''}>
                  <img className='slick-img' src={item.img_url} />
                  {
                    needDesc
                    ? <div>
                      <h3 styleName='title'>{item.title}</h3>
                      <p styleName='desc'>{item.desc}</p>
                    </div>
                    : null
                  }
                </Link>
              </div>)
            }
          </Slider>
        }
      </div>
    )
  }
}
