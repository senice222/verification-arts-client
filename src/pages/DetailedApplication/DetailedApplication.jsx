import styles from "./DetailedApplication.module.scss";
import PathComponent from "../../components/PathComponent/PathComponent";
import {Alert, ArrowLink, Pencil, CrossReport, ArrowLeft, Docs, ArrowBack} from "./Svgs";
import { DatePicker, ConfigProvider } from "antd";
import UploadButton from "./UploadButton/UploadButton"
import CancelModal from '../../components/Modals/CancelModal/CancelModal'
import {useState} from 'react'
import ruRU from "antd/es/locale/ru_RU";
import ClarificationModal from "../../components/Modals/ClarificationModal/ClarificationModal"

const DetailedApplication = () => {
  const dateOnChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const [isOpened, setOpened] = useState(false)
  const [isCancel, setCancel] = useState(false)

  return (
    <>
    <ClarificationModal isOpen={isOpened} setOpen={() => setOpened(false)}/>
      <CancelModal isOpened={isCancel} setOpened={() => setCancel(false)}/>
    <div className={styles.DetailedApplication}>
      <PathComponent first={"Входящие заявки"} second={"Заявка №12312944"} />

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
          <p>
            Установите срок ответа ниже, чтобы передать заявку на рассмотрение.
          </p>
        </div>
      </div>
      <div className={styles.company}>
        <div className={styles.item}>
          <p className={styles.name}>Компания</p>
          <div className={styles.linkBlock}>
            <p className={styles.companyName}>ООО “ПРИВЕТ”</p>
            <ArrowLink />
          </div>
        </div>
        <div className={styles.item}>
          <p className={styles.name}>ИНН</p>
          <div className={styles.linkBlock}>
            <p className={styles.companyName}>34234234213</p>
            <ArrowLink />
          </div>
        </div>
        <div className={styles.item}>
          <p className={styles.name}>Статус</p>
          <div className={styles.linkBlock}>
            <span className={styles.active}>В работе</span>
          </div>
        </div>
        <div className={styles.item}>
          <p className={styles.name}>Срок ответа</p>
          <div className={styles.linkBlock}>
            <div className={styles.dateWrapper}>
              <ConfigProvider locale={ruRU}>
                <DatePicker onChange={dateOnChange} />
              </ConfigProvider>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.twoBlocks}>
        <div className={styles.report}>
          <h2>Отправить ответ</h2>
          <hr />
          <div className={styles.btns}>
            <button onClick={() => setOpened(true)} className={styles.whiteBtn}>
              <Pencil /> На уточнение
            </button>
            <button onClick={() => setCancel(true)} className={styles.redBtn}>
              <CrossReport /> Отклонить заявку
            </button>
          </div>
          <div className={styles.firstBlock}>
            <UploadButton />
            <div className={styles.textareaDiv}>
              <h2>Комментарий</h2>
              <textarea placeholder={"Введите описание"} />
            </div>
            <button className={styles.finalBtn}><ArrowLeft/>Отправить ответ и закрыть заявку</button>
          </div>
        </div>
        <div className={styles.reportChanges}>
          <h2>Изменения по заявке</h2>
          <div className={styles.item}>
            <p className={styles.companyName}>ООО “ПРИВЕТ”</p>
            <div className={styles.document}>
              <Docs />
              <div>
                  <p className={styles.actName}>Акт.docx</p>
                  <p className={styles.download}>Скачать</p>
              </div>
            </div>
          </div>
          <div className={styles.item}>
            <p className={styles.companyName}>Пояснения к заявке.docx</p>
            <div className={styles.document}>
              <Docs />
              <div>
                  <p className={styles.actName}>Акт.docx</p>
                  <p className={styles.download}>Скачать</p>
              </div>
            </div>
          </div>
          <div className={styles.logs}>
            <div className={styles.log}>
              <h3>Создана заявка №233213123</h3>
            </div>
            <div className={styles.log}>
              <h3>Статус заявки сменен на В работе</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default DetailedApplication;
