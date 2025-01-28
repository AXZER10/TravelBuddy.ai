/* eslint-disable react/prop-types */
import React from 'react'
import { Link } from 'react-router'

function Hotels({ trip }) {
    return (
        <div className='bg-gray-200 p-5 rounded-xl'>
            <h2 className='font-bold text-xl'>Hotel Recommendations</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
                {trip?.tripData?.hotelOptions?.map((hotel, index) => (
                    <Link key={index} to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+','+hotel?.address+','+trip?.userSelection?.location?.label} target='_blank'>
                        <div className='hover:scale-105 transition-all cursor-pointer hover:shadow-xl p-2 rounded-xl'>
                            <img src={"/Placeholder.jpg"} className='h-[340px] rounded-xl w-full object-cover shadow-2xl' />
                            <div className='my-2 flex gap-2 flex-col'>
                                <h2 className='font-semibold'>{hotel?.hotelName}</h2>
                                <h2 className='font-medium text-gray-500 text-xs'>📍 {hotel?.address}</h2>
                                <h2 className='font-medium text-gray-500 text-xs'>{hotel?.price}</h2>
                                <h2 className='font-medium text-gray-500 text-xs'>{hotel.rating}★</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div >
    )
}

export default Hotels