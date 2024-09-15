import React, { useEffect } from 'react'
import './Login.css'
import logo from '../../assets/logotipas.png'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Login() {

  const [loginUsername,setLoginUsername] = useState('')
  const [loginPassword,setLoginPassword] = useState('')
  const [autologin , setautologin ] = useState()

  //nukreipimas jeigu blogai prisijungs
  const navigateTo = useNavigate()

  //zinute kad blogas prisijungimas
  const [loginStatus,setloginStatus]= useState('')
  const [loginholder,setloginholder]= useState('message')


  const submitLogin = (event)=>{
    event.preventDefault()
    axios.post('http://localhost:3000/login', {
      //sukuriame kintamuosius kuriuos siusime i serveri
      Username: loginUsername,
      Password: loginPassword
    }).then((response)=>{
      console.log(response.data)

      if(response.data.message  || response.data.error ){
        navigateTo("/")
        setloginStatus(response.data.message)
      }
      else{
        navigateTo("/dashboard")
        //setautologin(response.data)
        localStorage.setItem("user", JSON.stringify(response.data))
      }
    })
  }
  useEffect(()=>{
    const loggedUser= localStorage.getItem('user')
    if(loggedUser){
      navigateTo('/dashboard')
      console.log("Logged in")
    }
    
  },[])

    useEffect(()=>{
      if(loginStatus !== ''){
        //showmessage yra stilius
        setloginholder('showMessage') //show message
        setTimeout(()=>{
          setloginholder('message') //hide message after 4s
          setloginStatus('')
        }, 4000)
      }
    },[loginStatus])

    const clearLoginform = ()=>{
      //onsubmit formoje galime ideti ir isvalyt logina
      setLoginUsername('')
      setLoginPassword('')
    }
  return (
    <div className='body'>
        <img src={logo} alt="logo" />

        <div className='textdiv'>
        <h2>Irangos Nuomos Svetaine</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, doloremque labore eveniet quidem rerum possimus, laboriosam quam adipisci quos quis molestias voluptates temporibus quibusdam iusto! Voluptatem debitis impedit similique deleniti.</p>
        <p className={loginholder}>{loginStatus}</p>
        </div>

        <div className="loginForm" onSubmit={clearLoginform}>
          <form>
            <label htmlFor='username'>Vartotojos vardas</label>
            <input type="text" name="" id="username" 
              onChange={(event)=>{setLoginUsername(event.target.value)}} />
            <label htmlFor='password'>slaptazodis</label>
            <input type="password" name="" id="password" 
              onChange={(event)=>{setLoginPassword(event.target.value)}}/>
            <button type= "submit" onClick={submitLogin}>Prisijungti</button>
          </form>
        </div>

        <div className='interface'>
      

        <p>Neturite paskyros?</p>
        <Link to={'/register'}>
        <button>Uzsiregistruoti</button>
        </Link>
        </div>



    </div>
  )
}

export default Login