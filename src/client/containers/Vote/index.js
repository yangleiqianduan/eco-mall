import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions/vote'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import SelectItems2 from 'components/SelectItems2'
import Button from 'components/Button/'
import TelUs from 'components/TelUs'

import telUsPic from 'common/img/telUs.png'
// import whatILikePic from 'common/img/whatILike.png'

@CSSModules(styles, { allowMultiple: true })
export class Vote extends PureComponent {
  componentDidMount () {
    this.props.dispatch(actions.getVoteOptions())
  }
  componentWillReceiveProps (nextProps) {
    const { list, selected } = nextProps.vote.toJS() || {}
    if (list) {
      let curSelected  = []
      selected.length>0 && selected[0].length > 0 &&
      selected.map((menu, i) => {
        menu.map((item, j) => {
          curSelected.push(list[i].voteQuestionChoiceList[j].voteQuestionChoiceId)
        })
      })
      this.setState({
        selected: curSelected
      }, () => console.log('checkCurState:', this.state))
    }
  }

  state = {
    selected: []
  }

  changeItem = (menuIndex, itemIndex) => {
    // console.log('menuIndex:',menuIndex,'itemIndex',itemIndex)
    this.props.dispatch(actions.selectItem({menuIndex, itemIndex}))
  }
  handleSubmit = () => {
    const { voteId } = this.props.vote.toJS() || {}
    if (!localStorage.getItem("user_id")) {
      localStorage.setItem("user_id", parseInt(Math.random()*100000000+1))
    }
    const params = {
      vote_id: voteId,
      user_id: localStorage.getItem("user_id") || '12345678',
      choice_ids: this.state.selected
    }
    this.state.selected.length > 0 && this.props.dispatch(actions.sendChoose(params))
  }

  render () {
    const { list, selected, coverImage } = this.props.vote.toJS() || {}
    // const data = this.props.vote.toJS() || {}
    console.log('end of redux Dataaaaaaa :', list, selected)

    return <div styleName='wrap'>
      <section styleName='banner'>
        {
          coverImage && <img src={ coverImage } alt="" />
        }
      </section>
      {
        list &&
        list.map((menu, i) => {
          return <SelectItems2 key={i} menu={ menu } selected={ selected[i] } noTit={ list.length===1 && true } onChange={(itemIndex) => this.changeItem.bind(this, i, itemIndex)}/>
        })
      }
      <div styleName="G-card">
        <Button onClick={ this.handleSubmit } disabled = {this.state.selected.length > 0 ? false : true}>投票</Button>
      </div>

      <TelUs data={ {link: '/want', pic: telUsPic} }/>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  vote: state.vote
})

export default connect(mapStateToProps)(Vote)
