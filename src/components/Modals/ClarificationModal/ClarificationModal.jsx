import React from 'react';
import s from './ClarificationModal.module.scss'
import Modal from '../../Modal/Modal'
import UploadButton from '../../../pages/DetailedApplication/UploadButton/UploadButton'
const ClarificationModal = ({isOpen, setOpen}) => {
  return (
    <Modal isOpened={isOpen} setOpen={setOpen} long={true}>
        <h2>Передать заявку на уточнение</h2>
        <p>Клиенту будет предложено дополнить заявку - текстом и файлами.</p>
        <div className={s.firstBlock}>
            <UploadButton />
            <div className={s.textareaDiv}>
              <h2>Комментарий <span>*</span></h2>
              <textarea placeholder={"Введите описание"} />
            </div>
            <div className={s.btns}>
                <button className={s.whiteBtn}>Закрыть</button>
                <button className={s.blueBtn}>Передать на уточнение</button>
            </div>
          </div>
    </Modal>
  )
}

export default ClarificationModal