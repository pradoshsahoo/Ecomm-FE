import React,{useContext, useEffect,useState} from 'react'
import ProductContext from '../../store/ProductContext'
import { Cart } from './Cart'
import { Navbar } from '../Navbar'
import { Link } from 'react-router-dom'
export const CartList = (props) => {
    const ProductCtx = useContext(ProductContext)
    const [bought,setBought] = useState(false);
    const boughtHandler=()=>{
      setBought(true);
      ProductCtx.carts.setCartProducts([]);
    }
    return (
      <div>
          <Navbar/>
          {bought?<div className="errorMessage1">Product bought successfully!</div>:null}
          <br/>
          {
            ProductCtx.carts.cartProducts.map((item,index)=>
            <Cart
              productName={item.productName}
              productPrice={item.productPrice}
              quantity={item.quantity}
              key={index}/>
            )
          }
          {
          ProductCtx.carts.cartProducts.length?
          <div className='totalAmount'>
            Total:{' $'+ProductCtx.carts.cartProducts.reduce((sum,item)=>sum+=item.quantity*Number(item.productPrice.substring(1)),0)}
            <br />
            <button className='addCart' onClick={boughtHandler}>BUY NOW</button>
          </div>
          :
          <div className='totalAmount'>
            Cart is<br/>
            Empty
          </div>
          }
      </div>
    )
}
