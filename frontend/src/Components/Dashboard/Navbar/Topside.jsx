import React from 'react'
import { Link } from 'react-router-dom'
import '../Dashboard.css'
import logo from "../../../assets/userlogo.png"



function Topside() {

    const user = localStorage.getItem('user')
   const usernames= JSON.parse(user)

const logout = () =>{
    localStorage.removeItem('user')
}

const dispUserName = (()=>{
    
})


  return (
    <div className='topside'>
       {(usernames[0].Username == "admin" && usernames[0].Email == "admin@gmail.com") ? <Link to='/products'>Adminopanele</Link> : <></> }
      
    <div>
    <Link to="/cart">Perziureti uzsakyma</Link>
    <img src={logo} style={{height: 40}}/>
    <p>{usernames[0].Username} </p>
    <Link to={'/'} onClick={logout}>Atsijungti</Link>
    </div>
    </div>
  )
}

export default Topside