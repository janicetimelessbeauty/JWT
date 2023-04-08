import React, {Fragment, useState} from 'react'
import {Link} from "react-router-dom"
 const Register = ({setAuth}) => {
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const changeUser = (e) => {
          setUser({...user, [e.target.name]: e.target.value})
          console.log(user)
    }
    const submit = async (e) => {
        e.preventDefault()
        console.log(user)
        try {
          const response = await fetch("http://localhost:4000/auth/register", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
          })
          const parseRes = await response.json()
          console.log(parseRes)
          localStorage.setItem("token", parseRes.token)
          setAuth(true)
        }
        catch(err) {
             
        }
    }
  return (
    <Fragment>
        <h1 className="mt-5 text-left ml-5">Register</h1>
      <form onSubmit = {submit}>
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
        <input
          type="text"
          name="username"
          placeholder="name"
          onChange = {(e) => changeUser(e)} 
          className="form-control my-3 w-50 ml-5"
        />
        <button className="btn btn-success btn-block w-25 ml-5" onClick = {(e) => submit(e)}>Submit</button>
      </form>
      <Link to = "/login">Login</Link>
    </Fragment>
  )
}

export default Register