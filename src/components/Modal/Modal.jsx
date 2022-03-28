/* eslint-disable default-case */
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../UI/Button";
import styles from "./Modal.module.scss";

export const Modal = ({ product, onToggleModal }) => {
  const [nameInput, setNameInput] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [nameTrick, setNameTrick] = useState(false);
  const [numberDirty, setNumberDirty] = useState(false);
  const [nameError, setNameError] = useState("This field in required");
  const [numberError, setNumberError] = useState("This field in required");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (nameError || numberError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, numberError]);

  const nameHandler = (e) => {
    setNameInput(e.target.value);
    const result = /^[a-zA-Z ]+$/;
    if (!result.test(e.target.value)) {
      setNameError("Only letters allowed");
    } else {
      setNameError("");
    }
  };

  const numberHandler = (e) => {
    setNumberInput(e.target.value);
    const regex = /[0-9]|\./;
    if (e.target.value.length < 12 || e.target.value.length > 12) {
      setNumberError("Should contain 12 characters");
    } else if (!regex.test(e.target.value)) {
      setNumberError("Only numbers allowed");
    } else {
      setNumberError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameTrick(true);
        break;
      case "number":
        setNumberDirty(true);
        break;
    }
  };

  const consoleData = (e) => {
    e.preventDefault();
    const data = { nameInput, numberInput, id: Date.now().toString(), product };
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
            {numberDirty && numberError && <div>{numberError}</div>}
            <input
              onChange={(e) => numberHandler(e)}
              onBlur={(e) => blurHandler(e)}
              value={numberInput}
              name="number"
              type="number"
              placeholder="Number"
            />
          </div>
          <Button disabled={!formValid} type="submit" onClick={consoleData}>
            ORDER
          </Button>
        </form>
      </div>
    </div>
  );
};
