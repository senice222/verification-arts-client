import styles from "./DetailedApplication.module.scss";
import PathComponent from "../../components/PathComponent/PathComponent";
import {
  Alert,
  ArrowLink,
  Pencil,
  CrossReport,
  ArrowLeft,
  Pdf,
  Docs,
  Document,
  Dots,
} from "./Svgs";
import { Trash } from "../../components/Svgs/Svgs";
import { Dropdown, Space } from "antd";
import { Calendar } from "../../components/Svgs/Svgs";
import { DatePicker, ConfigProvider, notification } from "antd";
import UploadButton from "./UploadButton/UploadButton";
import CancelModal from "../../components/Modals/CancelModal/CancelModal";
import { useState } from "react";
import ruRU from "antd/es/locale/ru_RU";
import ClarificationModal from "../../components/Modals/ClarificationModal/ClarificationModal";
import useSWR, { useSWRConfig } from "swr";
import { useNavigate, useParams } from "react-router-dom";
import $api, { fetcher, url } from "../../core/axios";
import Loader from "../../components/Loader/Loader";
import StatusDropdown from "./StatusDropdown/StatusDropdown";
import notific from "../../assets/Screenshot_3.png";
import Clarifications from "./Clarification/Clarification";
import HighlightedText from "./HighlightedText/HighlightedText";
import { Tooltip } from 'antd'
import moment from 'moment'

const getFileExtension = (url) => {
  const pathname = new URL(url).pathname;
  const ext = pathname.substring(pathname.lastIndexOf("."));
  return ext;
};

const getFileNameFromUrl = (url) => {
  try {
    const pathname = new URL(url).pathname;
    const fileName = pathname.substring(pathname.lastIndexOf('/') + 1);
    return fileName;
  } catch (err) {
    console.error('Error extracting file name from URL:', err);
    return 'Файл';
  }
};

const DetailedApplication = () => {
  const { id } = useParams();
  const { data } = useSWR(`${url}/application/detailed/${id}`, fetcher);
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  const [comments, setComments] = useState("");
  const [isOpened, setOpened] = useState(false);
  const [isCancel, setCancel] = useState(false);
  const [uploads, setUploads] = useState([]);
  const isButtonDisabled = !(uploads.length > 0 && uploads.some(upload => upload.uploaded)) && comments.trim() === '';
  const disabledDate = (current) => {
    return current && current < moment().startOf('day');
  };
  
  const handleDelete = () => {
    try {
      mutate(`${url}/application/getAll`, fetcher(`${url}/application/delete/${data.owner}`, {
        method: "DELETE",
        body: JSON.stringify({
          _id: data._id
        })
      }))
      notification.success({
        message: "Заявка успешно удалена",
        duration: 1.5,
        style: { fontFamily: "Inter" }
      })
      navigate('/all-applications')
    } catch (e) {
      console.log(e)
    }
  }
  const dateOnChange = async (date, ownerId, _id) => {
    try {
      await mutate(
        `${url}/application/detailed/${id}`,
        fetcher(`${url}/application/set-date/${ownerId}`, {
          method: "POST",
          body: JSON.stringify({
            _id,
            date: date.toISOString(),
          }),
        })
      );
      notification.success({
        message: "Дата ответа успешно установлена.",
        duration: 2,
        style: { fontFamily: "Inter" },
      });
    } catch (e) {
      console.log(e);
    }
  };
  const items = [
    {
      key: "2",
      label: (
        <div className={styles.deleteDiv}>
          <div className={styles.textDiv}>
            <p className={styles.text}>Действия с заявкой</p>
          </div>
          <p onClick={handleDelete} className={styles.delete}>
            <Trash />
            Удалить заявку
          </p>
        </div>
      ),
    },
  ];
  const handleAnswer = async () => {
    const formData = new FormData();
    formData.append("_id", data._id);
    formData.append("comments", comments);
    formData.append("status", "Рассмотрена");
    uploads.forEach((file) => {
      formData.append("files", file.file);
    });

    try {
      await $api.put(`/application/reviewed/${data.owner}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      mutate(`${url}/application/detailed/${id}`);
      notification.success({
        message: "Заявка успешно рассмотрена",
        duration: 1.5,
        style: { fontFamily: "Inter" },
      });
    } catch (e) {
      console.error("Upload failed:", e);
      notification.error({
        message: "Ошибка при отправке заявки",
        description: e.message,
      });
    }
  };

  const filesObj = {
    ".pdf": <Pdf />,
    ".docx": <Docs />,
  };
  if (!data) return <Loader />;

  return (
    <>
      <ClarificationModal
        data={data}
        isOpen={isOpened}
        setOpen={() => setOpened(false)}
      />
      <CancelModal
        id={data.owner}
        productId={data._id}
        isOpened={isCancel}
        setOpened={() => setCancel(false)}
      />
      <div className={styles.DetailedApplication}>
        <PathComponent
          first={"На заявки"}
          path={"/all-applications"}
          second={`Заявка ${data.normalId}`}
        />

        <div className={styles.topContainer} id="topCont">
          <h1>Заявка №{data.normalId}</h1>
          <div className={styles.select}>
            <Dropdown
              className={styles.customDropdown}
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {(data.status === "Рассмотрена" || data.status === "Отклонена") && (
                    <div className={styles.dots}>
                      <Dots />
                    </div>
                  )}
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>

        <hr />
        <h2 className={styles.subtitle}>Информация о заявке</h2>
        <hr />
        <div className={styles.alertBox}>
          <Alert />
          <div>
            {data.dateAnswer ? (
              <>
                <h3>Клиент знает срок рассмотрения заявки</h3>
                <p>Срок ответа установлен до {data.dateAnswer}</p>
              </>
            ) : (
              <>
                <h3>Клиент пока не знает срок рассмотрения заявки</h3>
                <p>
                  Установите срок ответа ниже, чтобы передать заявку на
                  рассмотрение.
                </p>
              </>
            )}
          </div>
        </div>
        <div className={styles.company}>
          <div className={styles.item}>
            <p className={styles.name}>Компания</p>
            <div
              className={styles.linkBlock}
              onClick={() => navigate(`/companies/${data.inn}`)}
            >
              <p className={styles.companyName}>{data.name}</p>
              <ArrowLink />
            </div>
          </div>
          <div className={styles.item}>
            <p className={styles.name}>ИНН</p>
            <div
              className={styles.linkBlock}
              onClick={() => navigate(`/all-applications?inn=${data.inn}`)}
            >
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
                {!data.dateAnswer ? (
                  <ConfigProvider locale={ruRU}>
                    <DatePicker
                      inputReadOnly
                      disabledDate={disabledDate}
                      onChange={(date) =>
                        dateOnChange(date, data.owner, data._id)
                      }
                    />
                  </ConfigProvider>
                ) : (
                  <Tooltip title="Дата уже выставлена" placement="bottom">
                    <button className={styles.btnDate}>
                      <Calendar />
                      <span className={styles.dateText}>до {data.dateAnswer}</span>
                    </button>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.twoBlocks}>
          <div className={styles.report}>
            <h2>Отправить ответ</h2>
            <hr />
            {data.status !== "Отклонена" &&
              data.status !== "Рассмотрена" &&
              data.status !== "На уточнении" ? (
              <>
                <div className={styles.btns}>
                  <button
                    onClick={() => setOpened(true)}
                    className={styles.whiteBtn}
                  >
                    <Pencil /> На уточнение
                  </button>
                  <button
                    onClick={() => setCancel(true)}
                    className={styles.redBtn}
                  >
                    <CrossReport /> Отклонить заявку
                  </button>
                </div>
                <div className={styles.firstBlock}>
                  <UploadButton uploads={uploads} setUploads={setUploads} />
                  <div className={styles.textareaDiv}>
                    <h2>Комментарий</h2>
                    <textarea
                      maxLength={4096}
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Введите описание"
                    />
                  </div>
                  <button className={styles.finalBtn} disabled={isButtonDisabled} onClick={handleAnswer}>
                    <ArrowLeft /> Отправить ответ и закрыть заявку
                  </button>
                </div>
              </>
            ) : (
              <button className={styles.cancelledBtn}>
                <ArrowLeft />
                {data.status === "На уточнении"
                  ? "Заявка на уточнении"
                  : "Заявка закрыта"}
              </button>
            )}
          </div>
          <div className={styles.reportChanges}>
            <h2>Изменения по заявке</h2>
            <div className={styles.log}>
              <h3>Создана заявка №{data.normalId}</h3>
            </div>
            <div className={styles.log}>
              <h3>Информация по акту:</h3>
            </div>
            {Array.isArray(data.fileAct) && data.fileAct.length > 0 && data.fileAct.map((item, i) => {
              const fileName = item.startsWith('https') ? getFileNameFromUrl(item) : '';
              const fileActExtension = getFileExtension(item);
              const actFile = filesObj[fileActExtension] ? filesObj[fileActExtension] : <Document />;

              return (
                <div key={i} className={styles.item}>
                  <p className={styles.companyName}>{data.name}</p>
                  <div className={styles.document}>
                    {actFile}
                    <div>
                      {item.startsWith('https') ? (
                        <>
                          <p className={styles.actName}>{fileName}</p>
                          <p
                            className={styles.download}
                            onClick={() => window.open(item)}
                          >
                            Скачать
                          </p>
                        </>
                      ) : (
                        <p className={styles.actName}>{item}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div className={styles.item}>
              <div className={styles.log}>
                <h3>Пояснения к акту:</h3>
              </div>
              {
                Array.isArray(data.fileExplain) && data.fileExplain.length > 0 && data.fileExplain.map((item, i) => {
                  const fileName = item.startsWith('https') ? getFileNameFromUrl(item) : '';
                  const fileActExtension = item.startsWith('https') ? getFileExtension(item) : '';
                  const fileExpl = filesObj[fileActExtension] ? filesObj[fileActExtension] : <Document />;
                  if (item.startsWith('https')) {
                    return (
                      <div key={i} className={styles.item}>
                        <p className={styles.companyName}>{data.name}</p>
                        <div className={styles.document}>
                          {fileExpl}
                          <div>
                            <p className={styles.actName}>{fileName}</p>
                            <p
                              className={styles.download}
                              onClick={() => window.open(item)}
                            >
                              Скачать
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  }
                })
              }
            </div>
            {
              Array.isArray(data.fileExplain) && data.fileExplain.some(item => !item.startsWith('https')) && (
                <div className={styles.item}>
                  <div className={styles.log}>
                    <h3>Дополнительная информация:</h3>
                  </div>
                  {
                    data.fileExplain.filter(item => !item.startsWith('https')).map((item, i) => (
                      <div key={i} className={styles.document}>
                        <p className={styles.actName}>{item}</p>
                      </div>
                    ))
                  }
                </div>
              )
            }
            <div className={styles.logs}>
              <div className={styles.logs}>
                {data && data.history ? (
                  data.history.map((item, index) => (
                    <>
                      {item.admin && (
                        <p
                          style={{
                            marginLeft: "15px",
                            marginTop: "10px",
                            color: "#344054",
                          }}
                        >
                          {item.admin}
                        </p>
                      )}
                      <div
                        key={index}
                        className={
                          item.status
                            ? styles.statusStyle // Если item.status присутствует, применяем этот стиль
                            : item.type
                              ? styles.questionText // Если item.type присутствует, применяем этот стиль
                              : styles.log // Если ни одно из условий не выполнено, применяем этот стиль
                        }
                      >
                        {item.status === "answer" ? (
                          item.combinedClarifications && (
                            <Clarifications
                              clarificationsAnswer={item.combinedClarifications}
                            />
                          )
                        ) : (
                          <HighlightedText text={item.label} />
                        )}
                      </div>
                      {item.fileUrls && item.fileUrls.length > 0 && (
                        <div
                          className={styles.fileList}
                          style={{ marginLeft: "15px", marginTop: "10px" }}
                        >
                          {item.admin && (
                            <p style={{ margin: "10px 0px", color: "#344054" }}>
                              {item.admin}
                            </p>
                          )}
                          {item.fileUrls.map((fileUrl, fileIndex) => (
                            <div key={fileIndex} className={styles.fileItem}>
                              <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Document />
                                <div className={styles.fileName}>
                                  Файл {fileIndex + 1}
                                </div>
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

              {data.status === "На уточнении" && (
                <div className={styles.closedDivText}>
                  <img src={notific} alt="/" />
                  <p>Уточнения появятся здесь</p>
                </div>
              )}
            </div>
            {
              (data.status === "Отклонена" || data.status === "Рассмотрена") && (
                <div className={styles.closedDivText}>
                  <img src={notific} alt="/" />
                  <p>Заявка закрыта</p>
                </div>
              )
            }
          </div>
        </div>
      </div >
    </>
  );
};

export default DetailedApplication;