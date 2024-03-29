import React ,{useContext}from "react";
import {Link,useNavigate} from 'react-router-dom';
import AuthContext from "../store/AuthContext";
export const NavbarAdmin = (props) => {
  const AuthCtx = useContext(AuthContext);
  const logoutHandler=()=>{
    AuthCtx.setIsLoggedIn(false);
    localStorage.clear();
  }
  return (
    <div className="navbarAdmin">
      
      <div className="logo">
        <Link to="/">
        <img
            src="data:image/png;base64,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"
            alt=""
            
        />
        </Link>
      </div>
      <Link to="/admin/products/add">   
      <div className="addProduct_nav">
          ADD
      </div>
      </Link>
      <Link to="/admin/products/list" >   
      <div className="addProduct_nav">
          PRODUCTS
      </div>
      </Link>
      <Link to="/">
      <div className="Logout" onClick={logoutHandler}>
        LOGOUT
      </div>
      </Link>
      {/* <Link to="/admin/products/add">   
      <button className="addProduct">
          ADD PRODUCT
      </button>
      </Link> */}
      </div>
  );
};

