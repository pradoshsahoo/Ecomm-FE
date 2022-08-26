import React, { useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditContext from "../../store/EditContext";
export const AdminProducts = (props) => {
  const EditCtx = useContext(EditContext);
  const editProductHandler=()=>{
    const obj={
      name:props.productName,
      price:props.productPrice,
      image:props.productImage,
      desc:props.productDesc
    }
    EditCtx.setEdit(obj);
    console.log(EditCtx.edit);
  }
  const deleteProductHandler=async ()=>{
    const URL = "http://localhost:4001/product/"+props.productId;
    console.log(URL);
    const message = await axios.delete(URL,{
      headers:{
        'x-auth-token':localStorage.getItem('token')
      }
    })
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
        <Link to={`/admin/products/edit/${props.productId}`} style={{textDecoration:"none",color:"white"}}>
          <button className="editCart" onClick={editProductHandler}>EDIT</button>
        </Link>
        <button className="editCart" onClick={deleteProductHandler}>DELETE</button>
      </div>
    </div>
  );
};
