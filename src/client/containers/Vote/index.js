import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions/vote'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
import telUsPic from 'common/img/telUs.png'
import whatILikePic from 'common/img/whatILike.png'

import SelectItems2 from 'components/SelectItems2'

@CSSModules(styles, { allowMultiple: true })
export class Vote extends PureComponent {

  changeItem = (menuIndex, itemIndex) => {
    // console.log('menuIndex:',menuIndex,'itemIndex',itemIndex)
    this.props.dispatch(actions.selectItem({menuIndex, itemIndex}))
  }

  render () {
    const { list, selected } = this.props.vote.toJS() || {}
    // console.log('kkkKK:', list, selected)

    return <div styleName='wrap'>
      <section styleName='banner'>
        <img src={ whatILikePic } alt="" />
      </section>
      {
        list
        ? list.map((menu, i) => {
            return <SelectItems2 key={i} menu={ menu } selected={ selected[i] } onChange={(itemIndex) => this.changeItem.bind(this, i, itemIndex)}/>
          })
        : null
      }

    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  vote: state.vote
})

export default connect(mapStateToProps)(Vote)
