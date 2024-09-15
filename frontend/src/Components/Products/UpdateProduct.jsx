import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import ShowOneProduct from './ShowOneProduct'
import '../../App.css'

function UpdateProduct() {
    const [product,setProduct] = useState([
        {
            
            Pavadinimas: "",
            Kaina: null,
            KategorjaID: null
        }
    ])


    const navigateto = useNavigate()

    const getURLlocation = useLocation()
    // url istraukiame id
    //console.log(getURLlocation.pathname.split('/')[2])

    const produktoID = getURLlocation.pathname.split('/')[2]


    const handlechange= (event)=>{
        setProduct(prev => ({...prev,[event.target.name]: event.target.value }))
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        try{
            await axios.put(`http://localhost:3000/products/${produktoID}`, product)
            navigateto('/products')
        }
        catch(err){
                console.log(err)
        }
    }
    console.log(product)
  return (
    <div>
        <ShowOneProduct data={produktoID} />
        <form className="Button">

        <h1>Atnaujinti preke</h1>
        <input type="text" placeholder='pavadinimas' onChange={handlechange} name='Pavadinimas' />
        <input type="number" placeholder='kaina'  onChange={handlechange} name= "Kaina" />
        <input type="text" placeholder='kategorija'  onChange={handlechange} name='KategorijaID' />
        <button type="submit" onClick={handleSubmit}>Atnaujinti</button>
        </form>


    </div>
  )
}

export default UpdateProduct