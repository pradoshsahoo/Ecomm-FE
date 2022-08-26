import { useContext, useState } from "react";
import axios from "axios";
import React from "react";
import EditContext from "../../store/EditContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { NavbarAdmin } from "../NavbarAdmin";
const EditForm = (props) => {
  //   const navigate = useNavigate();
  const EditCtx = useContext(EditContext);
  const params = useParams();
  const id = params?.id;
  const { name, price, image, desc } = EditCtx.edit;
  const [formInput, setFormInput] = useState({
    productName: name,
    productPrice: price,
    productImage: image,
    productDesc: desc,
  });

  const [err, setErr] = useState({
    isError: false,
    message: "",
  });

  const productNameHandler = (event) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        productName: event.target.value,
      };
    });
  };

  const productPriceHandler = (event) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        productPrice: "$" + event.target.value,
      };
    });
  };
  const productImageHandler = (event) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        productImage: event.target.value,
      };
    });
  };
  const productDescHandler = (event) => {
    setFormInput((prevState) => {
      return {
        ...prevState,
        productDesc: event.target.value,
      };
    });
  };
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (formInput.productName == "") {
      setErr({
        isError: true,
        message: "Enter product name",
      });
    } else if (formInput.productPrice == "") {
      setErr({
        isError: true,
        message: "Enter product price",
      });
    } else if (formInput.productImage == "") {
      setErr({
        isError: true,
        message: "Enter product image",
      });
    } else if (formInput.productDesc == "") {
      setErr({
        isError: true,
        message: "Enter product desc",
      });
    } else {
      setErr({
        isError: true,
        message: "Product edited successfully",
      });
      await editProductData(formInput);
    }
  };
  const editProductData = async (FormData) => {
    const product = {
      productName: FormData.productName,
      productPrice: FormData.productPrice,
      productImage: FormData.productImage,
      productDesc: FormData.productDesc,
    };
    const URL = "http://localhost:4001/product/" + id;
    const message = await axios.put(URL, product, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    // navigate(-1);
  };
  return (
    <div>
      <NavbarAdmin />
      <div className="form-container">
        <form onSubmit={formSubmitHandler}>
          {err.isError ? (
            <div className="errorMessage">{err.message}</div>
          ) : null}
          <div className="form-input3">
            <input
              type="text"
              placeholder="Product Name"
              defaultValue={name}
              onChange={productNameHandler}
            />
          </div>
          <div className="form-input3">
            <input
              type="text"
              placeholder="Product Price"
              defaultValue={price.substring(1)}
              onChange={productPriceHandler}
            />
          </div>
          <div className="form-input3">
            <input
              type="text"
              placeholder="Product Image"
              defaultValue={image}
              onChange={productImageHandler}
            />
          </div>
          <div className="form-input3">
            <input
              type="text"
              placeholder="Product description"
              defaultValue={desc}
              onChange={productDescHandler}
            />
          </div>
          <div className="form-input3">
            <button className="add_product">EDIT</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
