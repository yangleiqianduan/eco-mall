import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Icon from 'components/Icon'
import FootBar from 'components/FootBar/'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, {allowMultiple: true})
export class Collocation extends PureComponent {
  render () {
    return <div>
      Collocation<Icon icon='loc' />
      <FootBar />
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.collocation
})

export default connect(mapStateToProps)(Collocation)
