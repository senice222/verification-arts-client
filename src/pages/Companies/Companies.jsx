import style from './Companies.module.scss'

const Companies = () => {

    return (
        <div className={style.wrapper}>
            <div className={style.topDiv}>
                <h2>Все компании</h2>
            </div>
            <div className={style.topWrapper}>
                    <p></p>
                    <div className={style.searchBar}>
                        <input type="text" placeholder="Поиск по компании или ИНН" />
                    </div>
                </div>
            <div className={style.container}>
                <table className={style.usersTable}>
                    <thead>
                        <tr>
                            <th>Компания</th>
                            <th className={style.rightAlign}>Количество заявок</th>
                            <th className={style.rightAlign} style={{paddingRight: "58px"}}>Активных заявок</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data.map((order: Order) => ( */}
                        <tr>
                            <td>ООО “Привет”<br /> <span>ИНН 231391934342</span></td>
                            <td className={style.rightAlign}>№1</td>
                            <td className={style.rightAlign}>
                                <div className={style.flexEnd}>
                                    №1
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
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Companies