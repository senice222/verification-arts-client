import { ArrowLeft, CrossReport } from "../../pages/DetailedApplication/Svgs";
import UploadButton from "../../pages/DetailedApplication/UploadButton/UploadButton";
import { Pencil } from "../Svgs/Svgs";
import styles from '../../pages/DetailedApplication/DetailedApplication.module.scss';

const ResponseForm = ({
    data,
    setOpened,
    setCancel,
    uploads,
    setUploads,
    comments,
    setComments,
    handleAnswer,
    loading,
}) => {
    const isButtonDisabled = !(uploads.length > 0 && uploads.some(upload => upload.uploaded)) && comments.trim() === '';

    return (
        <div className={styles.report}>
            <h2>Отправить ответ</h2>
            <hr />
            {data.status !== "Отклонена" &&
                data.status !== "Рассмотрена" &&
                data.status !== "На уточнении" ? (
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
                                maxLength={4096}
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                placeholder="Введите описание"
                            />
                        </div>
                        <button
                            className={styles.finalBtn}
                            disabled={isButtonDisabled}
                            onClick={handleAnswer}
                        >
                            {loading ? <p>Загрузка..</p> : <p><ArrowLeft /> Отправить ответ и закрыть заявку</p>}
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
    );
};

export default ResponseForm;
