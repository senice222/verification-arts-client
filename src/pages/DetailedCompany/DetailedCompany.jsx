import PathComponent from '../../components/PathComponent/PathComponent'
import style from './DetailedCompany.module.scss'
import { ArrowLink, ArrowDown, Calendar } from "../DetailedApplication/Svgs";
import { Select, DatePicker, ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU'

const DetailedCompany = () => {
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };
    const dateOnChange = (date, dateString) => {
        console.log(date, dateString);
    };
    return (
        <div className={style.DetailedApplication}>
            <PathComponent first={"Входящие заявки"} second={"Заявка №12312944"} />
            <div className={style.topContainer}>
                <h1>Профиль компании ООО “Привет”</h1>
            </div>
            <div className={style.company}>
                <div className={style.item}>
                    <p className={style.name}>ИНН</p>
                    <div className={style.linkBlock}>
                        <p className={style.companyName}>34234234213</p>
                        <ArrowLink />
                    </div>
                </div>
                <div className={style.item}>
                    <p className={style.name}>Всего заявок</p>
                    <div className={style.linkBlock}>
                        <p className={style.active}>12</p>
                    </div>
                </div>

                <div className={style.item}>
                    <p className={style.name}>Активных заявок</p>
                    <div className={style.linkBlock}>
                        <span className={style.active}>12</span>
                    </div>
                </div>

            </div>
            <div className={style.wrapper}>
                <div className={style.topDiv}>
                    <h2>Заявки компании</h2>
                </div>
                <div className={style.topWrapper}>
                    <Select
                        defaultValue="Все статусы"
                        onChange={handleChange}
                        style={{ width: 220, height: 44 }}
                        options={[
                            { value: 'В работе', label: 'В работе' },
                            { value: 'На уточнении', label: 'На уточнении' },
                            { value: 'Отклонена', label: 'Отклонена' },
                            { value: 'На рассмотрении', label: 'На рассмотрении' },
                            { value: 'Рассмотрена', label: 'Рассмотрена' },
                        ]}
                    />
                    <div className={style.searchBar}>
                        <input type="text" placeholder="Поиск по номеру заявки" />
                    </div>
                </div>
                <div className={style.container}>
                    <table className={style.usersTable}>
                        <thead>
                            <tr>
                                <th>Номер заявки</th>
                                <th>Компания</th>
                                <th className={style.thRight}>Статус заявки <ArrowDown /></th>
                                <th className={style.thRight}>Срок ответа <ArrowDown /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {data.map((order: Order) => ( */}
                            <tr>
                                <td>№1</td>
                                <td>ООО “Привет”<br /> <span>ИНН 231391934342</span></td>
                                <td className={style.flexEnd}><span className={style.inactive}>В работе</span></td>
                                <td className={style.flexEnd}>
                                    <div>
                                        <ConfigProvider locale={ruRU}>
                                            <DatePicker onChange={dateOnChange} />
                                        </ConfigProvider>
                                        <button className={style.next}>
                                            <svg
                                                width={20}
                                                height={20}
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.16675 10H15.8334M15.8334 10L10.0001 4.16669M15.8334 10L10.0001 15.8334"
                                                    stroke="white"
                                                    strokeWidth="1.66667"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>№2</td>
                                <td>ООО “Привет”<br /> <span>ИНН 231391934334</span></td>
                                <td className={style.flexEnd}><span className={style.active}>Выполенен</span></td>
                                <td className={style.flexEnd}>
                                    <div>
                                        <button className={style.date}>
                                            до 12.04.2024
                                            <Calendar />
                                        </button>
                                        <button className={style.next}>
                                            <svg
                                                width={20}
                                                height={20}
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.16675 10H15.8334M15.8334 10L10.0001 4.16669M15.8334 10L10.0001 15.8334"
                                                    stroke="white"
                                                    strokeWidth="1.66667"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            {/* ))} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DetailedCompany