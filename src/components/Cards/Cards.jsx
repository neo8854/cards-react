import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Card } from "../UI/Card";
import { Button } from "../UI/Button";
import { Modal } from "../Modal/Modal";
import axios from "axios";
import styles from "./Cards.module.scss";

export const Cards = () => {
  const [products, setProducts] = useState([]);
  const [lowest, setLowest] = useState(0);
  const [showCheapes, setShowCheapes] = useState(false);

  const toggleModal = () => {
    setShowCheapes((prevState) => {
      return (prevState = !prevState);
    });
  };

  useEffect(() => {
    const lowestPrice = products.reduce((prev, curr) => {
      return prev.price < curr.price ? prev : curr;
    }, 0);
    setLowest(lowestPrice);
  }, [products]);

  useEffect(() => {
    const productApi = async () => {
      const productList = await axios
        .get("https://run.mocky.io/v3/b7d36eea-0b3f-414a-ba44-711b5f5e528e")
        .then((response) => response.data);
      productList.map((product, idx) => (product.id = idx));
      setProducts(productList);
    };
    productApi();
  }, []);
  return (
    <div>
      <div className={styles.cardWrapper}>
        {products.length === 0
          ? null
          : products.map((product) => (
              <Card product={product} key={product.id} />
            ))}
      </div>
      <div className={styles.cardControls}>
        <Button onClick={toggleModal}>Buy cheapest</Button>
      </div>
      {showCheapes &&
        ReactDOM.createPortal(
          <Modal product={lowest} onToggleModal={toggleModal} />,
          document.getElementById("modal")
        )}
    </div>
  );
};
