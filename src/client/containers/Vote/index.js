import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions/vote'
import { showToast } from 'actions/index'

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
    const query = this.props.location.query.vote_id
    this.props.dispatch(actions.getVoteOptions(query))
  }
  componentWillReceiveProps (nextProps) {
    const { list, selected } = nextProps.vote.toJS() || {}
    if (list) {
      let curSelected  = []
      selected.forEach((menu, i) => {
        menu.forEach((item, j) => {
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

  changeItem = (menuIndex, itemIndex, isLimited) => {
    if (!isLimited) {
      this.props.dispatch(actions.selectItem({menuIndex, itemIndex}))
    } else {
      this.props.dispatch(showToast('该品类最多选择'+isLimited+'个'))
    }
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
    const { list, selected, coverImage, title, description } = this.props.vote.toJS() || {}
    // console.log('end of redux Dataaaaaaa :', list, selected)

    return <div styleName='wrap'>
      <section styleName='banner'>
        <h1>{ title }</h1>
        <h2>{ description }</h2>
        {
          coverImage && <img src={ coverImage } alt="" />
        }
      </section>
      {
        list &&
        list.map((menu, i) => {
          return <SelectItems2 key={i} menu={ menu } selected={ selected[i] } limited={ menu.voteQuestion } noTit={ list.length===1 && true } onChange={this.changeItem.bind(this, i)}/>
        })
      }
      {
        list &&
        <div styleName="G-card">
          <Button onClick={ this.handleSubmit } disabled = {this.state.selected.length > 0 ? false : true}>投票</Button>
        </div>
      }


      <TelUs data={ {link: '/want', pic: telUsPic} }/>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  vote: state.vote
})

export default connect(mapStateToProps)(Vote)
