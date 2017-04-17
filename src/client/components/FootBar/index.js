import React, { PureComponent, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func,
  }
  handleClick = (e) => {
    this.props.onClick(e)
  }
  render () {
    return <div styleName='wrap'>
      <div styleName='content' onClick={this.handleClick.bind(this)}>
        <div>{this.props.icon}</div>
        <div>{this.props.text}</div>
      </div>
    </div>
  }
}
