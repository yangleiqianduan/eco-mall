import React, { PureComponent, PropTypes } from 'react'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

import MenuTitle from 'components/MenuTitle'

@CSSModules(styles, {allowMultiple: true})
export default class extends PureComponent {

  render () {
    const { menu, noTit } = this.props || {}
    console.log('singleItem:', menu, !noTit)

    return <div styleName='wrap'>
      {
        !noTit && <MenuTitle text={ menu.title } />
      }
      <ul>
        {
          menu.voteQuestionChoiceList.map((item, i) => {
            return <li key={i} styleName='item'>
              <div styleName='picWrap'>
                <img src={ item.imageUrlArr[0] } alt='' />
              </div>
              <section styleName='detail'>
                <header>
                  <div styleName='left'>
                    <h3 styleName='tit'>{item.title}</h3>
                    <p styleName='desc'>{item.description}</p>
                  </div>
                  <div styleName='right'>
                    <p styleName='prec'>{ (item.totalVoteRate || 0) * 100 }%</p>
                    <p styleName='count'>{ item.totalVoteCount }票</p>
                  </div>
                </header>
                <footer styleName='progressBar'>
                  <span style={{ width: (item.totalVoteRate || 0) * 100 + '%' }}>{ item.votePerc }</span>
                </footer>
              </section>
            </li>
          })
        }
      </ul>
    </div>

  }

}
