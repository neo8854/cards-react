import React from "react";
import styles from "./Button.module.scss";

export const Button = ({ children, disabled, onConsoleData, onClick }) => {
  return (
    <button
      className={styles.uiBtn}
      disabled={disabled}
      onClick={onClick}
      onChange={onConsoleData}
    >
      {children}
    </button>
  );
};
