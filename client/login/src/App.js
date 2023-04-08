import logo from './logo.svg';
import './App.css';
import {Fragment, useState, useEffect} from "react"
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
function App() {
  const [authenticated, setauthenticate] = useState(false)
  const setAuth = (boolean) => {
       setauthenticate(boolean)
  }
  const checkAuth = async () => {
    try {
       const response = await fetch("http://localhost:4000/auth/is-verify", {
         method: 'GET',
         headers: {token: localStorage.getItem("token")}
       })
       const parseRes = await response.json()
       parseRes == true ? setauthenticate(true) : setauthenticate(false)
    }
    catch(err) {
      console.error(err.message)
    }
  }
  useEffect(() => {
    checkAuth()
  })
  return (
    <div className="App">
      <Fragment>
       <BrowserRouter>
        <Routes>
          <Route path = "/" element = { authenticated ? <Dashboard setAuth = {setAuth}/> : <Navigate to = "/login"/>}/>
          <Route path = "/login" element = {!authenticated ? <Login setAuth = {setAuth}/> : <Navigate to = "/"/>}/>
          <Route path = "/register" element = {!authenticated ? <Register setAuth = {setAuth}/> : <Navigate to ="/login"/>}/>
        </Routes>
       </BrowserRouter>
      </Fragment>
    </div>
  );
}

export default App;
