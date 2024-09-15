import React, { useEffect, useState } from 'react'
import './Register.css'
import logo from '../../assets/logotipas.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [email,setEmail] = useState("")

    //patvirtinita registracija langas
    const [registerStatus,setregisterStatus]= useState('')
    const [registerholder,setregisterholder]= useState('message')


    const navigateTo = useNavigate()

    const createUser = (event) =>{
      event.preventDefault()
      axios.post('http://localhost:3000/register', {
        //sukuriame kintamuosius kuriuos siusime i serveri
        Username: username,
        Password: password,
        Email: email
      }).then((response)=>{
        //console.log(response.data.message)
        console.log(response.data.showstyle)
        setregisterStatus(response.data.message)
        setregisterholder(response.data.showstyle)
      })

    }

    useEffect(()=>{
      const loggedUser= localStorage.getItem('user')
      if(loggedUser){
        navigateTo('/dashboard')
        console.log("Logged in")
      }
      
    },[])
    
    useEffect (()=>{
      if(registerStatus !== ''){
        
        setTimeout(()=>{
          setregisterholder('message') //hide message after 4s
          setregisterStatus('')
          if(registerStatus == "User inserted successfully"){
            console.log("true")
              navigateTo('/')
            }
        }, 4000)
        

      }

    },[registerStatus])
    

  return (
    <div className='body'>
        <img src={logo} alt="logo" />

        <div className='textdiv'>
        <h2>Uzsiregistruokite</h2>
        </div>

        <div className="loginForm">
          <form >
            <p className={registerholder}>{registerStatus}</p>
            <label htmlFor='username'>Vartotojos vardas</label>
            <input type="text" name="" id="username" 
            onChange={(event) =>{ setUsername(event.target.value) }} />
            <label htmlFor='userEmail'>el.pastas</label>
            <input type="email" name="" id="userEmail"
            onChange={(event) =>{ setEmail(event.target.value) }} />
            <label htmlFor='password'>slaptazodis</label>
            <input type="password" name="" id="password"
            onChange={(event) =>{ setPassword(event.target.value) }} />
            <button type='submit' onClick={createUser}>Registruotis</button>
          </form>
        </div>

        <div className='interface'>
        <Link to={'/'}>
        <button>Prisijungti</button>
        </Link>



        </div>



    </div>
  )
}

export default Register