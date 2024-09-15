import React, { createContext, useEffect, useState } from 'react'
import './Dashboard.css'
import { useNavigate } from 'react-router-dom'
import LeftSide from './LeftSide/LeftSide'
import Middle from './Middle/Middle'
import Topside from './Navbar/Topside'
import Cart from './Cart/Cart'



export const CategorycontextProvide = createContext()


function Dashboard() {

  const navigateTo = useNavigate()

  useEffect(()=>{
    const loggedUser= localStorage.getItem('user')
    if(loggedUser){
      navigateTo('/dashboard')
      console.log("Logged in")
    }
    
  },[])

  const [showCategory,setCategory]= useState('')

  return (
    <>
      <CategorycontextProvide.Provider value={{showCategory, setCategory}}>
        <Topside />
    <div className='main'>
        <LeftSide setCategoryfromclick={setCategory}/>
    {/* {console.log(showCategory)} */}
        <Middle showByCategory={showCategory}/>
        
    </div>
    </CategorycontextProvide.Provider>
    </>
  )
}

export default Dashboard