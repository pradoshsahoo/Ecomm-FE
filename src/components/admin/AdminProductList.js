import React, { useContext,useEffect } from "react";
import { NavbarAdmin } from "../NavbarAdmin";
import ProductContext from "../../store/ProductContext";
import { AdminProducts } from "./AdminProducts";
export const AdminProductList = (props) => {
  const ProductCtx = useContext(ProductContext)
    useEffect(()=>{
        getProducts()
    },[ProductCtx.products.products])
    const getProducts=async()=>{
        const data =await fetch("http://localhost:4001/product");
        const products_data = await data.json();
        ProductCtx.products.setProducts(products_data.products);
    }
  return (
    <div>
          <NavbarAdmin/>
          {
            ProductCtx.products.products.map((item,index)=>
            <AdminProducts
            productName={item.productName}
              productPrice={item.productPrice}
              productImage={item.productImage}
              productDesc={item.productDesc}
              productId = {item._id}
              key={index}/>
            )
          }
      </div>
    )
};
