import { Toast } from '@/components/ui/toast';
import { db } from '@/services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '@/viewTrip/components/PlacesToVisit';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/custom/SectionWrapper';

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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full relative min-h-screen"
        >
            <div className="relative flex flex-col items-center px-4 sm:px-8 lg:px-56 gap-9 justify-center mb-16 sm:mb-24 
    dark:bg-[url('/WorldMap.png')] bg-[url('/WorldMapLight.png')] bg-cover bg-center bg-no-repeat w-full min-h-screen py-5 gap-y-20 sm:gap-y-15 md:gap-y-10 lg:gap-y-20 xl:gap-y-20">
                <div className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-sm"></div>

                {/* Information Section */}
                <div className='mt-10 w-full'>
                    <SectionWrapper>
                        <InfoSection tripData={trip} />
                    </SectionWrapper>
                </div>
                {/* Recommended Section */}
                <SectionWrapper>
                    <Hotels trip={trip} />
                </SectionWrapper>
                {/* Daily Plan */}
                    <PlacesToVisit trip={trip} />
                {/* Footer */}
                <SectionWrapper>
                    <Footer />
                </SectionWrapper>
            </div>
        </motion.div>
    )
}

export default ViewTrip