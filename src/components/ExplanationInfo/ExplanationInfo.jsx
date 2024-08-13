import styles from '../../pages/DetailedApplication/DetailedApplication.module.scss';
import { Document } from '../../pages/DetailedApplication/Svgs';

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

const ExplanationInfo = ({ data, filesObj }) => {
    return (
        <div className={styles.item}>
            <div className={styles.log}>
                <h3>Пояснения к акту:</h3>
            </div>
            {Array.isArray(data.fileExplain) && data.fileExplain.length > 0 && data.fileExplain.map((item, i) => {
                const fileName = item.startsWith('https') ? getFileNameFromUrl(item) : '';
                const fileActExtension = item.startsWith('https') ? getFileExtension(item) : '';
                const fileExpl = filesObj[fileActExtension] ? filesObj[fileActExtension] : <Document />;
                return item.startsWith('https') ? (
                    <div key={i} className={styles.item}>
                        <p className={styles.companyName}>{data.name}</p>
                        <div className={styles.document}>
                            {fileExpl}
                            <div>
                                <p className={styles.actName}>{fileName}</p>
                                <p className={styles.download} onClick={() => window.open(item)}>Скачать</p>
                            </div>
                        </div>
                    </div>
                ) : null;
            })}
        </div>
    );
};

export default ExplanationInfo;
