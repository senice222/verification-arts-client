import { ArrowLeft, CrossReport } from "../../pages/DetailedApplication/Svgs";
import UploadButton from "../../pages/DetailedApplication/UploadButton/UploadButton";
import { Pencil } from "../Svgs/Svgs";
import styles from '../../pages/DetailedApplication/DetailedApplication.module.scss';

const ResponseForm = ({ status, comments, setComments, uploads, setUploads, handleAnswer, setOpened, setCancel }) => {
    const isButtonDisabled = !(uploads.length > 0 && uploads.some(upload => upload.uploaded)) && comments.trim() === '';

    return (
        <div className={styles.report}>
            <h2>Отправить ответ</h2>
            <hr />
            {status !== "Отклонена" && status !== "Рассмотрена" && status !== "На уточнении" ? (
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
                        <button className={styles.finalBtn} onClick={handleAnswer} disabled={isButtonDisabled}>
                            <ArrowLeft /> Отправить ответ и закрыть заявку
                        </button>
                    </div>
                </>
            ) : (
                <button className={styles.cancelledBtn}>
                    <ArrowLeft />
                    {status === "На уточнении" ? "Заявка на уточнении" : "Заявка закрыта"}
                </button>
            )}
        </div>
    );
};

export default ResponseForm;
