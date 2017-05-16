import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './index.styl'

import NavBar from 'components/NavBar/'
import ProductItem from 'components/ProductItem/'
import { getItems } from 'actions/result'

import { stat } from 'common/stat'

@CSSModules(styles, {allowMultiple: true})
export class Result extends PureComponent {
  componentDidMount () {
    const query = this.props.location.query
    this.getItems(query)
    window.addEventListener('scroll', this.checkScrollBottom)
  }

  componentWillUnmount () {
    window.removeEventListener('scroll', this.checkScrollBottom)
  }

  checkScrollBottom = (e) => {
    const { page } = this.props.data.toJS()
    const footerPosition = this.refs.footer.getBoundingClientRect()
    const clientHeight = document.body.clientHeight
    if (footerPosition.bottom === clientHeight) {
      if (page.currentPage < page.totalPage) {
        this.getItems(Object.assign({current_page: page.currentPage + 1}, this.props.location.query))
      }
    }
  }

  componentWillReceiveProps (np) {
    const nQ = np.location.query
    const tQ = this.props.location.query
    if (nQ.categoryId !== tQ.categoryId) {
      this.getItems(nQ)
    }
  }

  getItems = (query) => {
    this.props.dispatch(getItems(query))
  }

  handleClickCategory = (item) => {
    stat('event', 'mall_product_list', 'click', `类目-${item.categoryName}`)
  }

  render () {
    const { list, page } = this.props.data.toJS()
    const { categoryList } = this.props.shared.toJS()
    const query = this.props.location.query

    return <div styleName='wrap'>
      <div styleName='left'>
        <div styleName='leftFix'>
          <NavBar vertical
            data={categoryList.map(item => ({path: `/search?categoryId=${item.categoryId}`, title: item.categoryName, active: item.categoryId.toString() === query.categoryId, replace: true, onClick: () => this.handleClickCategory(item)}))} />
        </div>
      </div>
      <div styleName='right'>
        <ul>
          {
            list.map((item, i) => <li key={i} styleName='content'>
              <div styleName='inner'><ProductItem data={item} /></div>
            </li>)
          }
        </ul>
        <div styleName='bottom' ref='footer'>
          {page.currentPage < page.totalPage ? '加载中...' : ''}
        </div>
      </div>
    </div>
  }
}

const mapStateToProps = state => ({
  shared: state.shared,
  data: state.result
})

export default connect(mapStateToProps)(Result)
