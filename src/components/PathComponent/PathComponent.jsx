import React from "react";
import styles from "./PathComponent.module.scss";
const PathComponent = ({ first, second }) => {
  return (
    <div className={styles.PathComponent}>
      <div className={styles.firstItem}>{first}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={6}
        height={10}
        viewBox="0 0 6 10"
        fill="none"
      >
        <path
          d="M1 9L5 5L1 1"
          stroke="#D0D5DD"
          strokeWidth="1.33333"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className={styles.secondItem}>{second}</div>
    </div>
  );
};

export default PathComponent;
