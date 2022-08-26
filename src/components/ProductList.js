import React,{useContext, useEffect} from 'react'
import ProductContext from '../store/ProductContext'
import { Product } from './Product'
import { Navbar } from './Navbar'
export const ProductList = (props) => {
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
          <Navbar/>
          {
            ProductCtx.products.products.map((item,index)=>
            <Product
            productName={item.productName}
              productPrice={item.productPrice}
              productImage={item.productImage}
              productDesc={item.productDesc}
              key={index}/>
            )
          }
      </div>
    )
}
