import React, { useState ,useEffect,useContext} from 'react'
import axios from 'axios'
import { ProduktuSarasasProvider } from './ProduktaiContext'
import ProduktaiContext from './ProduktaiContext'


export const ShopContextProvider = React.createContext()

function ShopContext(props) {
 
   const [products3, setProducts3] = useState([])

   const itemai = useContext(ProduktuSarasasProvider)

   // console.log("shopcontext")
   // console.log(itemai.length) 
   //  console.log("shopcontext")
   // console.log(itemai)
   //  console.log("---------")
   

   // useEffect(()=>{
   //     const fetchAllProducts = async ()=>{
   //         try{
   //             const res = await axios.get("http://localhost:3000/products")
   //             //console.log(res)
   //             setProducts3(res.data)
   //         }
   //         catch(err){
   //             console.log(err)
   //         }
   //     }
   //     fetchAllProducts()
       
      

   // },[])


 const getDefaultcart = ()=>{
    let cart ={}
    for (let i = 1; i< 20 + 1; i++){
        cart[i] = 0;
    }

   
    return cart
 }

 const getTotalAmount = () => {
   let totalAmount = 0
   for (const item in cartItems){
      if(cartItems[item] > 0){
         let iteminfo = itemai.find((product) => product.PrekesID === Number(item))
         totalAmount += cartItems[item] * iteminfo.Kaina
      }
   }
   return totalAmount
 }

 //console.log("----defaultcart")
//console.log(itemai)
 const [cartItems,setCartItems] = useState(getDefaultcart())

 
//  console.log("kartitems")
//  console.log(cartItems)


 const addToCart = ((itemID)=>{
    setCartItems((prev)=> ({...prev, [itemID]: prev[itemID] + 1 }) )

 })

 const removefromCart = ((itemID)=>{
    setCartItems((prev)=> ({...prev, [itemID]: prev[itemID] - 1 }) )
 })

//  console.log(cartItems)
 const contextValue = {cartItems, addToCart,removefromCart,getTotalAmount}
  return (
    <>
    <ShopContextProvider.Provider value={contextValue}>
    <div>{props.children}</div>
    </ShopContextProvider.Provider>
    </>
  )
}

export default ShopContext