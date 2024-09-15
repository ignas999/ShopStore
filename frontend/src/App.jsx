import { useEffect, useState } from 'react'
import axios from "axios"

import './App.css'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import ShopContext from './Components/Context/ShopContext'
import Cart from './Components/Dashboard/Cart/Cart'

//importuojame react routeri 
import{
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import ProduktaiContext from './Components/Context/ProduktaiContext'
import Products3 from './Components/Products/Products3'
import AddProducts3 from './Components/Products/AddProducts3'
import UpdateProduct from './Components/Products/UpdateProduct'
import CheckOrders from './Components/Products/CheckOrders'

//create a route example

const router = createBrowserRouter([
  {
    path: '/',
    element: <><Login/></>
  }, 
  {
    path: '/register',
    element: <><Register/></>
  }, 
  {
    path: '/dashboard',
    element: <><Dashboard/></>
  }, 
  {
    path: '/cart',
    element: <><Cart/></>
  },
  {
    path: "/products",
    element: <><Products3 /></>
  },
  {
    path: "/addproducts",
    element: <><AddProducts3 /></>
  },
  {
    path: "/updateproduct/:id",
    element: <><UpdateProduct/></>
  },
  {
    path: "/checkorders",
    element: <> <CheckOrders /></>
  }

])
function App() {

  // const[users,setUsers]= useState([])

  // useEffect(()=>{
  
  //   axios.get("http://localhost:3000/users")
  //   .then(res => setUsers(res.data))
  //   .catch(err => console.log(err))
  // },[])

  return (
    <>
      {/* <ul>
      {users.map(user => (<li key={user.userID}>{user.Username}</li>))}
      </ul> */}
       <ProduktaiContext>
      <ShopContext>
     
      <RouterProvider router={router}/>
      
      
      </ShopContext>
      </ProduktaiContext>
    </>
  )
}

export default App
