import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames/bind'
import CSSModules from 'react-css-modules'
import styles from './index.styl'
import Icon from 'components/Icons'

export default CSSModules(({ data = [], vertical, onClick, style = {} }) => {
  const wrap = classNames('wrap', {vertical, horizontal: !vertical})
  return <ul styleName={wrap} onClick={onClick} style={style}>
    {
      data.map((route, i) => <li key={i} styleName={classNames('tab', {active: route.active && !vertical, ver_active: route.active && vertical})}>
        <NavLink
          exact={route.exact}
          onClick={route.onClick}
          replace={route.replace}
          to={route.path}
          style={route.style || {}}>
          {
            route.icon && <div>
              <Icon icon={route.icon} width={route.iconWidth || 30} height={28} style={{marginBottom: '.08rem', display: 'inline-block'}} />
              {
                !!route.count && <div styleName='mark'><span>{route.count}</span></div>
              }
            </div>
          }
          {route.title}
        </NavLink>
      </li>)
    }
  </ul>
}, styles, {allowMultiple: true})
