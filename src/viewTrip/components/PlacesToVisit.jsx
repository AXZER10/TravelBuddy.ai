/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router';
import { Button } from '../../components/ui/button';
import { TbMapSearch } from "react-icons/tb";
import PlacesToVisitCard from './PlacesToVisitCard';

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
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 border-4 border-[#32c1c1] rounded-xl p-4 m-2'>
                            {data.activities?.length > 0 ? (
                                data.activities.map((activity, idx) => (
                                    <Link to={'https://www.google.com/maps/search/?api=1&query='+activity.placeName+','+trip?.userSelection?.location?.label} target='_blank' key={activity.placeName + idx}>
                                        <PlacesToVisitCard activity={activity}/>
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