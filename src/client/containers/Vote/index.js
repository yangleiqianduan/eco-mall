import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
import telUsPic from 'common/img/telUs.png'
import whatILikePic from 'common/img/whatILike.png'

import MenuTitle from 'components/MenuTitle'

@CSSModules(styles, { allowMultiple: true })
export class Vote extends PureComponent {

  render () {

    return <div styleName='wrap'>
      <section styleName='banner'>
        <img src={ whatILikePic } alt="" />
      </section>
      <MenuTitle text='精选沙发' />
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.vote
})

export default connect(mapStateToProps)(Vote)
