import {useState} from 'react'
import { Trash, Pencil } from '../../components/Svgs/Svgs';
import style from './Settings.module.scss'
import useSWR, { useSWRConfig } from "swr";
import { fetcher, url } from "../../core/axios";
import SettingsModal from '../../components/Modals/AddUserModal/AddUserModal'

const Settings = () => {
    const [active, setActive] = useState(false)
    const {mutate} = useSWRConfig()
    const [currentAdmin, setCurrentAdmin] = useState(null)
    const {data} = useSWR(`${url}/admins`, fetcher)
    console.log(data, 22)
    const handleDelete  = async (id) => {
        const {data} = await mutate(`${url}/admins`, fetcher(`${url}/admin/${id}`, {
            method: "DELETE",
        }))
    }
    return (
        <>
        <SettingsModal admin={currentAdmin} isActive={active} setActive={() => setActive((prev) => !prev)}/>
        <div className={style.wrapper}>
            <div className={style.topDiv}>
                <h2>Настройки ролей</h2>
                <button onClick={() => {
                    setCurrentAdmin(null)
                    setActive(true)
                    }}>+ Добавить пользователя</button>
            </div>
            <div className={style.topWrapper}>
                <p></p>
                <div className={style.searchBar}>
                    <input type="text" placeholder="Поиск по номеру заказа, компании или ИНН" />
                </div>
            </div>
            <div className={style.container}>
                <table className={style.usersTable}>
                    <thead>
                        <tr>
                            <th>Логин</th>
                            <th>Имя пользователя</th>
                            <th>Доступ к разделам</th>
                            <th>Комментарий</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data.map((order: Order) => ( */}
                        {data ? data.map((item) => <tr>
                            <td >{item.login}</td>
                            <td> {item.fio}</td>
                            <td>{item.access.map((item) => <p>{item}</p>)}</td>
                            <td>
                                {item.comment}
                            </td>
                            <td>
                                <div className={style.itemsPencil}>
                                    <div onClick={() => handleDelete(item._id)}><Trash /></div>
                                    <div onClick={() => {
                                        setCurrentAdmin(item)
                                        setActive(true)
                                        }}>
                                    <Pencil />
                                    </div>
                                </div>
                                
                            </td>
                        </tr>) : null}
                        {/* ))} */}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default Settings