import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Card.module.scss";
import { Modal } from "../Modal/Modal";
import { Button } from "./Button";

export const Card = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen((prevState) => {
      return (prevState = !prevState);
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardCategory}>{product.category}</div>
      <h3 className={styles.cardTitle}>{product.name}</h3>
      <div className={styles.cardPriceBox}>
        <div className={styles.cardPrice}>
          <span>$</span>
          {product.price}
        </div>
        <Button onClick={toggleModal}>Buy</Button>
      </div>
      {isOpen &&
        ReactDOM.createPortal(
          <Modal product={product} onToggleModal={toggleModal} />,
          document.getElementById("modal")
        )}
    </div>
  );
};
