import React, { useContext, useState } from 'react'

import { ShopContextProvider } from '../../Context/ShopContext'
import CartItem from './CartItem'
import { useNavigate } from 'react-router-dom'
import { ProduktuSarasasProvider } from '../../Context/ProduktaiContext'
import axios from 'axios'
import './Cart.css'
import Topside from '../Navbar/Topside'


function Cart() {

  const {cartItems, getTotalAmount} = useContext(ShopContextProvider)
  const [rentmonths, setRentmonths] = useState('')

  const user = localStorage.getItem('user')
  const usernames= JSON.parse(user)
  const currentuser = usernames[0].userID

  const itemai = useContext(ProduktuSarasasProvider)
  const totalAmount = getTotalAmount()
  const navigateTo = useNavigate()

  const setmonths = (event)=>{
    if(event.target.value > 0 ){
      setRentmonths(event.target.value)}
      else{
      setRentmonths(0)
    }

      console.log(event.target.value)
  }

  const uploadOrder = async (itemID, itemCount ,userID)=>{
    try{
      const res = await axios.post("http://localhost:3000/makeorder",{itemID, itemCount ,userID, rentmonths})
      alert("Uzsakymas Sukurtas , laukite administratoriaus patvirtinimo , susisieksime elektroniniu pastu")
      navigateTo('/dashboard')
    }
    catch(err){
      console.log(err)
    }
  }


  const placeorder =() => {
    
  console.log(cartItems)
      itemai.map((item)=>{
        if(cartItems[item.PrekesID] > 0){
          console.log("preke kurios id "+item.PrekesID + " turi " + cartItems[item.PrekesID])

          uploadOrder(item.PrekesID ,cartItems[item.PrekesID],currentuser)

        }
        //console.log(item)
  })
  }

 // console.log(cartItems)
  if(totalAmount >0){
    return (
      <><Topside/>
      <div className='cart'>
     <div className='order'>
      <h1>Uzsakymo Sarasas</h1>
      
      <div className='cartItem'>
        {itemai.map((item)=> {
          if(cartItems[item.id] !== 0){
            //setcartforOrders((prev)=>({ ...prev , [item.id] : cartItems[item.id]}))
            //console.log('itemid' +item.id+ 'o kiekis yra' +cartItems[item.id])
            return <CartItem data = {item} key={item.id} amount={cartItems[item.id]}></CartItem>
          }
        } )}
        </div>
      </div>
        <div className='checkout'>
          <h2>Uzsakymo Informacija</h2>
          <p>Is viso moketi: {totalAmount} Eur</p>
          <button onClick={()=> navigateTo('/dashboard')}>Testi Apsipirkima</button>
          <br></br>
          <div className='uzbaigticheck'>
          <h3>Jeigu norite uzbaigti pirkima teskite:</h3>

          <p>Iveskite nuomos laikotarpi:</p>
          <input type="number" value={rentmonths} onChange={(event)=>setmonths(event)} placeholder='Laikotarpis MEN'/>
          <button onClick={placeorder} >Pateikti uzsakyma/Pirkti</button>
          </div>
        </div>
      </div>
      </>
    )
}
else{
  return (
    <>
    <h1>Krepselis tuscias!</h1>
    <button onClick={()=> navigateTo('/dashboard')}>Gryzti</button>
    </>
  )
}
}

export default Cart