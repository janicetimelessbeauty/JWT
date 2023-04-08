import React, {Fragment, useState} from 'react'
import {Link} from "react-router-dom"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
const Login = ({setAuth}) => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  })
  const ToastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  }
  const changeUser = (e) => {
    setUserLogin({...userLogin, [e.target.name]: e.target.value})
    console.log(userLogin)
  }
  const onSubmitForm = async (e) => {
    e.preventDefault()
    try {
       const response = await fetch("http://localhost:4000/auth/login", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userLogin)
       })
       const parseRes = await response.json()
       console.log(parseRes.token)
       if (parseRes.token) {
       localStorage.setItem("token", parseRes.token)
       toast.success("Login successfully", ToastOptions)
       setAuth(true)
       }
       else {
        toast.error(parseRes, ToastOptions)
        setAuth(false)
       }
    }
    catch(err) {
      console.error(err.message)
    }
  }
  return (
   <Fragment>
    <h1 className="mt-5 text-left ml-5">Login</h1>
      <form onSubmit = {onSubmitForm}>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange = {(e) => changeUser(e)} 
          className="form-control my-3 w-50 ml-5"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange = {(e) => changeUser(e)} 
          className="form-control my-3 w-50 ml-5"
        />
         <button className="btn btn-success btn-block w-25 ml-5">Submit</button>
      </form>
      <Link to = "/register">Register</Link>
      <ToastContainer/>
   </Fragment>
  )
}

export default Login