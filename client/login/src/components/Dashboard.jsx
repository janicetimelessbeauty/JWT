import React, {Fragment, useEffect, useState} from 'react'

const Dashboard = ({setAuth}) => {
  const [name, setName] = useState("")
  const getProfile = async () => {
     try {
       const response = await fetch("http://localhost:4000/dashboard", {
        method: 'GET',
        headers: {token: localStorage.getItem("token")}
       })
       const parseUsername = await response.json()
       setName(parseUsername.username)
       console.log(name)
     }
     catch(err) {
      console.error(err.message)
     }
  }
  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("token")
    setAuth(false)
  }
  useEffect(() => {
    getProfile()
  }, [])
  return (
    <Fragment>
        <h1>Dashboard {name}</h1>
        <button className = "btn btn-danger" onClick = {(e) => logout(e)}>Log out</button>
    </Fragment>
  )
}

export default Dashboard