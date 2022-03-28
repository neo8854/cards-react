import React from "react";
import styles from "./Button.module.scss";

export const Button = ({ children, disabled, onConsoleData }) => {
  return (
    <button
      className={styles.uiBtn}
      disabled={disabled}
      onClick={onConsoleData}
    >
      {children}
    </button>
  );
};
