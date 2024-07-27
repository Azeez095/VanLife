import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

function VanDetail() {
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
        <div className="van-detail-container">
            <div className="van-detail">
                <img src={van.imageUrl} alt={van.name} width={"100%"}/>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>
        </div>
    );
}

export default VanDetail;
