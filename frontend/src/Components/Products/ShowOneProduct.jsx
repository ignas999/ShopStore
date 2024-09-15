import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../App.css'

function ShowOneProduct(props) {

    const [singleItem,setSingleItem] = useState([])

    const id = props.data

   

    useEffect(()=>{

        const fetchByID = async () => {
            try{
                const res = await axios.get(`http://localhost:3000/products/${id}`)
              //  console.log("gaunamaviena")
               // console.log(res.data[0])
                setSingleItem(res.data)

            }
            catch(err){
                console.log(err)
            }
        }
        fetchByID()
        //console.log("gaunamaviena")
        //console.log(singleItem.Pavadinimas)
    },[])
  return (
    <div>

         <p>Redaguojamas produktas: </p>
         {singleItem.map((product)=>(
                
                <div key={id}>
                    <h2>Preke kuria taisote </h2>
                    <p>Prekes Pavadinimas: {product.Pavadinimas}</p>
                    <p>Prekes Kaina: {product.Kaina}</p>
                    <p>Kategorija (ID: {product.KategorijaID}) {product.Kategorija}</p>
                  
                </div>
                
            ))}
         

    </div>
  )
}

export default ShowOneProduct