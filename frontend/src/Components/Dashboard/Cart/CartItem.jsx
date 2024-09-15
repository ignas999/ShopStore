import { useContext } from 'react'
import React from 'react'
import { ShopContextProvider } from '../../Context/ShopContext'


function CartItem(props) {


    //console.log(props.data)
    const {
        PrekesID,
        Pavadinimas,
        Kaina,
        KategorijaID,
        Paveikslas
      } = props.data

       // console.log(Pavadinimas)

    
  const {cartItems,addToCart,removefromCart} = useContext(ShopContextProvider)
  //console.log(cartItems)

  
  if(cartItems[PrekesID] >0){
  return (
    
    <div>
        {/* <img src={product_image} style={{height: 200}}/> */}
        
        <div className='description'>
        <img src={`http://localhost:3000/assets/${Paveikslas}`} style={{height: 200}}></img>
            <p>{Pavadinimas}</p>
            <p>{Kaina * cartItems[PrekesID]}</p>
        </div>
        <div className='amount'>
            <button onClick={()=> addToCart(PrekesID)}>+</button>
            <input value={cartItems[PrekesID]}/>
            <button onClick={()=> removefromCart(PrekesID)}>-</button>
        </div>

    </div>
  )
  }
  else{
    return <></>
  }
}

export default CartItem