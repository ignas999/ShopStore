import React, { useContext, useEffect, useState } from 'react'
import '../Dashboard.css'

import axios from 'axios'
import Product from './Product'
import { ProduktuSarasasProvider } from '../../Context/ProduktaiContext'
import { CategorycontextProvide } from '../Dashboard'





function Middle(props) {

  //importuojame musu sarasiuka daiktu
 const itemai = useContext(ProduktuSarasasProvider)

 //const categorytoShow = props.showByCategory

 const {showCategory} = useContext(CategorycontextProvide)

  



  const [products1, setProducts] = useState([])

  
    

   
  useEffect(()=>{

    if(showCategory !== ""){
      const fetchAllProducts = async ()=>{
          try{
            
             // const res = await axios.get("http://localhost:3000/products")
              const res = await axios.get(`http://localhost:3000/productscategory/${showCategory}`)
              //console.log(res)
              setProducts(res.data)
          }
          catch(err){
              console.log(err)
          }
      }
      fetchAllProducts()
    }
    else{
      const fetchAllProducts = async ()=>{
        try{
          
           const res = await axios.get("http://localhost:3000/products")
            //const res = await axios.get(`http://localhost:3000/productscategory/${categorytoShow}`)
            //console.log(res)
            setProducts(res.data)
        }
        catch(err){
            console.log(err)
        }
    }
    fetchAllProducts()
    }
      


  },[showCategory])


 

  return (
    <div className='middle'>
            <h2>Esantys Produktai</h2>
        <div className='products'>


         {products1.length > 0 ? (
          products1.map((item) => <Product data={item} key={item.PrekesID} />)
          ) : (
         <p>nera</p>
        )}

        
    
    </div>
        </div>

   
  )
}

export default Middle