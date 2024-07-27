import React from 'react'
import { useOutletContext } from 'react-router-dom'

function HostVanPhotos() {
    const {van} = useOutletContext()
  return (
    <div>
        <img src={van.imageUrl} className="host-van-detail-image" />
    </div>
  )
}

export default HostVanPhotos