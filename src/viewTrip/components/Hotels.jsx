/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router'  // Adjusted for React Router v6
import HotelCard from './HotelCard'

function Hotels({ trip }) {

    return (
        <div className='bg-gray-200 p-5 rounded-xl'>
            <h2 className='font-bold text-xl sm:text-2xl'>Hotel Recommendations</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <Link 
                        key={index} 
                        to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + ',' + hotel?.address + ',' + trip?.userSelection?.location?.label} 
                        target='_blank' 
                        className='w-full'  // Ensures the link doesn't collapse in grid items
                    >
                        <HotelCard hotel={hotel} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Hotels