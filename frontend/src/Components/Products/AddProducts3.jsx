import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import axios from 'axios'


function AddProducts3() {

    const [product,setProduct] = useState([
        {
            ProduktoID: null,
            Pavadinimas: "",
            Kaina: null,
            KategorijaID: '',
        
        }
    ])

    const navigateto = useNavigate()
    const handlechange= (event)=>{
        setProduct(prev => ({...prev,[event.target.name]: event.target.value }))
    }


    const [imageFile,setImageFile]= useState()

    // useEffect(()=>{
    //     axios.get("http://localhost:3000/image")
    //     .then(result => console.log(result))
    //     .catch(err=> console.log(err))
    // },[])

    // const handleUploadImage =  (event)=> {
    //     event.preventDefault()
    //     const formdata = new FormData()
    //     formdata.append('image',imageFile)
           
    //        axios.post("http://localhost:3000/image", formdata)
    //        .then(result=> console.log(result))
    //        .catch(err=> console.log(err))

    // }
    const handleSubmit = async (event)=>{
        event.preventDefault()
        console.log("pries issiuntima")
        console.log(product)
        try{
            await axios.post("http://localhost:3000/products", product)
            navigateto('/products')
        }
        catch(err){
                console.log(err)
        }
    }
    console.log(product)

//----------------------------
//----------------------------

const handlechange1= (event)=>{
    setProduct(prev => ({...prev,[event.target.name]: event.target.value }))
}

const handleImage = (event)=>{
        
    setImageFile(event.target.files[0])

   
 }

 const handleUploadImage =  (event)=> {
    event.preventDefault()
    const formdata = new FormData()
   
    formdata.append('image',imageFile)
    formdata.append('Pavadinimas', product.Pavadinimas)
    formdata.append('Kaina', product.Kaina)
    formdata.append('KategorijaID', product.KategorijaID)
       


    
       axios.post("http://localhost:3000/products", formdata)
       .then(result=> {console.log(result); alert("Preke prideta i sarasa") })
       .catch(err=> console.log(err))

}


//-----------------------------
//----------------------------


useEffect(()=>{
    const loggedUser= localStorage.getItem('user')
    
   const loggeduserobj = JSON.parse(loggedUser)
    console.log(loggeduserobj[0].userID)

    if(loggeduserobj[0].Username !== "admin" && loggeduserobj[0].Email !== "admin@gmail.com"){
        navigateto('/dashboard')
    }
    
  },[])
  
  const category =(event)=>{
    console.log(event.target.value)
    console.log(event.target.name)
  }
  return (
    <div>
        <form className="Button">

        <h1>Pridekite preke</h1>
        <input type="text" placeholder='pavadinimas' onChange={handlechange1} name='Pavadinimas' />
        <input type="number" placeholder='kaina'  onChange={handlechange1} name= "Kaina" />
        {/* <input type="text" placeholder='kategorija'  onChange={handlechange1} name='KategorijaID' /> */}
        <select name="KategorijaID" onChange={handlechange1} placeholder='kategorija'> 
        <option disabled selected hidden>Kategorija</option>
        <option value={1}>Monitoriai</option> 
        <option value={2}>Kompiuteriai</option> 
        <option value={3}>Projektoriai</option> 
        <option value={4}>Kedes</option> 
        <option value={5}>Spausdintuvai</option> 
        </select>
        <input type='file' onChange={handleImage} name="Paveikslas"></input>
        <button type="submit" onClick={handleUploadImage}>add new Product</button>
        </form>

        <form>
        {/* <input type='file' onChange={handleImage}></input>
        <button onClick={handleUploadImage}>Upload</button> */}
        </form>
    </div>
  )
}

export default AddProducts3