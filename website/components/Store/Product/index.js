import styles from "./index.module.scss";
import axios from "../../../config/axios";
import { useState, useEffect } from "react";
export default function Product({ product, size, id}) {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const cartprom = axios.get("/api/cart/").then((cart => {
      setCartItems(cart.data.cart);
      console.log(cart.data.cart);
    }))
  },[])
  function CartAppend(prod){
    console.log(prod._id)
    console.log([...cartItems, prod._id])
    setCartItems(cartItems => 
      [...cartItems, prod._id]
    );
    console.log(cartItems)
    const cartUpdate = axios.post("/api/cart/update", {
      cart: [...cartItems, prod._id]
    }).then((cart) => {
      console.log(cart.data.cart)
    })
    
    
  }

  if (size === "small") {
    return (
      <div className={styles.product__small}>
        <img
          src={product.picture}
          alt={product.name}
          className={styles.product__small__image}
        />
        <h2>{product.name}</h2>
        <h3>${product.price}</h3>
        <p>{product.description}</p>
        <button onClick={(e) => {CartAppend(product)}}>Add to cart</button>
      </div>
    );
  }
  return (
    <div className={styles.product__large}>
      <img
        src={product.picture}
        alt={product.name}
        className={styles.product__large__image}
      />

      <div className={styles.product__large__info}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <button>Add to cart</button>
      </div>
      <div>
      </div>
    </div>
  );
}
