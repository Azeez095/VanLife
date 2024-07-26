import React, { useState, useEffect } from 'react'
import api from '../../utils/api'

function HostVans() {
    const [van, setVan] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        api
            .get('/Vans')
            .then((res) => {
                if (isMounted) {
                    // Log the response to understand its structure
                    console.log('API Response:', res);
                    if (res.data && res.data.vans) {
                        setVan(res.data.vans);
                    } else {
                        setVan(null);
                        setError("Unexpected response format");
                    }
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            });
            

        return () => {
            isMounted = false;
        };
    }, []); 

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>Error: {error}</h2>;
    }

    if (!van) {
        return <h2>No van details available</h2>;
    }
    

  return (
    <div className="host-vans-container">
        <h1>Your listed Van</h1>
        <div>
            {van.map((v) => (
                <div key={v.id} className="host-van">
                    <img src={v.imageUrl} alt="" className='host-img'/>
                    <div className="host-van-details">
                        <h3>{v.name}</h3>
                        <p>${v.price}/day</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default HostVans