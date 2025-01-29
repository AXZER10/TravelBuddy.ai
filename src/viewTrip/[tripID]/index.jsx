import { Toast } from '@/components/ui/toast';
import { db } from '@/services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { React, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '@/viewTrip/components/PlacesToVisit';
import Footer from '../components/Footer';
import { IoIosHome } from 'react-icons/io';
import { Button } from '@/components/ui/button';

function ViewTrip() {

    const { tripID } = useParams();
    const [trip, setTrip] = useState([]);

    const getTripData = async () => {
        const docRef = doc(db, 'AITrips', tripID)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            setTrip(docSnap.data());
        }
        else {
            console.log("No such document")
            Toast('No trip found!')
        }
    }
    useEffect(() => {
        tripID && getTripData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tripID])


    return (
        <>
            <div className='flex items-center justify-end m-2 p-2'>
                <Link to={'/'}>
                    <Button>
                        <IoIosHome className='h-5 rounded-3xl' />
                    </Button>
                </Link>
            </div>
            <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
                {/* Information Section */}
                <InfoSection tripData={trip} />
                {/* Recommended Section */}
                <Hotels trip={trip} />
                {/* Daily Plan */}
                <PlacesToVisit trip={trip} />
                {/* Footer */}
                <Footer />
            </div>
        </>
    )
}

export default ViewTrip