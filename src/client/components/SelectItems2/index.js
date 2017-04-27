import React, { PureComponent, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import MenuTitle from 'components/MenuTitle'
import Icon from 'components/Icons'
import Slider from 'components/Slider/'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  static defaultProps = {
    limited: 0
  }
  state = {
    pics: [],
    show: false,
    currentImage: 0,
    showFullscreen: false
  }
  handleChange (itemIndex) {
    const { selected, limited } = this.props
    if (!limited || selected.indexOf(itemIndex) >= 0 || selected.length < limited) {
      this.props.onChange(itemIndex)
    } else {
      this.props.onChange(itemIndex, limited)
    }
  }
  picShow = (i) => {
    let pics = []
    this.props.menu.voteQuestionChoiceList[i].imageUrlArr.map(item => pics.push({img_url: item}))
    this.setState({
      show: true,
      pics
    })
  }
  closePicShow = () => {
    this.setState({
      show: false
    })
  }

  handleShowFullscreen = (e) => {
    e.preventDefault()
    this.setState({showFullscreen: true})
  }

  render () {
    const { menu, selected, noTit } = this.props || {}
    console.log('singleItem:', menu, selected, this.state)
    const { currentImage, showFullscreen, pics, show } = this.state

    return <div styleName='wrap'>
      {
        !noTit && <MenuTitle text={ menu.title } />
      }
      <ul>
        {
          menu.voteQuestionChoiceList.map((item, i) => {
            return <li key={i} styleName='item'>
              <div>
                <div styleName='picWrap' onClick={ this.picShow.bind(this, i) }>
                  <img src={ item.imageUrlArr[0] } alt='' />
                  {
                    item.imageUrlArr.length > 1 &&
                    <span styleName='tag'>{item.imageUrlArr.length}图</span>
                  }
                </div>
                <div styleName='detail' onClick={ () => this.handleChange(i) }>
                  <h3 styleName='tit'>{item.title}</h3>
                  <p styleName='desc'>{item.description}</p>
                </div>
                <div onClick={ () => this.handleChange(i) }>
                  <Icon icon = { selected.indexOf(i) >= 0 ? 'checked' : 'unChecked' } width={16} fill = '#394043' />
                </div>
              </div>
            </li>
          })
        }
      </ul>
      {
        this.state.pics.length > 0 && show &&
        <section styleName='showPic'>
          <i styleName='close' onClick={this.closePicShow}>X</i>
          <div styleName='sliderWrap'>
            <Slider
              data={ pics }
              onClick={this.handleShowFullscreen}
              setting={{dots: false, autoplay: false, afterChange: (e) => this.setState({currentImage: e})}} />
            </div>
          {
            pics.length > 0
            ? <div styleName='page'><strong>{currentImage + 1}</strong>/{this.state.pics.length}</div>
            : null
          }
        </section>
      }
    </div>
  }
}
