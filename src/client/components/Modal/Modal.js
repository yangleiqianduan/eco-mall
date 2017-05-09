import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'

import styles from './index.styl'
@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export class Modal extends PureComponent {
  static defaultProps = {
    theme: {
      highlightColor: '#fff',
      primaryColor: '#2c97e8',
      secondaryColor: '#2c97e8'
    }
  }

  componentDidMount () {
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', this.checkKeydown)
  }

  componentWillUnmount () {
    document.body.style.overflow = 'auto'
    window.removeEventListener('keydown', this.checkKeydown)
  }

  checkKeydown = (e) => {
    if (e.code === 'Enter') {
      this.props.onSure && this.props.onSure()
    }

    if (e.code === 'Escape') {
      this.props.onClose && this.props.onClose()
    }
  }

  render () {
    const {
      type,
      title,
      text,
      children,
      overlap,
      showClose,
      onClose,
      onCancel,
      onSure,
      cancelText,
      sureText,
      style
    } = this.props

    return <div styleName='wrap' style={Object.assign({}, overlap ? {background: 'rgba(0,0,0,0)'} : null, style)}>
      <div styleName='modalContainer'>
        {title
        ? <div styleName='head'>
          <div styleName='titleArea'>
            {title}
            {showClose ? <div styleName='closeBtnArea' onClick={onClose}>&times;</div> : null}
          </div>
        </div>
        : null
        }
        <div styleName='content'>
          {children || text}
        </div>
        <div styleName='btnArea'>
          {type === 'confirm' ? <a styleName='unobviousBtn btn' onClick={onCancel}>{cancelText || '取消'}</a> : null}
          <a styleName='obviousBtn btn' onClick={onSure}>{sureText || '确定'}</a>
        </div>
      </div>
    </div>
  }
}
