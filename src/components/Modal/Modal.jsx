/* eslint-disable default-case */
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../UI/Button";
import styles from "./Modal.module.scss";

export const Modal = ({ product, onToggleModal }) => {
  const [nameInput, setNameInput] = useState("");
  const [namberInput, setNamberInput] = useState("");
  const [nameTrick, setNameTrick] = useState(false);
  const [namberDirty, setNamberDirty] = useState(false);
  const [nameError, setNameError] = useState("This field in required");
  const [namberError, setNamberError] = useState("This field in required");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (nameError || namberError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, namberError]);

  const nameHandler = (e) => {
    setNameInput(e.target.value);
    const result = /^[a-zA-Z ]+$/;
    if (!result.test(e.target.value)) {
      setNameError("Only letters allowed");
    } else {
      setNameError("");
    }
  };

  const namberHandler = (e) => {
    setNamberInput(e.target.value);
    const regex = /[0-9]|\./;
    if (e.target.value.length < 12 || e.target.value.length > 12) {
      setNamberError("Should contain 12 characters");
    } else if (!regex.test(e.target.value)) {
      setNamberError("Only numbers allowed");
    } else {
      setNamberError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameTrick(true);
        break;
      case "namber":
        setNamberDirty(true);
        break;
    }
  };

  const consoleData = (e) => {
    e.preventDefault();
    const data = { nameInput, namberInput, id: Date.now().toString(), product };
    console.log(data);
  };

  return (
    <div className={styles.modal}>
      <div className={styles.card}>
        <div className={styles.closeWrapper}>
          <button className={styles.close} onClick={onToggleModal}>
            x
          </button>
        </div>
        <div className={styles.cardCategory}>{product.category}</div>
        <h3 className={styles.cardTitle}>{product.name}</h3>
        <div className={styles.cardPriceBox}>
          <div className={styles.cardPrice}>
            <span>$</span>
            {product.price}
          </div>
        </div>
        <form action="">
          <div className={styles.helpBlock}>
            {nameTrick && nameError && <div>{nameError}</div>}
            <input
              onChange={(e) => nameHandler(e)}
              onBlur={(e) => blurHandler(e)}
              value={nameInput}
              name="name"
              type="text"
              placeholder="Name"
              maxLength={20}
              minLength={2}
            />
          </div>
          <div className={styles.helpBlock}>
            {namberDirty && namberError && <div>{namberError}</div>}
            <input
              onChange={(e) => namberHandler(e)}
              onBlur={(e) => blurHandler(e)}
              value={namberInput}
              name="namber"
              type="number"
              placeholder="Number"
            />
          </div>
          <Button
            disabled={!formValid}
            type="submit"
            onConsoleData={consoleData}
          >
            ORDER
          </Button>
        </form>
      </div>
    </div>
  );
};
