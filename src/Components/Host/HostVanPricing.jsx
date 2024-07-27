import React from 'react'
import { useOutletContext } from 'react-router-dom'

function HostVanPricing() {
    const {van} = useOutletContext()
  return (
    <div>
         <h3 className="host-van-price">${van.price}<span>/day</span></h3>
    </div>
  )
}

export default HostVanPricing