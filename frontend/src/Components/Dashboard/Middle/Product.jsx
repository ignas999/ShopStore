import React, { useContext } from 'react'
import { ShopContextProvider } from '../../Context/ShopContext'




function Product(item) {
   const {addToCart,cartItems} = useContext(ShopContextProvider)

    const {
        PrekesID,
        Pavadinimas,
        Kaina,
        KategorijaID,
        Paveikslas
        } = item.data
    
       // console.log(item.data)


  const cartItemAmount = cartItems[PrekesID]

  // console.log("cartotemai")
  // console.log(cartItemAmount)
  return (
    <div className='product'>
        <img src={`http://localhost:3000/assets/${Paveikslas}`} style={{height:200}} ></img> 
        <h1>{Pavadinimas}</h1>
        <p>{Kaina} Eur</p>
        {/* <button onClick={()=> addToCart(PrekesID)}>Prideti {cartItemAmount}</button> */}
        <button onClick={()=> addToCart(PrekesID)}>Prideti {cartItemAmount >0 && <>({cartItemAmount})</>}</button>
    </div>
  )
}

export default Product