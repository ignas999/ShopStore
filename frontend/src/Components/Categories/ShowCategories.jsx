import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { CategorycontextProvide } from '../Dashboard/Dashboard'






function ShowCategories() {

    const {showCategory, setCategory}= useContext(CategorycontextProvide)
    const [categories,setCategories]= useState([])
    

    useEffect(()=>{

        const fetchCategories = async ()=>{
            try{
                const res = await axios.get("http://localhost:3000/categories")
                //console.log(res)
                setCategories(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchCategories()
    },[])

    const handleviews =(event) =>{
        //props.setcategory(event.target.value)
        setCategory(event.target.value)
        console.log("--------")
        console.log(showCategory)
    }

  return (
    <div>
        <div className="kategorijos">
            <h1>Kategorijos</h1>
        {categories.map((category) => (
            <div key={category.KategorijaID} className='buttoncategory'>
                <button value={category.KategorijaID} onClick={handleviews}>{category.Pavadinimas}</button>

            </div>
        ))}
        </div>

    </div>
  )
}

export default ShowCategories