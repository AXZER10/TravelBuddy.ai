/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { GetPlaceDetails } from '@/services/GlobalApi';
import { React, useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";

function InfoSection({ tripData }) {

    const PHOTO_REF_URL = 'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

    const action = () => {
        console.log("Share Pressed")
    }

    useEffect(() => {
        if (tripData?.userSelection?.location?.label) {
            GetPlacePhotos();
        } else {
            // console.warn("Location label is missing or undefined.");
        }
    }, [tripData]);
    const [photoUrl, setPhotoUrl] = useState('');
    const GetPlacePhotos = async () => {
        if (!tripData?.userSelection?.location?.label) {
            console.error("Missing location label!");
            return;
        }

        const data = {
            textQuery: tripData.userSelection.location.label
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
        <div>
            <img src={photoUrl} className='h-[340px] rounded-xl w-full object-cover' />
            <div className='flex flex-row items-center justify-between'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>
                        {tripData.userSelection?.location?.label || "Unknown Location"}
                    </h2>
                    <div className='gap-x-2 flex'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>📆 {tripData.userSelection?.noOfDays} {tripData.userSelection?.noOfDays == 1 ? 'day' : "days"}</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>💸 {tripData.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>🤵🏻‍♂️ No. of people: {tripData.userSelection?.noOfPeople}</h2>
                    </div>
                </div>
                <IoIosSend
                    onClick={action}
                    className='justify-center items-center w-10 h-10 border border-black bg-[#32c1c1] rounded-xl p-0.5 mx-2' />
            </div>
        </div>
    )
}

export default InfoSection