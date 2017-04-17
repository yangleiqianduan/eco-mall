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
    slideStyle: PropTypes.object,
    needDesc: PropTypes.bool,
    onClick: PropTypes.func
  }
  defaultProps = {
    data: [],
    settings: {},
    slideStyle: {}
  }

  render () {
    const { data, setting, slideStyle, needDesc, onClick } = this.props
    const settings = Object.assign({
      dots: true,
      customPaging: () => <a />,
      infinite: false,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
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
                <Link onClick={onClick} to={item.redirect_url ? item.redirect_url : ''}>
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
