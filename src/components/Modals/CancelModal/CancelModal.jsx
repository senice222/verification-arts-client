import React from 'react'
import Modal from '../../Modal/Modal'
import s from './CancelModal.module.scss'
import UploadButton from '../../../pages/DetailedApplication/UploadButton/UploadButton'


const CancelModal = ({isOpened, setOpened}) => {
  return (
    <Modal isOpened={isOpened} setOpen={setOpened}>
        <h2>Отмена заявки</h2>
        <p>Укажите причину отмены заявки</p>
        <div className={s.firstBlock}>
            <div className={s.textareaDiv}>
              <h2>Комментарий <span>*</span></h2>
              <textarea placeholder={"Введите причину"} />
            </div>
            <div className={s.btns}>
                <button className={s.whiteBtn}>Закрыть</button>
                <button className={s.blueBtn}>Отменить заявку</button>
            </div>
          </div>
    </Modal>
  )
}

export default CancelModal