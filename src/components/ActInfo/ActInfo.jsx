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

const ActInfo = ({ data, filesObj }) => {
    return (
        <>
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
                                        <p className={styles.actName}>{fileName.split("@")[1]}</p>
                                        <p className={styles.download} onClick={() => window.open(item)}>Скачать</p>
                                    </>
                                ) : (
                                    <p className={styles.actName}>{item}</p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ActInfo;
