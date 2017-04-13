import React, { PureComponent, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  propstypes = {
    data: PropTypes.array,
    settings: PropTypes.object,
    slideStyle: PropTypes.object
  }
  defaultProps = {
    data: [],
    settings: {},
    slideStyle: {}
  }

  render () {
    const { data, setting, slideStyle, needDesc } = this.props
    const settings = Object.assign({
      dots: true,
      customPaging: () => <a />,
      infinite: true,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: true,
      arrows: false,
      autoplay: data.length > 1,
      autoplaySpeed: 5000
    }, setting)
    console.log(data, settings, 'ssssss')
    return (
      <div styleName='wrap'>
        {
          !data.length
          ? <div styleName='empty'>loading...</div>
          : <Slider {...settings}>
            {
              data.map((item, i) => <div key={i} style={slideStyle}>
                <Link to={item.redirect_url ? item.redirect_url : ''}>
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
