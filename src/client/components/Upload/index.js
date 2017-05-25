import React, { PureComponent, PropTypes } from 'react'
import CSSModules from 'react-css-modules'

import Preview from './Preview'
import styles from './index.styl'
import MegaPixImage from './megapix'

const basicStyle = {
  width: '120px',
  height: '120px',
  // border: '2px dashed rgba(0, 0, 0, .2)',
  borderRadius: '3px',
  position: 'relative'
}

@CSSModules(styles, { allowMultiple: true, errorWhenNotFound: false })
export default class extends PureComponent {
  state = {
    index: 0,
    type: '',
    status: 0 // 0: 未上传 1: 上传中 2: 上传成功 -1: 上传失败
  }

  static propTypes = {
    url: PropTypes.string.isRequired,
    argName: PropTypes.string,
    style: PropTypes.object,
    limit: PropTypes.number,
    accept: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string,
      status: PropTypes.number,  // 0: 未上传 1: 上传中 2: 上传成功 -1: 上传失败
      size: PropTypes.shape({
        width: PropTypes.string,
        height: PropTypes.string
      })
    })),
    multi: PropTypes.bool,
    headers: PropTypes.object,
    withCredentials: PropTypes.string,
    View: PropTypes.func,
    onSuccess: PropTypes.func,
    onDelete: PropTypes.func,
    onChange: PropTypes.func,
    onBeforeUpload: PropTypes.func,
    size: PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string
    }),
    loadingIcon: PropTypes.func,
    onPreviewClick: PropTypes.func
  }

  static defaultProps = {
    url: '',
    argName: 'file',
    limit: 9,
    accept: 'image/*',
    withCredentials: 'include',
    list: [],
    View: Preview,
    multi: false,
    onPreviewClick: () => {}
  }
  componentDidMount () {
  }
  upload = (e) => {
    const { onBeforeUpload, multi, handleUpload, base64 } = this.props
    this.setState({status: 1})
    const files = e.target.files
    if (handleUpload) {
      return handleUpload(e)
    }
    if (onBeforeUpload) {
      let reader = new window.FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = (event) => {
        const path = event.target.result
        onBeforeUpload(multi ? files : Object.assign({}, files[0], {preview: path}))
      }
    }

    let uploadFile = base64 ? this.base64Upload : this.normalUpload

    if (multi) {
      let promiseList = []
      for (let i = 0; i < files.length; i++) {
        promiseList.push(uploadFile(files[i]))
      }
      return Promise.all(promiseList)
    }
    return uploadFile(files[0])
  }

  normalUpload = (file) => {
    const {url, argName, withCredentials, onSuccess} = this.props
    // let formData = new window.FormData()
    // formData.append(argName, file)
    // 部分机型(iphone7)formdata参数有长度限制，大概在3000000左右
    const params = {}
    params[argName] = file
    return fetch(url, {
      method: 'post',
      credentials: withCredentials,
      // headers: headers,
      body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then(data => {
      this.setState({status: 2})
      if (onSuccess) {
        onSuccess(data)
      }
    })
  }

  base64Upload = (file) => new Promise((resolve, reject) => {
    let mpImg = new MegaPixImage(file)
    const imgRes = this.refs.base64Canvas
    mpImg.render(imgRes, {maxWidth: 2000, maxHeight: 2000, quality: 1}, () => {
      this.normalUpload(imgRes.toDataURL())
      .then(data => resolve(data))
      .catch(reject)
    })
  })

  handleDeleteImg = (e, i, img) => {
    e.stopPropagation()
    this.props.onDelete(e, i, img)
  }
  render () {
    const { accept, size, View, list, multi, loadingIcon, onPreviewClick } = this.props
    const { type, status } = this.state
    return (
      <div styleName='imgContainer'>
        {
          list.map((img, i) => <div styleName='outer' key={i}><View
            size={size}
            status={i === list.length - 1 ? status : 0}
            loadingIcon={loadingIcon}
            onDelete={e => this.handleDeleteImg(e, i, img)}
            onClick={onPreviewClick.bind(null, i)}
            {...img}
          /></div>)
        }
        {this.props.limit > this.props.list.length
          ? <div styleName='outer'>
            <a styleName='upload' style={Object.assign({}, basicStyle, size)}
              onClick={() => this.refs.input.click()}>
              <input
                type='file'
                accept={accept}
                ref='input'
                multiple={multi}
                value={type}
                onChange={(e) => this.upload(e)}
                />
              <div styleName='upload-icon' />
            </a>
          </div>
          : null}
        <canvas ref='base64Canvas' style={{display: 'none'}} />
      </div>
    )
  }
}
