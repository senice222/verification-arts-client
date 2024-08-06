import s from './CheckBox.module.scss'
import {FC, useEffect, useState} from "react";


const CheckBox = ({setChecked, value}) => {
    const [isChecked, setIsChecked] = useState(value)
    // useEffect(() => {
    //     setChecked(isChecked)
    // }, [isChecked]);
    // useEffect(() => {
    //     setChecked(value)
    // }, [value]);

    return (
        <div onClick={() => setChecked((value) => !value)} className={`${s.checkBox} ${value ? s.active : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M9 1L3.5 6.5L1 4" stroke="white" stroke-width="1.6666" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
    )
}
export default CheckBox