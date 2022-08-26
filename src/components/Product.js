import React from "react";
import ProductContext from "../store/ProductContext";
import { useContext, useState } from 'react';
export const Product = (props) => {
  const ProductCtx = useContext(ProductContext)
  const addToCart = () =>{
    let cartObj={
      productName:props.productName,
      productPrice:props.productPrice,
      quantity:1
    }
    let cartProducts = [...ProductCtx.carts.cartProducts]
    cartProducts = cartProducts.filter(cartitem=>cartitem.productName===props.productName)
    if(cartProducts.length>0)
      cartProducts[0].quantity = cartProducts[0].quantity+1;
    else{
      ProductCtx.carts.setCartProducts([...ProductCtx.carts.cartProducts,cartObj])
    }

}
  return (
    <div className="container">
      <div className="product_container">
        <div className="productImage">
          <img src={props.productImage}></img>
        </div>
        <div className="productName">{props.productName}</div>
        <div className="productPrice">{props.productPrice}</div>
        <div className="productDesc">{props.productDesc}</div>
        <button className="addCart" onClick={addToCart}>ADD TO CART</button>
      </div>
    </div>
  );
};
