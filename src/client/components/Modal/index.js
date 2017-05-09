import React, { PureComponent, PropTypes } from 'react'
import { Modal } from './Modal'

export default class extends PureComponent {
  static propTypes = {
    show: PropTypes.bool,
    overlap: PropTypes.bool,
    onSure: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
    style: PropTypes.object,
    theme: PropTypes.shape({
      highlightColor: PropTypes.string,
      primaryColor: PropTypes.string,
      secondaryColor: PropTypes.string
    }),
    type: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string
  }

  static defaultProps = {
    overlap: false
  }

  state = {
    theme: {
      success: {
        highlightColor: '#fff',
        primaryColor: '#000',
        secondaryColor: '#00ae66'
      },
      danger: {
        highlightColor: '#fff',
        primaryColor: '#000',
        secondaryColor: '#ff0000'
      },
      waring: {
        highlightColor: '#fff',
        primaryColor: '#000',
        secondaryColor: '#F45633'
      }
    }
  }

  render () {
    const props = Object.assign({theme: this.state.theme[this.props.type]}, this.props)

    return <div>
      {props.show ? <Modal {...props} /> : null}
    </div>
  }
}
