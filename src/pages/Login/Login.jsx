import React, { useState } from "react";
import styles from "./Login.module.scss";
import PopUp from "../../components/PopUp/PopUp";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginChange = (e) => setLogin(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", login, "Password:", password);
  };

  return (
    <>
    <PopUp message={'Hello fucker'} duration={5000}/>
    <div className={styles.wrapper}>
      <div className={styles.loginContainer}>
        <h2>Админ-панель</h2>
        <p>Здравствуйте! Введите данные для входа.</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="login">Логин</label>
            <input
              type="text"
              id="login"
              placeholder="login"
              value={login}
              onChange={handleLoginChange}
              className={styles.input}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={handlePasswordChange}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
        </form>
        <p className={styles.note}>
          Чтобы получить данные для входа, обратитесь к администратору
        </p>
      </div>
    </div>
    </>
  );
};

export default Login;
