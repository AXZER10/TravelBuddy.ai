/* eslint-disable react-hooks/exhaustive-deps */
import { db } from '@/services/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useNavigation } from 'react-router';
import UserTripCard from './components/UserTripCard';
import { FaPlus } from "react-icons/fa";


function MyTrips() {

    const [userTrips, setUserTrips] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUserTrips();
        setUserTrips([]); // Clear previous trips
    }, [])

    const getUserTrips = async () => {
        setLoading(true)
        const user = JSON.parse(localStorage.getItem('user'));
        const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]); // Clear previous trips
        const trips = querySnapshot.docs.map(doc => doc.data()); // Collect trips in an array
        setUserTrips(trips); // Update state only once
        setLoading(false)
        console.log(userTrips)
    };
    return (
        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-120 px-5 mt-10 h-full pb-20 flex flex-col'>
            <h2 className='font-bold text-3xl'>My Trips</h2>
    
            {loading ? (
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-5'>
                    {[1, 2, 3, 4, 5, 6].map((item, index) => (
                        <div
                            key={index}
                            className='h-[250px] w-full bg-slate-200 animate-pulse rounded-xl'
                        />
                    ))}
                </div>
            ) : (
                <div>
                    {userTrips.length > 0 ? (
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mt-5'>
                            {userTrips.map((trip, index) => (
                                <UserTripCard key={trip.id || index} trip={trip} />
                            ))}
                        </div>
                    ) : (
                        <div className='flex py-5 flex-col items-center'>
                            <p className='font-bold text-gray-400 text-3xl mb-10'>No Trips Found</p>
                            <div className='flex items-center justify-center gap-3'>
                                <p className='font-bold text-3xl'>Create New Trip?</p>
                                <Link to={'/CreateTrip'}>
                                    <FaPlus
                                        size={50}
                                        className='cursor-pointer border-4 rounded-full p-1 hover:bg-gray-500'
                                    />
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default MyTrips