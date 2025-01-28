/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import { TbMapSearch } from "react-icons/tb";

function PlacesToVisit({ trip }) {
    const { tripData } = trip || {}; // Destructure tripData with fallback to avoid undefined errors
    const itinerary = tripData?.itinerary || {};

    // If itinerary is empty or not an object, show a message
    if (Object.keys(itinerary).length === 0) {
        return <div>No itinerary data available.</div>;
    }

    return (
        <div className='p-5 bg-gray-200 mt-5 rounded-xl'>
            <h2 className="font-bold text-xl">Places to Visit</h2>
            <div className="mt-4">
                {Object.entries(itinerary).map(([day, data]) => (
                    <div key={day} className="mt-3">
                        <h3 className="font-semibold text-lg capitalize px-2">{day}</h3>
                        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 border-4 border-[#32c1c1] rounded-xl p-4 m-2'>
                            {data.activities?.length > 0 ? (
                                data.activities.map((activity, idx) => (
                                    <Link to={'https://www.google.com/maps/search/?api=1&query='+activity.placeName+','+trip?.userSelection?.location?.label} target='_blank' key={activity.placeName + idx}>
                                        <div
                                            className="transition-transform transform hover:scale-105 cursor-pointer mt-5 hover:shadow-xl p-2 rounded-xl"
                                        >
                                            <img
                                                src={"/Placeholder.jpg"}
                                                className="h-[130px] w-[340px] rounded-xl object-cover shadow-2xl"
                                                alt={activity.placeName || "Placeholder"}
                                            />
                                            <h4 className="font-semibold mt-2">{activity.placeName}</h4>
                                            <p className="text-gray-500 text-sm">{activity.details}</p>
                                            <p className="text-gray-500 text-xs mt-2">💰 {activity.pricing}</p>
                                            <p className="text-green-600 text-xs mt-2 text-center rounded-xl bg-gray-300 shadow-sm shadow-gray-500 p-1">⏰ {activity.timings}</p>
                                        </div>
                                        {/* <div className='flex items-center justify-end'>
                                            <Button size='sm'><TbMapSearch className='w-2 h-2' /></Button>
                                        </div> */}
                                    </Link>

                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No activities available for this day.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default React.memo(PlacesToVisit); // Memoize to prevent unnecessary re-renders