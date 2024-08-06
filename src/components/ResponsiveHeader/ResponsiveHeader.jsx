import React from 'react'
import s from './ResponsiveHeader.module.scss'
import {Menu} from './Svg'

const ResponsiveHeader = ({setActive}) => {
  return (
    <div className={s.responsiveHeader}>
        <h2>Панель актов</h2>
        <div onClick={() => setActive(true)}><Menu /></div>
    </div>
  )
}

export default ResponsiveHeader