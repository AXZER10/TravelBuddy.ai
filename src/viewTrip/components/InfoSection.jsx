/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { GetPlaceDetails, PHOTO_REF_URL } from '@/services/GlobalApi';
import { React, useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";

function InfoSection({ tripData }) {

    const action = () => {
        console.log("Share Pressed")
        console.log(tripData?.tripData)
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
        <div className="">
            <img 
                src={photoUrl ? photoUrl : '/Logo.png'} 
                className='w-full h-[250px] sm:h-[340px] rounded-xl object-cover'
                alt="Destination"
            />
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between mt-5'>
                <div className='sm:my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-xl sm:text-2xl dark:text-[#32c1c1]'>
                        {tripData.userSelection?.location?.label || "Unknown Location"}
                    </h2>
                    <div className='gap-x-2 flex flex-wrap gap-2'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm sm:text-base'>
                            📆 {tripData.userSelection?.noOfDays} {tripData.userSelection?.noOfDays == 1 ? 'day' : "days"}
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm sm:text-base'>
                            💸 {tripData.userSelection?.budget} Budget
                        </h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-sm sm:text-base'>
                            🤵🏻‍♂️ No. of people: {tripData.userSelection?.noOfPeople}
                        </h2>
                    </div>
                </div>
                <IoIosSend
                    onClick={action}
                    className='mt-3 sm:mt-0 justify-center items-center w-10 h-10 border border-black bg-[#32c1c1] rounded-xl p-0.5 mx-2 cursor-pointer'
                />
            </div>
        </div>
    )
}

export default InfoSection;