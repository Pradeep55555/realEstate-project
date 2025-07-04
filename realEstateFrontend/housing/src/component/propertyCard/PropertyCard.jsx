import React, { useEffect, useState } from 'react';

import PropertyModal from './PropertyModal';
import './propertyCard.css';

import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextApi/ContextApi';

function PropertyCard() {
    const [allProperty, setAllProperty] = useState([]);
    const [viewDetails, setViewDetails] = useState([false, null]);
    const [purchase, setPurchase] = useState(false);

    const { buyerInfo } = useAuth();  // buyerInfo = { mobile: '9302840287' }
    const navigate = useNavigate();

    // *************    get all property details     *******************

    async function getPropertyDetails() {
        try {
            const response = await fetch('http://localhost:4000/api/sellers/all/property/details');
            const finalResult = await response.json();
            setAllProperty(finalResult);
            // console.log('Fetched Data:', finalResult);
        } catch (error) {
            console.error('Failed to fetch property details:', error);
        }
    }

    useEffect(() => {
        getPropertyDetails();
    }, []);

    // *********  for view property details if buyer login else give alert   *******************

    const handleViewDetails = async (property) => {
        // console.log("buyer mobile :", buyerInfo)
        if (!buyerInfo) {
            Swal.fire({
                icon: 'warning',
                title: 'Login Required',
                text: 'Please login to view property details',
                showCancelButton: true,
                confirmButtonText: 'Login Now',
                cancelButtonText: 'Cancel',
            }) // .then((result) => {
            //     if (result.isConfirmed) {
            //         navigate('/buyer/login');
            //     }
            // });
        } else {
            setViewDetails([true, property]);
        }
    };

    // ******* for purchase property *******************

    const buyProperty = (property_number) => {
        Swal.fire({
            icon: 'success',
            title: 'Purchase Initiated',
            text: `You have expressed interest in purchasing this property: ${property_number}`,
            confirmButtonText: 'Proceed to Payment'
        }).then((result) => {
            if (result.isConfirmed) {
                // Redirect to a payment route with property_number (you can pass via state or URL)
                navigate(`/buyer/payment/${property_number}`);
            }
        });
    };
    // ******* for Save property *******************

    const buyerSaveProperty = async (property_number) => {
        try {
            const response = await fetch("http://localhost:4000/api/buyer/save-property", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ mobile: buyerInfo.mobile, property_number: property_number })
            });

            const result = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Saved',
                    text: result.message
                });
            }
        } catch (error) {
            console.error("Error saving property:", error);
        }
    };

    // ***********************************************

    return (
        <>
            <div className="card1-container">
                <div className="text-div">
                    <p>
                        <span>Insights & Tools </span>
                        <p className='text-div-paragraph'>Go from browsing to buying</p> 
                    </p>
                </div>

                <div className="property-row">
                    {
                        allProperty.map((property, index) => (
                            <div className="property-card" key={index}>
                                <div className="property-image">
                                    
                                    {property.photos && property.photos.length > 0 ? (
                                        <img src={`http://localhost:4000/assets/${property.photos[0]}`} alt="property" />
                                    ) : (
                                        <div className="no-image-box"> Property photo not available</div>
                                    )}

                                </div>
                                <div className="property-details">
                                    <h3>{property.property_type}</h3>
                                    <p className="location">{property.location} , {property.city}</p>
                                    <p>{property.description.length > 20 ? property.description.slice(0, 20) + ' ...' : property.description} </p>
                                    <p className="price"><span>$ {property.price}</span></p>
                                    <button className="view-btn" onClick={() => handleViewDetails(property)}>View Details</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            {
                viewDetails[0] && (
                    <PropertyModal
                        property={viewDetails[1]}
                        visible={viewDetails[0]}
                        onClose={() => setViewDetails([false, null])}
                        onBuy={buyProperty}
                        onSave={buyerSaveProperty}
                        buyerMobile={buyerInfo.mobile}
                    />
                )
            }
        </>
    );
}

export default PropertyCard;
