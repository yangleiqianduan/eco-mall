import React, { PureComponent, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  static defaultProps = {
    limited: 1
  };
  handleChange (item) {
    let selected = this.props.selected;
    let bool = selected.includes(item);
    if((this.props.limited != this.props.selected.length) || bool) {
    //   let value = bool ? selected.filter(i => i != item) : [...selected, item]
      this.props.onChange(item);
    }
  }
  render () {
    const { list, selected } = this.props;
    console.log(selected)
    console.log(selected.includes('价格'))
    return (
      <div styleName='wrap'>
        {
          list.map((item, i) => <div key={i}>
            <div styleName={selected.includes(item) ? 'selected' : 'unselected'} onClick={() => this.handleChange(item)}>
              {item}
            </div>
          </div>)
        }
      </div>
    )
  }
}

