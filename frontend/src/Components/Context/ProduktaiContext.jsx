import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

export const ProduktuSarasasProvider = createContext()



function ProduktaiContext(props) {

 
      const [products, setProducts] = useState([])

      useEffect(()=>{
          const fetchAllProducts = async ()=>{
              try{
                  const res = await axios.get("http://localhost:3000/products")
                  //console.log(res)
                  setProducts(res.data)
              }
              catch(err){
                  console.log(err)
              }
          }
          fetchAllProducts()
          
      },[])
  
      

  //const contextValue = {products}
  return (
    <>
    <ProduktuSarasasProvider.Provider value={products}>
    <div>{props.children}</div>
    </ProduktuSarasasProvider.Provider>
    </>
  )
}

export default ProduktaiContext