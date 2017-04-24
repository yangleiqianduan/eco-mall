import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions/voteResult'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import ResultList from 'components/ResultList'
import whatILikePic from 'common/img/whatILike.png'


@CSSModules(styles, { allowMultiple: true })
export class VoteResult extends PureComponent {
  render () {
    const { list } = this.props.vote.toJS() || {}

    return <div styleName='wrap'>
      <section styleName='banner'>
        <img src={ whatILikePic } alt="" />
      </section>
      {
        list &&
        list.map((menu, i) => {
          return <ResultList key={i} menu={ menu } noTit={ list.length===1 && true }/>
        })
      }
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  vote: state.voteResult
})

export default connect(mapStateToProps)(VoteResult)
