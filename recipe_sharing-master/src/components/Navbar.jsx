import React, { useState } from 'react'
import Modal from './Modal'
import InputForm from './InputForm'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    let token = localStorage.getItem("token")
    const [isLogin, setIsLogin] = useState(token ? false : true)

    const checkLogin = () =>{
      if(token){
        localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
      }
      else{
        setIsOpen(true)
      }  
    }
  return (
    <>
        <header>
            <h2>Recipe Blog</h2>
            <ul>
                <li> <NavLink to='/'>Home</NavLink></li>
                <li onClick={()=>isLogin && setIsOpen(true)}> <NavLink to={!isLogin ? '/myRecipe' : "/"}>MyRecipe</NavLink></li>
                <li onClick={()=>isLogin && setIsOpen(true)}> <NavLink to={!isLogin ?  '/favRecipe' : "/"}>Favorites</NavLink></li>
                <li onClick={checkLogin}>{(isLogin) ? "Login" : "Logout"} </li>
            </ul>
        </header>
        {(isOpen) && <Modal onClose = {() => setIsOpen(false)}><InputForm/></Modal>}
    </>
  )
}