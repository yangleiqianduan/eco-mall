import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import Icon from 'components/Icons'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

@CSSModules(styles, { allowMultiple: true })
export class ErrorPage extends PureComponent {

  componentDidMount () {
  }

  render () {
    return <div styleName='wrap'>
      <div styleName='imgContainer'>
        <Icon icon={'errorInfo'} width={'105'} />
      </div>
      <div styleName='errorMsg'>{this.props.location.query.error_msg}</div>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared
})

export default connect(mapStateToProps)(ErrorPage)
