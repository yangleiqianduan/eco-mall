import React, { Component, PropTypes } from 'react'
import * as icons from './icons'

const defaultStyle = {
  fill: 'currentColor',
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
    size: 24
  }

  addUnit (size) {
    let result = parseFloat(size) && parseFloat(size) === +size
      ? size += 'px'
      : size
    return result
  }

  render () {
    const Icon = icons[this.props.icon] || this.props.icon || ''
    let style = Object.assign({}, defaultStyle)
    if (this.props.fill) style.fill = this.props.fill
    if (this.props.stroke) style.stroke = this.props.stroke
    let size = this.props.size
    style.height = style.width = this.addUnit(size)
    return <span style={Object.assign({}, this.props.style)}>
      {this.props.dir === 'right' ? this.props.children : ''}
      <svg
        viewBox='-1 -1 25 25'
        preserveAspectRatio='xMidYMid meet'
        style={style}>
        <Icon />
      </svg>
      {this.props.dir === 'right' ? '' : this.props.children}
    </span>
  }
}
