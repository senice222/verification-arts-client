import styles from "./DetailedApplication.module.scss";
import PathComponent from "../../components/PathComponent/PathComponent";
import {
  Pdf,
  Docs,
} from "./Svgs";
import CancelModal from "../../components/Modals/CancelModal/CancelModal";
import { useState } from "react";
import ClarificationModal from "../../components/Modals/ClarificationModal/ClarificationModal";
import useSWR, { useSWRConfig } from "swr";
import { useNavigate, useParams } from "react-router-dom";
import $api, { fetcher, url } from "../../core/axios";
import Loader from "../../components/Loader/Loader";
import moment from 'moment'
import { useSelector } from "react-redux";
import TopActions from "../../components/TopActions/TopActions";
import AlertBox from "../../components/AlertBox/AlertBox";
import CompanyInfo from "../../components/CompanyInfo/CompanyInfo";
import ResponseForm from "../../components/ResponseForm/ResponseForm";
import ReportChanges from "../../components/ReportChanges/ReportChanges";
import { notification } from "antd";

const DetailedApplication = () => {
  const { id } = useParams();
  const { data } = useSWR(`${url}/application/detailed/${id}`, fetcher);
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();
  const [comments, setComments] = useState("");
  const [isOpened, setOpened] = useState(false);
  const [isCancel, setCancel] = useState(false);
  const [uploads, setUploads] = useState([]);
  const admin = useSelector((state) => state.admin.data);
  const [loading, setLoading] = useState(false)

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

  const handleAnswer = async () => {
    const formData = new FormData();
    formData.append("_id", data._id);
    formData.append("comments", comments);
    formData.append("admin", admin.login);
    formData.append("status", "Рассмотрена");
    uploads.forEach((file) => {
      formData.append("files", file.file);
    });

    try {
      setLoading(true)
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
      setLoading(false)
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
        <TopActions normalId={data.normalId} status={data.status} handleDelete={handleDelete} />
        <hr />
        <h2 className={styles.subtitle}>Информация о заявке</h2>
        <hr />
        <AlertBox dateAnswer={data.dateAnswer} />
        <CompanyInfo data={data} dateOnChange={dateOnChange} disabledDate={disabledDate} />
        <div className={styles.twoBlocks}>
          <ResponseForm
            data={data}
            setOpened={setOpened}
            setCancel={setCancel}
            uploads={uploads}
            setUploads={setUploads}
            comments={comments}
            setComments={setComments}
            handleAnswer={handleAnswer}
            loading={loading}
          />
          <div className={styles.reportChanges}>
            <ReportChanges data={data} filesObj={filesObj} />
          </div>
        </div>
      </div >
    </>
  );
};

export default DetailedApplication;