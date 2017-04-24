import React, { PureComponent, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import MenuTitle from 'components/MenuTitle'
import Icon from 'components/Icons'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {
  picShow = () => {
    alert('展示大图')
  }

  render () {
    const { menu, selected } = this.props || {}
    // console.log('singleItem:', menu, selected)

    return <div styleName='wrap'>
      <MenuTitle text={ menu.type } />
      <ul>
        {
          menu.items.map((item, i) => {
            return <li key={i} styleName='item'>
              <div styleName='picWrap' onClick={ this.picShow }>
                <img src={ item.pics[0] } alt='' />
                {
                  item.pics.length > 1 &&
                  <span styleName='tag'>{item.pics.length}图</span>
                }
              </div>
              <div styleName='detail' onClick={ this.props.onChange(i) }>
                <h3 styleName='tit'>{item.title}</h3>
                <p styleName='desc'>{item.description}</p>
              </div>
              <div onClick={ this.props.onChange(i) }>
                <Icon icon = { selected.includes(i) ? 'checked' : 'unChecked' } width={15} fill = '#394043' />
              </div>
            </li>
          })
        }
      </ul>
    </div>

  }

}
