import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions/vote'
import * as Utils from 'common/utils'
import { showToast, changeRouter } from 'actions/index'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import SelectItems2 from 'components/SelectItems2'
import Button from 'components/Button/'
import TelUs from 'components/TelUs'

import { setShare } from 'common/bridge'
import telUsPic from 'common/img/telUs.png'
// import whatILikePic from 'common/img/whatILike.png'

@CSSModules(styles, { allowMultiple: true })
export class Vote extends PureComponent {
  componentWillMount () {
    const query = this.props.location.query.vote_id
    if (Utils.getCookie('user_id') && Utils.getCookie('vote_id_list') && JSON.parse(Utils.getCookie('vote_id_list')).indexOf(query + '') >= 0) {
      this.props.dispatch(changeRouter('/voteResult?vote_id=' + (query || 1)))
    }
  }
  componentDidMount () {
    // 每次进入 定位在页面顶部
    window.scrollTo(0, 0)
    const query = this.props.location.query.vote_id
    this.setState({
      vote_id: query
    }, () => console.log('save_vote_id:', this.state))
    this.props.dispatch(actions.getVoteOptions(query, this.setShared))
  }
  componentWillReceiveProps (nextProps) {
    const { list, selected } = nextProps.vote.toJS() || {}
    if (list) {
      let curSelected = []
      selected.forEach((menu, i) => {
        menu.forEach((item, j) => {
          curSelected.push(list[i].voteQuestionChoiceList[item].voteQuestionChoiceId)
        })
      })
      this.setState({
        selected: curSelected
      }, () => console.log('checkCurState:', this.state))
    }
  }

  // 依据请求到的数据设置分享
  setShared = () => {
    const { coverImage: img, title, description } = this.props.vote.toJS()
    setShare({
      title,
      description,
      img,
      url: window.location.href
    })
  }

  state = {
    selected: [],
    vote_id: 1
  }

  changeItem = (menuIndex, itemIndex, isLimited) => {
    if (!isLimited) {
      this.props.dispatch(actions.selectItem({menuIndex, itemIndex}))
    } else {
      this.props.dispatch(showToast('该品类最多选择' + isLimited + '个'))
    }
  }

  handleSubmit = () => {
    const { voteId } = this.props.vote.toJS() || {}
    if (this.state.selected.length <= 0) {
      return this.props.dispatch(showToast('你还没有投票，请选择'))
    }
    if (!Utils.getCookie('lianjia_mall_vote_user_id')) {
      Utils.setCookie('lianjia_mall_vote_user_id', parseInt(Math.random()*100000000+1))
    }
    if (!Utils.getCookie('vote_id_list')) {
      let opt = []
      opt.push(voteId+'')
      Utils.setCookie('vote_id_list', JSON.stringify(opt))
    } else {
      let opt = JSON.parse(Utils.getCookie('vote_id_list'))
      opt.push(voteId+'')
      Utils.setCookie('vote_id_list', JSON.stringify(opt))
    }
    const params = {
      vote_id: voteId || this.state.vote_id,
      user_id: Utils.getCookie('lianjia_mall_vote_user_id') || '12345678',
      choice_ids: this.state.selected
    }
    this.props.dispatch(actions.sendChoose(params))
  }

  render () {
    const { list, selected, coverImage, title, description } = this.props.vote.toJS() || {}

    return <div styleName='wrap'>
      <section styleName='banner'>
        <div styleName='content'>
          <img styleName='img' src='https://image1.ljcdn.com/lmall/fe113abe-87b0-4f26-b724-514c62226c17.png.200x70.png' />
          <h1>{ title }</h1>
          <h2>{ description }</h2>
          <img styleName='img' src='https://image1.ljcdn.com/lmall/afbf3e19-addc-4e5c-b182-ca7ab9945039.png.200x70.png' />
        </div>
        {
          coverImage && <img styleName='coverImage' src={ coverImage } alt='' />
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
        <div styleName='btnArea'>
          <Button onClick={ this.handleSubmit } isDisButToast = {this.state.selected.length > 0 ? false : true}>投票</Button>
        </div>
      }

      <TelUs data={ {link: '/want', pic: telUsPic, styles:{background: 'none'}} }/>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  vote: state.vote
})

export default connect(mapStateToProps)(Vote)
