import style from './AllApplications.module.scss'
import { DatePicker, ConfigProvider, notification } from 'antd';
import ruRU from 'antd/es/locale/ru_RU'
import { ArrowDown, Calendar } from '../../components/Svgs/Svgs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher, url } from '../../core/axios'
import Loader from '../../components/Loader/Loader'
import { useNavigate } from 'react-router-dom'

const AllApplications = () => {
    const { data } = useSWR(`${url}/application/getAll`, fetcher);
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('')
    const { mutate } = useSWRConfig()
    const navigate = useNavigate()

    const handleChangeCompany = (event) => {
        setCompany(event.target.value);
    };
    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    const filteredData = data?.filter((application) => {
        const statusMatch = status ? application.status === status : true;
        const companyMatch = company ? application.name === company : true;
        return statusMatch && companyMatch;
    });

    const dateOnChange = (date, id, _id) => {
        try {
            mutate(`${url}/application/getAll`, fetcher(`${url}/application/set-date/${id}`, {
                method: 'POST',
                body: JSON.stringify({
                    _id,
                    date: date.toISOString(),
                }),
            }))
            notification.success({
                message: "Дата ответа успешно установлена.",
                duration: 2,
                style: {fontFamily: "Inter"}
            })
        } catch (e) {
            console.log(e)
        }
    };

    const statuses = [
        { value: 'В работе', label: 'В работе' },
        { value: 'На уточнении', label: 'На уточнении' },
        { value: 'Отклонена', label: 'Отклонена' },
        { value: 'На рассмотрении', label: 'На рассмотрении' },
        { value: 'Рассмотрена', label: 'Рассмотрена' },
    ]

    const statusStyles = {
        'В работе': style.inactive,
        'На уточнении': style.onClarification,
        'Отклонена': style.blocked,
        'На рассмотрении': style.active,
        'Рассмотрена': style.active
    }

    if (!data) return <Loader />

    return (
        <div className={style.wrapper}>
            <div className={style.topDiv}>
                <h2>Все заявки</h2>
            </div>
            <div className={style.topWrapper}>
                <div className={style.selects}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label" style={{ fontFamily: "Inter" }}>
                            Компании
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={company}
                            label="Компании"
                            style={{ fontFamily: "Inter", width: "164px" }}
                            onChange={handleChangeCompany}
                        >
                            <MenuItem value="">Все компании</MenuItem>
                            {data.map((item, i) => (
                                <MenuItem key={i} style={{ fontFamily: "Inter" }} value={item.name}>
                                    {item.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label" style={{ fontFamily: "Inter" }}>Статус</InputLabel>
                        <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            style={{ width: "164px", fontFamily: "Inter" }}
                            value={status}
                            label="Статус"
                            onChange={handleChangeStatus}
                        >
                            {statuses.map((item, i) => (
                                <MenuItem key={i} style={{ fontFamily: "Inter" }} value={item.value}>{item.value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className={style.searchBar}>
                    <input type="text" placeholder="Поиск по номеру заказа, компании или ИНН" />
                </div>
            </div>
            <div className={style.container}>
                <table className={style.usersTable}>
                    <thead>
                        <tr>
                            <th>Номер заявки</th>
                            <th>Компания</th>
                            <th className={style.thRight}>Статус заявки <ArrowDown /></th>
                            <th className={style.thRight}>Срок ответа <ArrowDown /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((application, i) => (
                            <tr key={i}>
                                <td >№{application.normalId}</td>
                                <td >{application.name}<br /> <span>ИНН {application.inn}</span></td>
                                <td className={style.flexEnd}><span className={statusStyles[application.status]}>{application.status}</span></td>
                                <td className={style.flexEnd}>
                                    <div>
                                        {
                                            !application.dateAnswer ? (
                                                <ConfigProvider locale={ruRU}>
                                                    <DatePicker onChange={(date) => dateOnChange(date, application.owner, application._id)} />
                                                </ConfigProvider>
                                            ) : <button className={style.btnDate}>
                                                <Calendar />
                                                {application.dateAnswer}
                                            </button>
                                        }
                                        <button className={style.next} onClick={() => navigate(`/application/${application._id}`)}>
                                            <svg
                                                width={20}
                                                height={20}
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M4.16675 10H15.8334M15.8334 10L10.0001 4.16669M15.8334 10L10.0001 15.8334"
                                                    stroke="white"
                                                    strokeWidth="1.66667"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllApplications