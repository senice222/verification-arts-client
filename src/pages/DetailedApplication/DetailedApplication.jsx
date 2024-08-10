import styles from "./DetailedApplication.module.scss";
import PathComponent from "../../components/PathComponent/PathComponent";
import {
  Dots,
} from "./Svgs";
import { Trash } from "../../components/Svgs/Svgs";
import { Dropdown, notification, Space } from "antd";
import CancelModal from "../../components/Modals/CancelModal/CancelModal";
import { useState } from "react";
import ClarificationModal from "../../components/Modals/ClarificationModal/ClarificationModal";
import useSWR, { useSWRConfig } from "swr";
import { useNavigate, useParams } from "react-router-dom";
import $api, { fetcher, url } from "../../core/axios";
import Loader from "../../components/Loader/Loader";
import ApplicationInfo from "../../components/ApplicationInfo/ApplicationInfo";
import ResponseForm from "../../components/ResponseForm/ResponseForm";
import ChangesLog from "../../components/ChangesLog/ChangesLog";


const DetailedApplication = () => {
  const { id } = useParams();
  const { data } = useSWR(`${url}/application/detailed/${id}`, fetcher);
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  const [comments, setComments] = useState("");
  const [isOpened, setOpened] = useState(false);
  const [isCancel, setCancel] = useState(false);
  const [uploads, setUploads] = useState([]);

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
      navigate('/')
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

  if (!data) return <Loader />;

  return (
    <>
      <ClarificationModal data={data} isOpen={isOpened} setOpen={() => setOpened(false)} />
      <CancelModal id={data.owner} productId={data._id} isOpened={isCancel} setOpened={() => setCancel(false)} />
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
                  {data.status === "Рассмотрена" || data.status === "Отклонена" && (
                    <div className={styles.dots}>
                      <Dots />
                    </div>
                  )}
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
        <ApplicationInfo data={data} navigate={navigate} dateOnChange={dateOnChange} />
        <div className={styles.twoBlocks}>
          <ResponseForm
            status={data.status}
            comments={comments}
            setComments={setComments}
            uploads={uploads}
            setUploads={setUploads}
            handleAnswer={handleAnswer}
            setOpened={setOpened}
            setCancel={setCancel}
          />
          <ChangesLog data={data} />
        </div>
      </div>
    </>
  );
};

export default DetailedApplication;
