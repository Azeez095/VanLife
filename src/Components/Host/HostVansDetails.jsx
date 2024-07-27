import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Link, NavLink, Outlet } from 'react-router-dom';

function HostVansDetails() {
    const { id } = useParams();
    const [van, setVan] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        api
            .get(`/Vans/${id}`)
            .then((res) => {
                if (isMounted) {
                    // Log the response to understand its structure
                    console.log('API Response:', res);
                    if (res.data && res.data.van) {
                        setVan(res.data.van);
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
    }, [id]); // Dependency array includes id to refetch when it changes

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
    <div className='host-van-detail-container'>
        <Link
                to=".."
                relative="path"
                className="back-button"
            >&larr; <span>Back to all vans</span>
        </Link>
        <div className='host-van-detail'>
            <img src={van.imageUrl} alt={van.name}
            className='host-van-image' />
            <div className='host-van-info'>
                <p>{van.type}</p>
                <h2>{van.name}</h2>
                <h4>${van.price} <small>/day</small></h4>

            </div>
        </div>
        <Outlet />
    </div>
  )
}

export default HostVansDetails