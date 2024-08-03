import React, {useEffect} from 'react'
import styles from './PanelLayout.module.scss'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAuthMe } from '../../store/slices/Admin.slice'
import NavBar from '../../components/PopUp/NavBar/NavBar'
import Loader from '../../components/Loader/Loader'

const PanelLayout = () => {

  const dispatch = useDispatch()
  const admin = useSelector((state) => state.admin)
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])
  
  useEffect(() => {
    if (!admin.data && !admin.loading) {
      navigate('/login')
    }
  }, [admin])
  
  if (admin.loading) {
    return <Loader />
  }
  return (
    <div className={styles.layout}>
        <NavBar />
        <div className={styles.content}><Outlet /></div>
    </div>
  )
}

export default PanelLayout