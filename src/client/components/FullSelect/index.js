import React, { PureComponent } from 'react'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
import classNames from 'classnames/bind'

@CSSModules(styles, { allowMultiple: true })
export default class extends PureComponent {
  render () {
    const { open, onSure, onClose, data, current, onChange, onChangeValue } = this.props
    const canSubmit = data.filter(d => d.value).length === data.length
    return <div styleName={classNames('wrap', {wrapShow: open})}>
      {
        open ? <div styleName='cover' onClick={onClose} /> : null
      }
      <div styleName={classNames('optionsWrap', {open})}>
        <div styleName='optionsHeader'>
          {data.map((item, i) => <span onClick={() => onChange(['areaSelect'], {current: i})} key={i} styleName={classNames('value', {active: i === current})}>{item.label}</span>)}
          <div styleName={classNames('sure', {disabled: !canSubmit})} onClick={canSubmit ? () => onSure(data) : null}>确定</div>
        </div>
        <ul styleName='optionsContent'>
          {data[current].options.map((op, i) => <li onClick={() => onChangeValue({current, data, select: op})} key={i} styleName={classNames({active: op.value === data[current].value})}>{op.label}</li>)}
        </ul>
      </div>
    </div>
  }
}
