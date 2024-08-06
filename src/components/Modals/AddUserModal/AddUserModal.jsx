import React, { useState, useEffect } from "react";
import s from "./AddUserModal.module.scss";
import Modal from "../../Modal/Modal";
import CheckBox from './CheckBox/CheckBox';
import useSWR, { useSWRConfig } from "swr";
import { fetcher, url } from "../../../core/axios";
import Loader from "../../Loader/Loader";

const AddUserModal = ({ isActive, setActive, admin }) => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [comment, setComment] = useState("");
    const [mail, setMail] = useState(false);
    const [application, setApplication] = useState(false);
    const [company, setCompany] = useState(false);
    const [roles, setRoles] = useState(false);
    const [blocked, setBlocked] = useState(false)
    const {mutate} = useSWRConfig()
    console.log(admin)
    useEffect(() => {
        if (admin === null) {
            setFullName('')
            setUsername('')
            setPassword('')
            setComment('')
            setMail(false)
            setApplication(false)
            setCompany(false)
            setRoles(false)
            setBlocked(false)
        } else if (admin) {
            setFullName(admin.fio)
            setUsername(admin.login)
            setComment(admin.comment)
            setMail(admin.access.includes("Почта"))
            setApplication(admin.access.includes("Заявки"))
            setCompany(admin.access.includes("Компании"))
            setRoles(admin.access.includes("Настройки"))
            setBlocked(true)
        }
    }, [admin])
    const handleCreate = async () => {
        if (!admin) {
            const bodyParams = {
                fio: fullName, login: username, password: password, comment, access: []
            }
            if (mail) bodyParams.access.push("Почта");
            if (application) bodyParams.access.push("Заявки");
            if (company) bodyParams.access.push("Компании");
            if (roles) bodyParams.access.push("Настройки");
    
    
            const {data} = await mutate(`${url}/admins`, fetcher(`${url}/admin/create`, {
                method: "POST",
                body: JSON.stringify(bodyParams)
            }))
            setActive()
        } else {
            const bodyParams = {
                fio: fullName, login: username, comment, access: []
            }
            if (mail) bodyParams.access.push("Почта");
            if (application) bodyParams.access.push("Заявки");
            if (company) bodyParams.access.push("Компании");
            if (roles) bodyParams.access.push("Настройки");

            const {data} = await mutate(`${url}/admins`, fetcher(`${url}/admin/${admin._id}`, {
                method: "PUT",
                body: JSON.stringify(bodyParams)
            }))
            setActive()
        }
            
        
    };

    // if (!data) return <Loader />

    return (
        <Modal
            isOpened={isActive}
            text={"Добавить пользователя"}
            setOpen={setActive}
            long={true}
            icon={"plus"}
        >
            <div className={s.firstBlock}>
                <div className={s.textareaDiv}>
                    <h2>
                        ФИО пользователя <span>*</span>
                    </h2>
                    <input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={"Иван Иванов"}
                    />
                </div>
                <div className={s.doubleInputs}>
                    <div className={s.textareaDiv}>
                        <h2>
                            Логин <span>*</span>
                        </h2>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder={"username"}
                        />
                    </div>
                    <div className={s.textareaDiv}>
                        <h2>Пароль <span>*</span></h2>
                        <input
                            disabled={blocked}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={"••••••••"}
                        />
                    </div>
                </div>
                <div className={s.textareaDiv}>
                    <h2>Комментарий </h2>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder={"например, Системный администратор"}
                    />
                </div>
                <div className={s.textareaDiv}>
                    <h2>Доступ к разделам <span>*</span></h2>
                    <div className={s.checkBoxes}>
                        <div className={`${s.checkBoxBlock} ${mail ? s.active : ''}`}>
                            <div className={s.topContainer}>
                                <h5>Почта</h5>
                                <CheckBox value={mail} setChecked={setMail} />
                            </div>
                            <p>Возможность ответа на заявки, выставление даты ответа</p>
                        </div>
                        <div className={`${s.checkBoxBlock} ${application ? s.active : ''}`}>
                            <div className={s.topContainer}>
                                <h5>Заявки</h5>
                                <CheckBox value={application} setChecked={setApplication} />
                            </div>
                            <p>Просмотр заявок и ответов, выставление даты ответа</p>
                        </div>
                        <div className={`${s.checkBoxBlock} ${company ? s.active : ''}`}>
                            <div className={s.topContainer}>
                                <h5>Компании</h5>
                                <CheckBox value={company} setChecked={setCompany} />
                            </div>
                            <p>Просмотр зарегистрированных компаний и заявок по ним</p>
                        </div>
                        <div className={`${s.checkBoxBlock} ${roles ? s.active : ''}`}>
                            <div className={s.topContainer}>
                                <h5>Настройки ролей</h5>
                                <CheckBox value={roles} setChecked={setRoles} />
                            </div>
                            <p>Возможность добавления новых пользователей.</p>
                        </div>
                    </div>
                </div>
                <div className={s.btns}>
                    <button className={s.whiteBtn} onClick={() => setActive(false)}>Отмена</button>
                    <button className={s.blueBtn} onClick={handleCreate}>{admin ? "Изменить" : "Создать"}</button>
                </div>
            </div>
        </Modal>
    );
};

export default AddUserModal;
