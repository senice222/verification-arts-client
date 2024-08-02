import React from 'react'
import styles from './DetailedApplication.module.scss'
import PathComponent from '../../components/PathComponent/PathComponent'
import {Alert} from './Svgs'
const DetailedApplication = () => {
  return (
    <div className={styles.DetailedApplication}>
        <PathComponent first={'Входящие заявки'} second={'Заявка №12312944'} />

        <div className={styles.topContainer}>
            <h1>Заявка №12312944</h1>
            <button>Удалить заявку</button>
        </div>
        <hr />
        <h2 className={styles.subtitle}>Информация о заявке</h2>
        <hr />
        <div className={styles.alertBox}>
            <Alert />
            <div>
                <h3>Клиент пока не знает срок рассмотрения заявки</h3>
                <p>Установите срок ответа ниже, чтобы передать заявку на рассмотрение.</p>
            </div>
        </div>
    </div>
  )
}

export default DetailedApplication