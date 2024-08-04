import { useState } from 'react'
import styles from './NavBar.module.scss'
import { DocumentSvg, Building, Mail, Arrow } from './Svgs'
import { NavLink, useNavigate } from 'react-router-dom'
import settings from '../../../assets/settings-01.png'
import user from '../../../assets/user-01.png'
import logout from '../../../assets/log-out-01.png'

const NavBarItem = ({ Svg, text, path }) => {
    const navigate = useNavigate()
    return (
        <div className={styles.item} onClick={() => navigate(path)}>
            {Svg}
            <h2>{text}</h2>
        </div>
    )
}
const NavBarItemOpenAble = ({ Svg, text }) => {
    const [opened, setOpened] = useState(false);
    const navigate = useNavigate()

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
                <div className={styles.sub} onClick={() => navigate('/')}>
                    <p>Активные</p>
                </div>
                <div className={styles.sub} onClick={() => navigate('/finished')}>
                    <p>Завершённые</p>
                </div>
            </div>
        </div>
    )
}
const NavBar = () => {
    const navigate = useNavigate()
    return (
        <div className={styles.NavBar}>
            <div>
                <h1>Панель актов</h1>
                <div className={styles.items}>
                    <NavBarItemOpenAble />
                    <NavBarItem Svg={<DocumentSvg />} text={'Заявки'} path='/all-applications' />
                    <NavBarItem Svg={<Building />} text={'Компании'} path='/companies' />
                </div>
            </div>
            <div className={styles.settings}>
                <div className={styles.itemSettings} onClick={() => navigate('/settings')}>
                    <img src={settings} alt={"/"} />
                    <p>Настройки</p>
                </div>
                <div className={styles.admin}>
                    <div className={styles.circle}>
                        <img src={user} alt="/" />
                    </div>
                    <div className={styles.info}>
                        <div>
                            <h2>Admin</h2>
                            <p>@mshopybot</p>
                        </div>
                        <img src={logout} alt={"/"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar