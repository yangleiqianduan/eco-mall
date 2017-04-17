import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import FootBar from 'components/FootBar/'
import { Link } from 'react-router-dom'

import CSSModules from 'react-css-modules'
import styles from './index.styl'
import wantPic from 'common/img/want.png'
import ImageMap from 'components/ImageMap/'
import ItemList from 'components/ItemList/'

import { getDetail } from 'actions/collocation'

@CSSModules(styles, {allowMultiple: true})
export class Collocation extends PureComponent {
  componentDidMount () {
    this.props.dispatch(getDetail({product_mix_id: this.props.location.query.id}))
  }
  render () {
    const data = this.props.data.toJS()
    return <div styleName='wrap'>
      <section styleName='mainImage'><ImageMap data={data} /></section>
      <section styleName='itemList'><ItemList data={data} /></section>
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
