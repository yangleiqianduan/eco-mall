import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { showToast } from 'actions/index'

import Upload from 'components/Upload/'
import Button from 'components/Button/'

import { upload, host } from 'constants/api'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import { CLEAR_DATA_ACTION, UPDATE_TEXT_ACTION, ADD_IMAGE_ACTION, DEL_IMAGE_ACTION, submit } from 'actions/want'

@CSSModules(styles, {allowMultiple: true})
export class Want extends PureComponent {
  handleChangeText = (e) => this.props.dispatch(UPDATE_TEXT_ACTION(e.target.value))
  handleUploaded = (data) => {
    if (data.code !== '1' || !data.data.length) {
      this.props.dispatch(showToast(data.msg || '图片上传失败！'))
    }
    this.props.dispatch(ADD_IMAGE_ACTION({
      src: data.data[0]
    }))
  }
  handleDelete = (e, i) => this.props.dispatch(DEL_IMAGE_ACTION(i))
  handleSubmit = (text, imgList) => {
    this.props.dispatch(submit({
      user_id: '0',
      phone: '0',                   // 不需要存，但是后端需要这个字段
      content: text,
      image_urls: imgList.map(item => item.src)
    }))
  }
  componentWillUnmount = () => {
    this.props.dispatch(CLEAR_DATA_ACTION())
  }
  render () {
    const { text, imgList } = this.props.data.toJS()
    return <div styleName='wrap'>
      <div styleName='inner'>
        <h2 styleName='title'>你想买什么，告诉我们</h2>
        <p>有任何想购买的“尖货”，请告诉我们，后续它就有可能出现在这里！</p>
        <div>
          <textarea styleName='input' type='text' value={text} onChange={this.handleChangeText} placeholder='点此输入商品名称或淘宝地址' />
        </div>
        <div>
          上传商品截图
          <div styleName='uploadOuter'>
            <Upload list={imgList.map(item => ({src: item.src}))} onSuccess={this.handleUploaded} onDelete={this.handleDelete} limit={9} url={host[window.ENV] + upload} size={{width: '0.7rem', height: '0.7rem'}} />
          </div>
        </div>
        <div styleName='footer'>
          <Button disabled={!text && (imgList.length === 0)} onClick={() => this.handleSubmit(text, imgList)} >提交</Button>
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.want
})

export default connect(mapStateToProps)(Want)
