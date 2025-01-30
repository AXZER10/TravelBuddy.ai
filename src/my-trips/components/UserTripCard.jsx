/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

function UserTripCard({ trip }) {

    useEffect(() => {
        if (trip?.userSelection?.location?.label) {
            GetPlacePhotos();
        } else {
            // console.warn("Location label is missing or undefined.");
        }
    }, [trip]);
    const [photoUrl, setPhotoUrl] = useState('');
    const GetPlacePhotos = async () => {
        if (!trip?.userSelection?.location?.label) {
            console.error("Missing location label!");
            return;
        }

        const data = {
            textQuery: trip?.userSelection?.location?.label
        };

        try {
            const response = await GetPlaceDetails(data);
            if (response.data.places && response.data.places.length > 0 && response.data.places[0].photos?.length > 1) {
                const photoRef = response.data.places[0].photos[8].name;
                const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
                setPhotoUrl(photoUrl);
            } else {
                console.warn("No photos found for this place.");
            }
        } catch (error) {
            console.error("Error fetching place details:", error.response?.data || error.message);
        }
    };

    return (
        <Link to={'/ViewTrip/'+trip?.id}>
            <div className="bg-white shadow-lg rounded-xl overflow-hidden p-4 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl">
                {/* If trip has an image, use it; otherwise, show placeholder */}
                <img
                    src={photoUrl || "/Placeholder.jpg"}
                    alt={trip?.userSelection?.location?.label || "Trip Image"}
                    className="w-full h-40 object-cover rounded-lg"
                />
                <div className="mt-3">
                    {/* Display Trip Title */}
                    <h2 className="font-bold text-lg text-gray-800">
                        {trip?.userSelection?.location?.label || "Unknown Destination"}
                    </h2>

                    <p className="text-gray-400 text-xs mt-2">{trip?.userSelection?.noOfDays || "Unknown"} days trip with {trip?.userSelection?.budget || "Unknown"} Budget</p>
                    <p className="text-gray-400 text-xs mt-2">{trip?.userSelection?.noOfPeople || "Unknown"}</p>
                </div>
            </div>
        </Link>
    );
}

export default UserTripCard;