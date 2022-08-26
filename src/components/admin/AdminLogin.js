import React,{useState,useContext, useEffect} from 'react';
import axios from 'axios';
import AuthContext from '../../store/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../Navbar';
export const AdminLogin = () => {
    const AuthCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const [err,setErr] = useState('');
    const [user,setUser] = useState({
        email:'',
        password:''
    })
    const EmailHandler = (event) =>{
        setUser((prevState)=>
        {
            return{
            ...prevState,
            email:event.target.value
            }
        })
    }

    const PasswordHandler = (event) =>{
        setUser((prevState)=>{
            return{
                ...prevState,
                password:event.target.value
            }
        })
    }
    const loginHandler = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:4001/user/login',user,{
            headers:
            {
                'Content-type':'application/json'
            }
        }).then((response)=>{
            // window.location.reload(false);
            localStorage.setItem('user',response.data.user);
            localStorage.setItem('token',response.data.token);
            AuthCtx.setIsLoggedIn(true);
            navigate('/admin/products/list');
        })
        .catch(error=>{
            console.log(error);
            setErr(error.response.data.message)
        })
    }

    return (
        <div>
            <Navbar/>
            <h1>LOGIN</h1>
            <form onSubmit={loginHandler}>
                {err!=''? <div className='errorMessage'>{err}</div> : null}
                <div className="form-input1">
                    <input type="email" placeholder='Email' onChange={EmailHandler} />
                </div>
                <div className="form-input1">
                    <input type="password" placeholder='Password' onChange={PasswordHandler}/>
                </div>
                <div className="form-input1">  
                    <button className="login" type='submit' >LOGIN</button>         
                </div>
                <div className='clearfix'></div>
            </form>
            <div className='register'>
                Not registerd?  <Link to="/admin/register"> <span className='sregister'>Register here</span> </Link>
            </div>
        </div>
    )
}
