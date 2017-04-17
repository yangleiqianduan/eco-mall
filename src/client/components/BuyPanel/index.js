import React, { PureComponent, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
    show: PropTypes.bool,
  }
  
  handleClick = (e) => {
    this.props.onClickCover(e)
  }
  render () {
    return <div styleName='wrap'>
    {
      this.props.show
      ? <div styleName='cover' onClick={this.handleClick.bind(this)}></div>
      : null
    }
    {
      this.props.show
      ? <div styleName='infoContainer'>
          <div styleName='picContainer'>
          </div>
          <div>
          <div styleName='price'>{this.props.price}</div>
          <div styleName='info'>{this.props.info}</div>
          <div styleName='close' onClick={this.handleClick.bind(this)}>&times;</div>
          <div styleName='line'></div>
          </div>
          {
            this.props.content.map(item => {
            return <div styleName='subContainer focus'>
              <div styleName='title'>{item.label}</div>
              <div>
                <input type={item.type} placeholder={'请输入'+item.label} />
              </div>
            </div>
          })
          }
        </div>
      : null
    }
    
    </div>
  }
}
