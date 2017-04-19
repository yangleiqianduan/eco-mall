import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import FootBar from 'components/FootBar/'
import { Link } from 'react-router-dom'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
import wantPic from 'common/img/want.png'
import ImageMap from 'components/ImageMap/'
import ItemList from 'components/ItemList/'

import { getDetail, CHECK_ALL_ACTION, CHECK_ITEM_ACTION } from 'actions/collocation'

@CSSModules(styles, {allowMultiple: true})
export class Collocation extends PureComponent {
  componentDidMount () {
    this.props.dispatch(getDetail({product_mix_id: this.props.location.query.id}))
  }
  onCheckAll = (payload) => this.props.dispatch(CHECK_ALL_ACTION(payload))
  onCheckItem = (i) => this.props.dispatch(CHECK_ITEM_ACTION(i))
  render () {
    const data = this.props.data.toJS()
    return <div styleName='wrap'>
      <section styleName='mainImage'><ImageMap data={data} /></section>
      <section styleName='itemList'><ItemList data={data} onCheckAll={this.onCheckAll} onCheckItem={this.onCheckItem} /></section>
      <section styleName='card telUs'>
        <Link to='/want'><img src={wantPic} /></Link>
      </section>
      <FootBar />
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.collocation
})

export default connect(mapStateToProps)(Collocation)
