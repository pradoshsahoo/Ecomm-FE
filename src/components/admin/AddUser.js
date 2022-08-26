import React from 'react'
import { useContext, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../Navbar';

export const AddUser = () => {
    const [formInput,setFormInput] = useState({
        fullName:'',
        email:'',
        password:'',
        confirmPassword:''
    })


    const [err,setErr]=useState({
        isError:false,
        message:''
    })

    const FullNameHandler = (event) =>{
        setFormInput((prevState)=>
        {
            return{
            ...prevState,
            fullName:event.target.value
            }
        })
    }

    const EmailHandler = (event) =>{
        setFormInput((prevState)=>{
            return{
                ...prevState,
                email:event.target.value
            }
        })
    }
    const PasswordHandler = (event) =>{
        setFormInput((prevState)=>{
            return{
                ...prevState,
                password:event.target.value
            }
        })
    }
    const ConfirmPasswordHandler = (event) =>{
        setFormInput((prevState)=>{
            return{
                ...prevState,
                confirmPassword:event.target.value
            }
        })
    }
    const formSubmitHandler = async (event) =>{
        event.preventDefault();
        if(formInput.fullName == '')
        {
            setErr({
                isError:true,
                message:'Enter full name'

            })
        }
        else if(formInput.email == '')
        {
            setErr({
                isError:true,
                message:'Enter email'
            })
        }
        else if(formInput.password == '')
        {
            setErr({
                isError:true,
                message:'Enter password'
            })
        }
        else if(formInput.confirmPassword == '')
        {
            setErr({
                isError:true,
                message:'Confirm your password'
            })
        }
        else if(formInput.confirmPassword != formInput.password)
        {
            setErr({
                isError:true,
                message:'Passwords do not match'
            })
        }
        else{
            setErr({
                isError:true,
                message:'User added successfully'
            })
            console.log(formInput)
            await saveUserData(formInput);
        }
    }
    const saveUserData = async (FormData) =>{
        const product = {
            fullName:FormData.fullName,
            email:FormData.email,
            password:FormData.password
        }
        const message = await axios.post("http://localhost:4001/user/add",product,{
            headers:{
                'Content-Type':'application/json'
            }
        })
    }
  return (
    <div>
        <Navbar/>
    <div className="form-container">
        <h1>ADD USER</h1>
        <form onSubmit={formSubmitHandler}>
            {err.isError ? <div className='errorMessage'>{err.message}</div> : null}
            <div className="form-input2">
                <input type="text" placeholder='Full Name' onChange={FullNameHandler} />
            </div>
            <div className="form-input2">
                <input type="text" placeholder='Email' onChange={EmailHandler}/>
            </div>
            <div className='clearfix'></div>
            <div className="form-input2">
                <input type="password" placeholder='Password' onChange={PasswordHandler}/>
            </div>
            <div className="form-input2">
                <input type="password" placeholder='Confirm Password' onChange={ConfirmPasswordHandler}/>
            </div>
            <div className='clearfix'></div>
            <div className="form-input2">  
                <button className="addUser">ADD</button>         
            </div>
            <div className='clearfix'></div>
        </form>
        </div>
        </div>
  )
}
