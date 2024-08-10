import { Docs, Pdf } from "../../pages/DetailedApplication/Svgs";
import PropTypes from 'prop-types'
import styles from '../../pages/DetailedApplication/DetailedApplication.module.scss'
import HighlightedText from "../../pages/DetailedApplication/HighlightedText/HighlightedText";

const getFileExtension = (url) => {
    const pathname = new URL(url).pathname;
    const ext = pathname.substring(pathname.lastIndexOf("."));
    return ext;
};

const ChangesLog = ({ data }) => {
    const fileActExtension = data?.fileAct ? getFileExtension(data.fileAct) : "";
    const fileExplain = data?.fileExplain ? getFileExtension(data.fileExplain) : "";
    const filesObj = {
        ".pdf": <Pdf />,
        ".docx": <Docs />,
    };
    const actFile = filesObj[fileActExtension];
    const explainFile = filesObj[fileExplain];

    return (
        <div className={styles.reportChanges}>
            <h2>Изменения по заявке</h2>
            <div className={styles.item}>
                <p className={styles.companyName}>Акт</p>
                <div className={styles.document}>
                    {actFile}
                    <div>
                        <p className={styles.actName}>Акт{fileActExtension}</p>
                        <p
                            className={styles.download}
                            onClick={() => window.open(data.fileAct)}
                        >
                            Скачать
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.item}>
                <p className={styles.companyName}>Пояснения к заявке</p>
                <div className={styles.document}>
                    {explainFile}
                    <div>
                        <p className={styles.actName}>Пояснения{fileExplain}</p>
                        <p
                            className={styles.download}
                            onClick={() => window.open(data.fileExplain)}
                        >
                            Скачать
                        </p>
                    </div>
                </div>
            </div>
            <div className={styles.logs}>
                <div className={styles.log}>
                    <h3>Создана заявка №{data.normalId}</h3>
                </div>
                {data.history && data.history.map((item, index) => (
                    <div key={index}>
                        {item.admin && (
                            <p style={{ marginLeft: "15px", marginTop: "10px", color: "#344054" }}>
                                {item.admin}
                            </p>
                        )}
                        <HighlightedText item={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

ChangesLog.propTypes = {
    data: PropTypes.object,
}

export default ChangesLog