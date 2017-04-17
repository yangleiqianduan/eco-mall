import React, { PureComponent, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import styles from './index.styl'

import Icon from 'components/Icon/'

const basicStyle = {
  width: '120px',
  height: '120px',
  border: '1px solid rgba(0, 0, 0, .2)',
  borderRadius: '3px',
  position: 'relative'
}

@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class extends PureComponent {
  static propTypes = {
    src: PropTypes.string,
    status: PropTypes.number,  // 0: 未上传 1: 上传中 2: 上传成功 -1: 上传失败
    size: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string
    }),
    onDelete: PropTypes.func,
    loadingIcon: PropTypes.func,
    onClick: PropTypes.func
  }
  renderMaskByStatue = (status) => {
    const LoadingIcon = this.props.loadingIcon
    switch (status) {
      case 0:
        return null
      case 1:
        return <div styleName='mask'>{LoadingIcon ? <LoadingIcon /> : '上传中'}</div>
      case 2:
        return null
      case -1:
        return <div styleName='mask failed'><span styleName='uploadFailed'>上传失败</span></div>
      default:
        return null
    }
  }
  render () {
    const { src, size, status } = this.props
    return <div styleName='preview'>
      <div styleName='imageContainer' style={Object.assign({}, basicStyle, size)}>
        {this.renderMaskByStatue(status)}
        <img src={src} onClick={this.props.onClick} />
        {
          status === 1 ? null : <span styleName='close' onClick={e => this.props.onDelete(e)}><Icon icon='sub' /></span>
        }
      </div>
    </div>
  }
}
