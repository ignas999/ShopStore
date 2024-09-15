import axios from 'axios'
import React, { useEffect, useState } from 'react'
import success from '../../../assets/allowed.png'
import waiting from '../../../assets/waiting.png'
import denied from '../../../assets/denied.png'

function Orders() {

    const [Orders,setOrders] = useState([])


    useEffect(()=>{

        const user = localStorage.getItem('user')
        const usernames= JSON.parse(user)
        console.log(usernames[0].userID)

        const fetchOrders= async ()=>{
            try{

                const res = await axios.get(`http://localhost:3000/orders/${usernames[0].userID}`)
                //console.log("gaunami uzsakymai")
                console.log(res.data)
                //console.log(res)
                setOrders(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchOrders()
    },[])

    const orderStatusImage = (status) => {
        if (status == 3){
            return success
        }
        if (status == 2){
            return denied
        }
            return waiting
        
    }
    console.log("first")
    console.log(Orders)
  return (

    <div>
        <h1> Uzsakymai:</h1>
        {Orders.length == '' ? <p> Uzsakymu istorijos neturite</p> :
        
        Orders.map(order => ( 
            <div className='atskirasUzsakymas' key={order.uzsakymoID}>
                <h2>Uzsakymo ID: {order.uzsakymoID}</h2>
                <h3>Preke: {order.Pavadinimas} , {order.Kiekis} vnt</h3>
                <p>Laikotarpis: {order.Laikotarpis_MEN} Men</p>
                <p>Statusas: <img src={orderStatusImage(order.Statusas)} style={{width: 50}}  /> </p>
                </div>
        ))
        }
        
        
        
    </div>
  )
}

export default Orders