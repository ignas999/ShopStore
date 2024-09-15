import React from 'react'
import '../Dashboard.css'
import ShowCategories from '../../Categories/ShowCategories'
import Orders from './Orders'


function LeftSide(props) {

  
  return (
    <div className='leftside'>
      
      <ShowCategories />

      <Orders />
      
      

    </div>
  )
}

export default LeftSide