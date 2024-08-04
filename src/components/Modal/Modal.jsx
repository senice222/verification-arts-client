import s from './Modal.module.scss'
import {Cross, Folder} from "./Svgs";


const Modal = ({children, isOpened, setOpen, long}) => {
    return (
        <div onClick={setOpen} className={`${s.bgModal} ${isOpened ? s.activeBg : ""}`}>
            <div onClick={(e) => e.stopPropagation()} className={`${s.content} ${long ? s.long : ''}`}>
                <div className={s.topDiv}>
                    <div className={s.folderDiv}>
                        <Folder />
                    </div>
                    <div onClick={setOpen} className={s.cross}><Cross /></div>
                </div>
                <div className={s.contWrapper}>
                    <div className={s.modalCont}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Modal