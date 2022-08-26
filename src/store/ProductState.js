import React,{useState} from 'react'
import ProductContext from './ProductContext'
export const ProductState = (props) =>{
    const [products,setProducts] = useState([])
    const [cartProducts,setCartProducts] = useState([])
    const [totalAmount,setTotalAmount] = useState(0)
    return (
        <ProductContext.Provider value={{products:{products,setProducts},carts:{cartProducts,setCartProducts},total:{totalAmount,setTotalAmount}}}>
            {props.children}
        </ProductContext.Provider>
    )
}