/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import SectionWrapper from '@/components/custom/SectionWrapper';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import React, { useEffect, useState } from 'react'

function HotelCard({ hotel }) {

    useEffect(() => {
        if (hotel?.hotelName) {
            GetPlacePhotos();
        } else {
            // console.warn("Location label is missing or undefined.");
        }
    }, [hotel]);
    const [photoUrl, setPhotoUrl] = useState('');
    const GetPlacePhotos = async () => {
        if (!hotel?.hotelName) {
            console.error("Missing location label!");
            return;
        }

        const data = {
            textQuery: hotel?.hotelName + hotel?.address
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
        <SectionWrapper>
            <div className='hover:scale-105 transition-all cursor-pointer hover:shadow-xl p-2 rounded-xl'>
                <img src={photoUrl ? photoUrl : '/PlaceholderNoImage.png'} className='h-[340px] rounded-xl w-full object-cover shadow-2xl' />
                <div className='my-2 flex gap-2 flex-col'>
                    <h2 className='font-semibold dark:text-black'>{hotel?.hotelName}</h2>
                    <h2 className='text-gray-800 text-sm mt-1'>📍 {hotel?.address}</h2>
                    <h2 className='text-gray-800 text-sm mt-1'>{hotel?.price}</h2>
                    <h2 className='text-gray-800 text-sm mt-1'>{hotel.rating}★</h2>
                </div>
            </div>
        </SectionWrapper>

    )
}

export default HotelCard