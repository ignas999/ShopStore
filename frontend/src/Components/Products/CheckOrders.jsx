import axios from 'axios'
import React, { useEffect, useState } from 'react'


function CheckOrders() {

    const [orders, setOrders]= useState([])
   

    useEffect(()=>{

        
            const fetchAllOrders = async ()=>{
                try{
                    const res = await axios.get("http://localhost:3000/getorders")
                    
                    setOrders(res.data)
                }
                catch(err){
                    console.log(err)
                }
            }
            fetchAllOrders()
            
            
    
       

    },[])

    const handleOrderChange = async (statusvalue, orderID) =>{

        console.log(statusvalue +"uuzsakymoID " +orderID)
        try{
            const result = await axios.put("http://localhost:3000/setorders",{statusvalue, orderID})
            
            
            console.log(result)
            if(statusvalue == 2){
                alert(`Uzsakymas ID: ${orderID} , busena atnaujinta i ATMESTA`)
            }
            else{
                alert(`Uzsakymas ID: ${orderID} , busena atnaujinta i PRIIMTA`)
            }
        }
        catch(err){
            console.log(err)
        }
        

    }
  return (
    <div>
        Uzsakymai
      
        {orders.map(order => ( 
            <div className='atskirasUzsakymas' key={order.uzsakymoID}>
                <h2>Uzsakymo ID: {order.uzsakymoID}</h2>
                <h3>Preke: {order.Pavadinimas}</h3>
                <h3>Kiekis: {order.Kiekis}</h3>
                <p>Vartotojas: {order.Username} || {order.Email} </p>
                <p>Laikotarpis: {order.Laikotarpis_MEN} Men</p>
                <p>Statusas: {order.Statusas} </p>
                <div>
                    <p>Pakeisti statusa:</p>
                    <button onClick={()=> handleOrderChange(2, order.uzsakymoID)}>Atmesta</button>
                    <button onClick={()=> handleOrderChange(3, order.uzsakymoID)}>Primta</button>
                </div>
                
                </div>
        ))}
                
            
    </div>
  )
}

export default CheckOrders