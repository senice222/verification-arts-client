import { Trash, Pencil } from '../../components/Svgs/Svgs';
import style from './Settings.module.scss'

const Settings = () => {

    return (
        <div className={style.wrapper}>
            <div className={style.topDiv}>
                <h2>Настройки ролей</h2>
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
                            <th>Роль</th>
                            <th>Комментарий</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data.map((order: Order) => ( */}
                        <tr>
                            <td >ivanova2123</td>
                            <td> ООО “Привет” </td>
                            <td><span className={style.active}>Active</span></td>
                            <td>
                                №1
                            </td>
                            <td>
                                <div className={style.itemsPencil}>
                                    <Trash />
                                    <Pencil />
                                </div>
                                
                            </td>
                        </tr>
                        {/* ))} */}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Settings