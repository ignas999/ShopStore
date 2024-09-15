import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../../App.css'
import ProduktaiContext, { ProduktuSarasasProvider } from '../Context/ProduktaiContext'


function Products3() {
    //const productktai = useContext(ProduktuSarasasProvider)
    const [products3, setProducts3] = useState([])

    const navigateto = useNavigate()
    

   
    useEffect(()=>{
        const fetchAllProducts = async ()=>{
            try{
                const res = await axios.get("http://localhost:3000/products")
                //console.log(res)
                setProducts3(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchAllProducts()
        
        

    },[])


    useEffect(()=>{
        const loggedUser= localStorage.getItem('user')
        
       const loggeduserobj = JSON.parse(loggedUser)
        console.log(loggeduserobj[0].userID)

        if(loggeduserobj[0].Username !== "admin" && loggeduserobj[0].Email !== "admin@gmail.com"){
            navigateto('/dashboard')
        }
        
      },[])

    const handleDelete = async (productID)=>{

        console.log(productID)
        try{
            await axios.delete(`http://localhost:3000/products/${productID}`)
            window.location.reload()
        }
        catch(err){
            console.log(err)
        }

    }

    console.log("visiproduktai")
    console.log(products3)
  return (
    <div>

        <h1>Tvarkyti uzsakymus</h1>
        <button><Link to='/checkorders'>Uzsakymu patvirtinimas</Link></button>
        <h1>visi produktai</h1>

        
            <button><Link to='/addproducts'>Prideti preke</Link></button>
            {products3.map((product)=>(
                
                <div key={product.PrekesID}>
                     <img src={`http://localhost:3000/assets/${product.Paveikslas}`} height={200}></img> 
                    <h1>{product.Pavadinimas}</h1>
                    <h2>{product.Kaina}</h2>
                    <button onClick={()=>{ handleDelete(product.PrekesID)}}>Delete</button>
                    <button><Link to={`/updateproduct/${product.PrekesID}`}>Update</Link></button>
                </div>
                
            ))}


        
    </div>
  )
}

export default Products3