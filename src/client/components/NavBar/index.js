import React from 'react'
import { NavLink } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from './index.styl'
import Icon from 'components/Icons'

export default CSSModules(({ data = [], vertical }) => <ul styleName={vertical ? 'wrap vertical' : 'wrap'}>
  {
    data.map((route, i) => <li key={i} styleName={route.active ? 'tab active' : 'tab'}>
      {
        route.icon && <Icon icon = {route.icon} width='30' height='28' style={{marginBottom: '.08rem', display: 'inline-block'}}/>
      }
      <NavLink
        exact={route.exact}
        to={route.path}
        style={route.style || {}}
        activeStyle={{color: 'lightGreen'}} >
        {route.title}
      </NavLink>
    </li>)
  }
</ul>, styles, {allowMultiple: true})
