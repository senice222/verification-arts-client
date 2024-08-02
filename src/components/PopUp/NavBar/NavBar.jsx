import React, {useState} from 'react'
import styles from './NavBar.module.scss'
import {DocumentSvg, Building, Mail, Arrow} from './Svgs'
import { NavLink } from 'react-router-dom'

const NavBarItem = ({Svg, text}) => {
    return (
        <div className={styles.item}>
            {Svg}
            <h2>{text}</h2>
        </div>
    )
}
const NavBarItemOpenAble = ({Svg, text }) => {
    const [opened, setOpened] = useState(false);

    return (
        <div className={`${styles.item2} ${opened ? styles.active : ""}`}>
            <div className={styles.topDiv} onClick={() => setOpened(prev => !prev)}>

                <div className={styles.svgWithText}>
                    <Mail />
                    <h2>Почта</h2>
                </div>
                <Arrow />
            </div>
            <div className={styles.subCategories}>
                    <div className={styles.sub}>
                        <NavLink to="/">Активные</NavLink>
                    </div>
                    <div className={styles.sub}>
                        <NavLink to="/finished">Завершённые</NavLink>
                    </div>
            </div>
        </div>
    )
}
const NavBar = () => {
  return (
    <div className={styles.NavBar}>
        <h1>Панель актов</h1>
        <div className={styles.items}>
            <NavBarItemOpenAble />
            <NavBarItem Svg={<DocumentSvg />} text={'Заявки'}/>
            <NavBarItem Svg={<Building />} text={'Компании'}/>
        </div>
    </div>
  )
}

export default NavBar