import { url } from '../../core/axios';
import Clarifications from '../../pages/DetailedApplication/Clarification/Clarification';
import styles from '../../pages/DetailedApplication/DetailedApplication.module.scss';
import HighlightedText from '../../pages/DetailedApplication/HighlightedText/HighlightedText';
import { Document } from '../../pages/DetailedApplication/Svgs';

const HistoryLog = ({ data }) => {
  return (
    <div className={styles.logs}>
      {data?.history?.map((item, index) => (
        <div key={index}>
          {item.admin && (
            <p style={{ marginLeft: "15px", marginTop: "10px", color: "#344054" }}>
              {item.admin}
            </p>
          )}
          <div
            className={
              item.status
                ? styles.statusStyle
                : item.type
                  ? styles.questionText
                  : styles.log
            }
          >
            {item.status === "answer" ? (
              item.combinedClarifications && (
                <Clarifications clarificationsAnswer={item.combinedClarifications} />
              )
            ) : (
              <HighlightedText text={item.label} />
            )}
          </div>
          {item.fileUrls && item.fileUrls.length > 0 && (
            <div className={styles.fileList} style={{ marginLeft: "15px", marginTop: "10px" }}>
              {item.fileUrls.map((fileUrl, fileIndex) => (
                <div key={fileIndex} className={styles.fileItem}>
                  <a href={`${url}/api/uploads/${fileUrl}`} download>
                    <Document />
                    <div className={styles.fileName}>Файл {fileIndex + 1}</div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )) || <p>loading..</p>}
    </div>
  );
};

export default HistoryLog;
