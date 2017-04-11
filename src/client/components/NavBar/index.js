import React from 'react'
import { NavLink } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from './index.styl'

const NavBar = CSSModules(({ data = [] }) => <ul styleName='wrap'>
  {
    data.map((route, i) => <li key={i} styleName='tab'><NavLink exact={route.exact} to={route.path} activeStyle={{color: 'lightGreen'}} >{route.title}</NavLink></li>)
  }
</ul>, styles, {allowMultiple: true})

export default NavBar
