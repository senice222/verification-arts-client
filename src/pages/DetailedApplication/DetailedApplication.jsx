import styles from "./DetailedApplication.module.scss";
import PathComponent from "../../components/PathComponent/PathComponent";
import { Alert, ArrowLink, Pencil, CrossReport, ArrowLeft, Pdf, Docs, Document } from "./Svgs";
import { Calendar } from "../../components/Svgs/Svgs";
import { DatePicker, ConfigProvider, notification } from "antd";
import UploadButton from "./UploadButton/UploadButton"
import CancelModal from '../../components/Modals/CancelModal/CancelModal'
import { useState } from 'react'
import ruRU from "antd/es/locale/ru_RU";
import ClarificationModal from "../../components/Modals/ClarificationModal/ClarificationModal"
import { DeleteApplication } from "../../components/Modals/DeleteApplication/DeleteApplication";
import useSWR, { useSWRConfig } from "swr";
import { useNavigate, useParams } from "react-router-dom";
import $api, { fetcher, url } from "../../core/axios";
import Loader from "../../components/Loader/Loader";
import StatusDropdown from "./StatusDropdown/StatusDropdown";
import notific from '../../assets/Screenshot_3.png'
import Clarifications from "./Clarification/Clarification";

const getFileExtension = (url) => {
  const pathname = new URL(url).pathname;
  const ext = pathname.substring(pathname.lastIndexOf('.'));
  return ext;
}

const DetailedApplication = () => {
  const { id } = useParams()
  const { data } = useSWR(`${url}/application/detailed/${id}`, fetcher);
  const { mutate } = useSWRConfig()
  const navigate = useNavigate()
  const [comments, setComments] = useState('')
  const [isOpened, setOpened] = useState(false)
  const [isCancel, setCancel] = useState(false)
  const [deleteApplication, setDeleteApplication] = useState(false)
  const [uploads, setUploads] = useState([]);
  const fileActExtension = data?.fileAct ? getFileExtension(data.fileAct) : '';
  const fileExplain = data?.fileExplain ? getFileExtension(data.fileExplain) : '';

  const dateOnChange = (date, id, _id) => {
    try {
      mutate(`${url}/application/detailed/${id}`, fetcher(`${url}/application/set-date/${id}`, {
        method: 'POST',
        body: JSON.stringify({
          _id,
          date: date.toISOString(),
        }),
      }))
      notification.success({
        message: "Дата ответа успешно установлена.",
        duration: 2,
        style: { fontFamily: "Inter" }
      })
    } catch (e) {
      console.log(e)
    }
  };
  const handleAnswer = async () => {
    const formData = new FormData()
    formData.append('_id', data._id)
    formData.append('comments', comments)
    formData.append('status', "Рассмотрена")
    uploads.forEach((file) => {
      formData.append('files', file.file)
    });

    try {
      await $api.put(`/application/reviewed/${data.owner}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      notification.success({
        message: "Заявка успешно рассмотрена",
        duration: 1.5,
        style: { fontFamily: "Inter" }
      })
    } catch (e) {
      console.error('Upload failed:', e)
      notification.error({
        message: "Ошибка при отправке заявки",
        description: e.message
      })
    }
  }

  const filesObj = {
    ".pdf": <Pdf />,
    ".docx": <Docs />
  }
  const actFile = filesObj[fileActExtension]
  const explainFile = filesObj[fileExplain]

  if (!data) return <Loader />

  return (
    <>
      <DeleteApplication data={data} isOpen={deleteApplication} setOpen={() => setDeleteApplication((prev) => !prev)} />
      <ClarificationModal data={data} isOpen={isOpened} setOpen={() => setOpened(false)} />
      <CancelModal id={data.owner} productId={data._id} isOpened={isCancel} setOpened={() => setCancel(false)} />
      <div className={styles.DetailedApplication}>
        <PathComponent first={"Входящие заявки"} second={`Заявка ${data.normalId}`} />

        <div className={styles.topContainer}>
          <h1>Заявка №{data.normalId}</h1>
          <button onClick={() => setDeleteApplication(true)}>Удалить заявку</button>
        </div>

        <hr />
        <h2 className={styles.subtitle}>Информация о заявке</h2>
        <hr />
        <div className={styles.alertBox}>
          <Alert />
          <div>
            {
              data.dateAnswer ? (
                <>
                  <h3>Клиент знает срок рассмотрения заявки</h3>
                  <p>
                    Срок ответа установлен до {data.dateAnswer}
                  </p>
                </>
              ) : (
                <>
                  <h3>Клиент пока не знает срок рассмотрения заявки</h3>
                  <p>
                    Установите срок ответа ниже, чтобы передать заявку на рассмотрение.
                  </p>
                </>
              )
            }
          </div>
        </div>
        <div className={styles.company}>
          <div className={styles.item}>
            <p className={styles.name}>Компания</p>
            <div className={styles.linkBlock} onClick={() => navigate(`/companies/${data.inn}`)}>
              <p className={styles.companyName}>{data.name}</p>
              <ArrowLink />
            </div>
          </div>
          <div className={styles.item}>
            <p className={styles.name}>ИНН</p>
            <div className={styles.linkBlock} onClick={() => navigate(`/all-applications?inn=${data.inn}`)}>
              <p className={styles.companyName}>{data.inn}</p>
              <ArrowLink />
            </div>
          </div>
          <div className={styles.item}>
            <p className={styles.name}>Статус</p>
            <StatusDropdown data={data} />
          </div>
          <div className={styles.item}>
            <p className={styles.name}>Срок ответа</p>
            <div className={styles.linkBlock}>
              <div className={styles.dateWrapper}>
                {
                  !data.dateAnswer ? (
                    <ConfigProvider locale={ruRU}>
                      <DatePicker onChange={(date) => dateOnChange(date, data.owner, data._id)} />
                    </ConfigProvider>
                  ) : <button className={styles.btnDate}>
                    <Calendar />
                    {data.dateAnswer}
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
        <div className={styles.twoBlocks}>
          <div className={styles.report}>
            <h2>Отправить ответ</h2>
            <hr />
            {
              (data.status !== "Отклонена" && data.status !== "Рассмотрена" && data.status !== "На уточнении") ? (
                <>
                  <div className={styles.btns}>
                    <button onClick={() => setOpened(true)} className={styles.whiteBtn}>
                      <Pencil /> На уточнение
                    </button>
                    <button onClick={() => setCancel(true)} className={styles.redBtn}>
                      <CrossReport /> Отклонить заявку
                    </button>
                  </div>
                  <div className={styles.firstBlock}>
                    <UploadButton uploads={uploads} setUploads={setUploads} />
                    <div className={styles.textareaDiv}>
                      <h2>Комментарий</h2>
                      <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Введите описание"
                      />
                    </div>
                    <button className={styles.finalBtn} onClick={handleAnswer}>
                      <ArrowLeft /> Отправить ответ и закрыть заявку
                    </button>
                  </div>
                </>
              ) : (
                <button className={styles.cancelledBtn}><ArrowLeft /> Заявка закрыта</button>
              )
            }
          </div>
          <div className={styles.reportChanges}>
            <h2>Изменения по заявке</h2>
            <div className={styles.item}>
              <p className={styles.companyName}>Акт</p>
              <div className={styles.document}>
                {actFile}
                <div>
                  <p className={styles.actName}>Акт{fileActExtension}</p>
                  <p className={styles.download} onClick={() => window.open(data.fileAct)}>Скачать</p>
                </div>
              </div>
            </div>
            <div className={styles.item}>
              <p className={styles.companyName}>Пояснения к заявке</p>
              <div className={styles.document}>
                {explainFile}
                <div>
                  <p className={styles.actName}>Пояснения{fileExplain}</p>
                  <p className={styles.download} onClick={() => window.open(data.fileExplain)}>Скачать</p>
                </div>
              </div>
            </div>
            <div className={styles.logs}>
              <div className={styles.log}>
                <h3>Создана заявка №{data.normalId}</h3>
              </div>
              <div className={styles.logs}>
                {data && data.history ? (
                  data.history.map((item, index) => (
                    <>
                      {item.admin && <p style={{ marginLeft: "15px", marginTop: "10px", color: "#344054" }}>{item.admin}</p>}
                      <div key={index} className={item.type ? styles.questionText : styles.log}>

                        {item.status === 'answer' ? item.combinedClarifications && (
                          <Clarifications clarificationsAnswer={item.combinedClarifications} />
                        ) :
                          <h3>{item.label}</h3>
                        }
                      </div>
                      {item.fileUrls && item.fileUrls.length > 0 && (
                        <div className={styles.fileList} style={{marginLeft: "15px", marginTop: "10px"}}>
                          {item.admin && <p style={{ margin: "10px 0px", color: "#344054" }}>{item.admin}</p>}
                          {item.fileUrls.map((fileUrl, fileIndex) => (
                            <div key={fileIndex} className={styles.fileItem}>
                              <a href={`${url}/uploads/${fileUrl}`} target="_blank" rel="noopener noreferrer">
                                <Document />
                                <div className={styles.fileName}>Файл {fileIndex + 1}</div>
                              </a>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ))
                ) : (
                  <p>loading..</p>
                )}
              </div>

              {
                data.status === 'На уточнении' && (
                  <div className={styles.closedDivText}>
                    <img src={notific} alt='/' />
                    <p>Уточнения появятся здесь</p>
                  </div>
                )
              }
            </div>
            {(data.status === "Отклонена" || data.status === "Рассмотрена") && (
              <div className={styles.closedDivText}>
                <img src={notific} alt='/' />
                <p>Заявка закрыта</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedApplication;
