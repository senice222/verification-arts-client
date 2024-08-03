import React, { useRef, useState } from 'react';
import styles from './UploadButton.module.scss';
import { ClipLoader } from 'react-spinners';

const UploadButton = () => {
    const [uploads, setUploads] = useState([]);
    const fileInputRef = useRef(null);

    const handleContainerClick = () => {
        fileInputRef.current?.click();
    };

    const handleDeleteFile = (index) => {
        setUploads((prevUploads) => prevUploads.filter((_, i) => i !== index));
    };

    const handleFileUpload = (event) => {
        const files = event.target.files;
        if (files) {
            const newUploads = Array.from(files).map((file) => ({
                file,
                progress: 0,
                uploaded: false,
            }));
            setUploads((prevUploads) => [...prevUploads, ...newUploads]);
            newUploads.forEach((upload, index) => simulateUpload(index));
        }
    };

    const simulateUpload = (index) => {
        const interval = setInterval(() => {
            setUploads((prevUploads) => {
                const newUploads = [...prevUploads];
                if (newUploads[index].progress < 100) {
                    newUploads[index].progress += 25;
                } else {
                    newUploads[index].uploaded = true;
                    clearInterval(interval);
                }
                return newUploads;
            });
        }, 200);
    };

    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    return (
        <div className={styles.wrapper}>
            <div onClick={handleContainerClick} className={styles.container}>
                <input
                    type="file"
                    multiple
                    accept="image/svg+xml, image/png, image/jpeg, image/gif, video/mp4, application/pdf"
                    className={styles.input}
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                />
                <div className={styles.content}>
                    <div className={styles.icon}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M6.66602 13.3333L9.99935 10M9.99935 10L13.3327 13.3333M9.99935 10V17.5M16.666 13.9524C17.6839 13.1117 18.3327 11.8399 18.3327 10.4167C18.3327 7.88536 16.2807 5.83333 13.7493 5.83333C13.5673 5.83333 13.3969 5.73833 13.3044 5.58145C12.2177 3.73736 10.2114 2.5 7.91602 2.5C4.46424 2.5 1.66602 5.29822 1.66602 8.75C1.66602 10.4718 2.36222 12.0309 3.48847 13.1613"
                                stroke="#344054"
                                strokeWidth="1.66667"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <p className={styles.text}>
                        <span>Нажмите здесь</span> чтобы загрузить фотографии
                    </p>
                </div>
            </div>
            <div className={styles.uploadList}>
                {uploads.map((upload, index) => (
                    <div key={index} className={styles.uploadItem}>
                        <div className={styles.fileInfo}>
                            <div className={styles.fileName}>
                                <h2>{upload.file.name}</h2>
                                <p className={styles.descr}>
                                    {formatBytes(upload.file.size)} - {upload.progress}% uploaded
                                </p>
                            </div>
                            <div className={styles.fileStatus}>
                                {upload.uploaded ? (
                                    <div>
                                        <span className={styles.checkMark}>✔️</span>
                                        <span className={styles.checkMark} onClick={() => handleDeleteFile(index)}>❌</span>
                                    </div>
                                ) : (
                                    <ClipLoader size={15} color={"#123abc"} loading={true} />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UploadButton;
