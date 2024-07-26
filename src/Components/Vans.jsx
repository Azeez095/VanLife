import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import api from '../utils/api';

function Vans() {
    const [vans, setVans] = useState([]);
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
                        setVans(res.data.vans);
                    } else {
                        setVans([]);
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
    }, []); // Empty dependency array ensures this runs only once

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }
    

    return (
        <div className="van-list-container">
            <h3>Explore our Vans Option</h3>
            <div className='van-type-list'>
                <ul>
                    <li>Simple</li>
                    <li>Luxury</li>
                    <li>Rugged</li>
                    <a href="#">Clear Filter</a>
                </ul>
            </div>
            <ul className='van-list'>
                {vans.length > 0 ? (
                    vans.map((van) => (
                        <li key={van.id}>
                            <Link to={`/vans/${van.id}`} className="link-button
                            aria-label={`View details for ${van.name}, 
                             priced at $${van.price} per day`">
                            <img src={van.imageUrl} alt={van.name} width="200" />
                            <div className='van-info'>
                            <h4>{van.name}</h4>
                            <p>Price: ${van.price}</p>
                            </div>
                            <div className='van-type'>
                            <span >{van.type}</span>
                            </div>
                            </Link>
                        </li>
                    ))
                ) : (
                    <p>No vans available</p>
                )}
            </ul>
            
        </div>
    );
}

export default Vans;
