import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import { Link } from 'react-router-dom'
import Icon from 'components/Icons/'

import { getList } from 'actions/voteList'

@CSSModules(styles, { allowMultiple: true })
export class Vote extends PureComponent {
  componentDidMount () {
    this.props.dispatch(getList())
  }
  render () {
    const { list } = this.props.data.toJS()
    return <div styleName='wrap'>
      <ul>
        {
          list.map((item, i) => <li key={i} styleName='item'>
            <div styleName='inner'>
              <img src={item.coverImage} styleName='img' />
              <Link styleName='content' to={`/vote?vote_id=${item.voteId}`}>
                <h2><Icon icon='quotes2' width={20} />{item.title}</h2>
                <hr />
                <h4>{item.description}</h4>
              </Link>
            </div>
          </li>)
        }
      </ul>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.voteList
})

export default connect(mapStateToProps)(Vote)
