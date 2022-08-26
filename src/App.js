import React,{useContext} from "react";
import "./components/product.css";
import "./components/product-form/product-form.css";
import ProductForm from "./components/product-form/ProductForm";
import { CartList } from "./components/cart/CartList";
import "./components/cart/cart.css";
import "./components/Navbar.css";
import "./components/admin/AdminProductList.css";
import "./components/admin/AdminLogin.css";
import { ProductList } from "./components/ProductList";
import { ProductState } from "./store/ProductState";
import {Routes,Route} from 'react-router-dom';
import {AdminProductList} from "./components/admin/AdminProductList";
import { AdminLogin } from "./components/admin/AdminLogin";
import { AddUser } from "./components/admin/AddUser";
import { AuthState } from "./store/AuthState";
import { ProtectRoute } from "./components/admin/ProtectRoute";
import { EditState } from "./store/EditState";
import EditForm from "./components/product-form/EditForm";
function App() {
  return (
    <div className="App">
      <ProductState>
      <AuthState>
        <EditState>
        <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/cart" element={<CartList/>}/>
        <Route path="/admin/register" element={<AddUser/>}/>
        <Route path="/admin/login" element={<AdminLogin/>}/>
        <Route element = {<ProtectRoute/>}>
        <Route path="/admin/products/list" element={<AdminProductList/>}/>
        <Route path="/admin/products/add" element={<ProductForm/>}/>
        <Route path="/admin/products/edit/:id" element={<EditForm/>}/>
        </Route>
        </Routes>
        </EditState>
        </AuthState>
      </ProductState>
    </div>
  );
}

export default App;
