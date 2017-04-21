import React, { Component, PropTypes } from 'react'
import * as icons from './icons'
import { iconsInfo } from './iconsInfo'

const defaultStyle = {
  fill: 'currentColor',
  stroke: 'currentColor',
  verticalAlign: 'middle',
  display: 'inline-block',
  pointerEvents: 'none',
  WebkitUserSelect: 'none'
}

export default class extends Component {
  static propTypes = {
    icon: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.string
    ]).isRequired,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    style: PropTypes.object,
    fill: PropTypes.string,
    stroke: PropTypes.string,
    dir: PropTypes.oneOf([
      'left',
      'right'
    ])
  }

  static defaultProps = {
    width: 24
  }

  formatInfo (iconInfo, size, rootSize) {
    const width = parseInt(size) && (parseInt(size) / rootSize + 'rem') || iconInfo.width / rootSize + 'rem'
    const height = parseInt(size) && ((parseInt(size) / iconInfo.width) * iconInfo.height / rootSize + 'rem') || iconInfo.height / rootSize + 'rem'
    let result = {
      width,
      height,
      viewBox: '-1 -1 ' + (iconInfo.width+1) + ' ' + (iconInfo.height+1)
    }

    return result
  }

  render () {
    const Icon = icons[this.props.icon] || this.props.icon || ''
    const rootSize =100
    let iconInfo = this.formatInfo(iconsInfo[this.props.icon], this.props.width, rootSize)
    let style = Object.assign({}, defaultStyle)
    style.width = iconInfo.width
    style.height = (parseInt(this.props.height) && (parseInt(this.props.height)/rootSize + 'rem')) || iconInfo.height
    this.props.fill && (style.fill = this.props.fill)
    this.props.stroke && (style.stroke = this.props.stroke)


    return <span style={Object.assign({}, this.props.style)}>
      {this.props.dir === 'right' ? this.props.children : ''}
      <svg
        viewBox = { iconInfo.viewBox }
        preserveAspectRatio='xMidYMid meet'
        style={style}>
        <Icon />
      </svg>
      {this.props.dir === 'right' ? '' : this.props.children}
    </span>
  }
}
