import React, { useState, useEffect } from 'react';
import styles from './PopUp.module.scss';

const PopUp = ({ message, duration }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className={styles.popUp}>
      {message}
    </div>
  );
};

export default PopUp;