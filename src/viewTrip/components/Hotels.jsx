/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router'
import HotelCard from './HotelCard'

function Hotels({ trip }) {

    return (
        <div className='bg-gray-200 p-5 rounded-xl'>
            <h2 className='font-bold text-xl'>Hotel Recommendations</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <Link key={index} to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + ',' + hotel?.address + ',' + trip?.userSelection?.location?.label} target='_blank'>
                        <HotelCard hotel={hotel}/>
                    </Link>
                ))}
            </div>
        </div >
    )
}

export default Hotels