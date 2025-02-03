/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import SectionWrapper from '@/components/custom/SectionWrapper';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'

function PlacesToVisitCard({ activity }) {

    useEffect(() => {
        if (activity?.placeName) {
            GetPlacePhotos();
        } else {
            // console.warn("Location label is missing or undefined.");
        }
    }, [activity]);
    const [photoUrl, setPhotoUrl] = useState('');
    const GetPlacePhotos = async () => {
        // if (activity?.placeName) {
        //     // console.error("Missing location label!");
        //     // return;
        // }

        const data = {
            textQuery: activity?.placeName
        };

        try {
            const response = await GetPlaceDetails(data);
            if (response.data.places && response.data.places.length > 0 && response.data.places[0].photos?.length > 1) {
                const photoRef = response.data.places[0].photos[1].name;
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
            <div
                className="rounded-xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl hover:shadow-gray-700 gap-2 mt-5 flex flex-col justify-between"
            >
                <div>
                    <img
                        src={photoUrl ? photoUrl : '/Placeholder.jpg'}
                        className="h-[130px] w-[340px] rounded-xl object-cover shadow-2xl"
                        alt={activity.placeName || "Placeholder"}
                    />
                    <h4 className="font-semibold mt-2 dark:text-black px-2">{activity.placeName}</h4>
                    <p className="text-gray-800 text-sm mt-1 px-2">{activity.details}</p>
                    <p className="text-gray-800 text-xs mt-1 px-2">💰 {activity.pricing}</p>
                </div>
                <div>
                    <p className="text-green-600 text-xs mt-2 m-2 text-center rounded-xl bg-gray-300 shadow-sm shadow-gray-500 p-1">⏰ {activity.timings}</p>
                </div>
            </div>
    )
}

export default PlacesToVisitCard