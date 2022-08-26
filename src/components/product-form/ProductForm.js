import { useContext, useState } from 'react';
import axios from 'axios';
import React from 'react';
import ProductContext from '../../store/ProductContext';
import { Link} from 'react-router-dom';
import { NavbarAdmin } from '../NavbarAdmin';
const ProductForm =(props)=>{
    const ProductCtx = useContext(ProductContext)
  
    const [formInput,setFormInput] = useState({
        productName:'',
        productPrice:'',
        productImage:'',
        productDesc:''
    })


    const [err,setErr]=useState({
        isError:false,
        message:''
    })

    const productNameHandler = (event) =>{
        setFormInput((prevState)=>
        {
            return{
            ...prevState,
            productName:event.target.value
            }
        })
    }

    const productPriceHandler = (event) =>{
        setFormInput((prevState)=>{
            return{
                ...prevState,
                productPrice:'$'+event.target.value
            }
        })
    }
    const productImageHandler = (event) =>{
        setFormInput((prevState)=>{
            return{
                ...prevState,
                productImage:event.target.value
            }
        })
    }
    const productDescHandler = (event) =>{
        setFormInput((prevState)=>{
            return{
                ...prevState,
                productDesc:event.target.value
            }
        })
    }
    const formSubmitHandler = async (event) =>{
        event.preventDefault();
        if(formInput.productName == '')
        {
            setErr({
                isError:true,
                message:'Enter product name'

            })
        }
        else if(formInput.productPrice == '')
        {
            setErr({
                isError:true,
                message:'Enter product price'
            })
        }
        else if(formInput.productImage == '')
        {
            setErr({
                isError:true,
                message:'Enter product image'
            })
        }
        else if(formInput.productDesc == '')
        {
            setErr({
                isError:true,
                message:'Enter product desc'
            })
        }
        else{
            setErr({
                isError:true,
                message:'Product saved successfully'
            })
            await saveProductData(formInput);
            // props.onProductAdded(true);
        }
    }
    const saveProductData = async (FormData) =>{
        const product = {
            productName:FormData.productName,
            productPrice:FormData.productPrice,
            productImage:FormData.productImage,
            productDesc:FormData.productDesc
        }
        const message = await axios.post("http://localhost:4001/product",product,{
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':localStorage.getItem('token')
            }
        })
        ProductCtx.products.setProducts([...ProductCtx.products.products,product])
    }
    return(
        <div>
        <NavbarAdmin/>
        <h1>ADD PRODUCT</h1>
        <div className="form-container">
        <form onSubmit={formSubmitHandler}>
            {err.isError ? <div className='errorMessage'>{err.message}</div> : null}
            <div className="form-input3">
                <input type="text" placeholder='Product Name' onChange={productNameHandler} />
            </div>
            <div className="form-input3">
                <input type="text" placeholder='Product Price' onChange={productPriceHandler}/>
            </div>
            {/* <div className='clearfix'></div> */}
            <div className="form-input3">
                <input type="text" placeholder='Product Image' onChange={productImageHandler}/>
            </div>
            <div className="form-input3">
                <input type="text" placeholder='Product description' onChange={productDescHandler}/>
            </div>
            {/* <div className='clearfix'></div> */}
            <div className="form-input3">  
                <button className="add_product">ADD</button>         
            </div>
            {/* <div className='clearfix'></div> */}
        </form>
        </div>
    </div>
    )
}

export default ProductForm;