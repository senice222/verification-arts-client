import { useState, useEffect } from "react";
import styles from "./Login.module.scss";
import PopUp from "../../components/PopUp/PopUp";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, fetchAuthMe } from "../../store/slices/Admin.slice";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState({ text: "", title: "" });
  const handleLoginChange = (e) => setLogin(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const admin = useSelector((state) => state.admin);
  const {transferString} = useParams()

  // const validateTransfer = async () => {
    // const data = await axios.post('http://localhost:4000/api/admin/validateTransferKey', {
    //   transferKey: transferString
    // })
    // console.log(data)
  // }
  useEffect(() => {
    if (transferString) {
      dispatch(fetchAuth({ transferKey: transferString })) 
    }
  }, [transferString])




  // const handleSubmit = async (e) => {
  //   e.preventDefault()
  //   setLoading(true)
  //   try {
  //     if (login && password) {
  //       dispatch(fetchAuth({ login, password })) 
  //     }
  //   } catch (error) {
  //     console.error("Ошибка авторизации:", error)
  //   } finally {
  //     setLoading(false) 
  //   }
  // }
  // useEffect(() => {
  //   const token = localStorage.getItem('token')
  //   if (token) {
  //     dispatch(fetchAuthMe())
  //   }
  // }, [])

  useEffect(() => {
    if (admin.error) {
      setText({
        text: "Проверьте введённые данные или обратитесь к администратору",
        title: "Неверный логин или пароль",
      });
      setVisible(true);
    }
    if (admin.data) {
      navigate('/')
    }
  }, [admin]);
  
  return (
    <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><ClipLoader loading={true} size={60}/></div>
  )

  // return (
  //   <>
  //     <PopUp
  //       visible={visible}
  //       setVisible={setVisible}
  //       message={text?.text}
  //       title={text?.title}
  //       duration={5000}
  //     />
  //     <div className={styles.wrapper}>
  //       <div className={styles.loginContainer}>
  //         <h2>Админ-панель</h2>
  //         <p>Здравствуйте! Введите данные для входа.</p>
  //         <form onSubmit={handleSubmit}>
  //           <div className={styles.inputGroup}>
  //             <label htmlFor="login">Логин</label>
  //             <input
  //               type="text"
  //               id="login"
  //               placeholder="login"
  //               value={login}
  //               onChange={handleLoginChange}
  //               className={styles.input}
  //             />
  //           </div>
  //           <div className={styles.inputGroup}>
  //             <label htmlFor="password">Пароль</label>
  //             <input
  //               type="password"
  //               id="password"
  //               placeholder="••••••••"
  //               value={password}
  //               onChange={handlePasswordChange}
  //               className={styles.input}
  //             />
  //           </div>
  //           <button type="submit" className={styles.submitButton}>
  //             {/* {loading ? (
  //               <ClipLoader size={20} color={'#ffffff'} loading={true} />
  //             ) : ( */}
  //               Войти
  //             {/* )} */}
  //           </button>
  //         </form>
  //         <p className={styles.note}>
  //           Чтобы получить данные для входа, обратитесь к администратору
  //         </p>
  //       </div>
  //     </div>
  //   </>
  // );
};

export default Login;
