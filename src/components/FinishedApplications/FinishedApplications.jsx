import style from './FinishedApplications.module.scss'
import { DatePicker, ConfigProvider } from 'antd';
import ruRU from 'antd/es/locale/ru_RU'
import { ArrowDown } from '../Svgs/Svgs';

const FinishedApplications = () => {

  const dateOnChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className={style.wrapper}>
      <div className={style.topDiv}>
        <h2>Завершенные заявки</h2>
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
              <th>Номер заявки</th>
              <th>Компания</th>
              <th className={style.thRight}>Статус заявки <ArrowDown /></th>
              <th className={style.thRight}>Срок ответа <ArrowDown /></th>
            </tr>
          </thead>
          <tbody>
            {/* {data.map((order: Order) => ( */}
            <tr>
              <td >№1</td>
              <td >ООО “Привет”<br /> <span>ИНН 231391934342</span></td>
              <td className={style.flexEnd}><span className={style.active}>Выполнен</span></td>
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
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FinishedApplications