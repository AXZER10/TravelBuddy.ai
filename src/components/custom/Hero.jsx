import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'
import RotatingText from '@/jsrepo/TextAnimations/RotatingText/RotatingText'
import { motion } from 'framer-motion'


function Hero() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }} // Start 50px below and invisible
            animate={{ opacity: 1, y: 0 }}  // Move to normal position and fade in
            transition={{ duration: 0.5, ease: "easeOut" }} // Smooth animation
            className='w-full'
        >
            <div
                className="relative flex flex-col items-center px-4 sm:px-8 lg:px-56 gap-9 justify-center mb-16 sm:mb-24 
    dark:bg-[url('/WorldMap2.png')] bg-[url('/WorldMapLight.png')] bg-cover bg-center bg-no-repeat w-full h-full"
            >
                {/* Blur Overlay */}
                <div className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-sm dark:backdrop-blur-none"></div>

                {/* Content */}
                <div className="relative z-10 text-center flex flex-col items-center justify-center mt-10">
                    <img src="/Logo.png" className='rounded-3xl h-40 w-40' />
                    <p className='font-extrabold text-[30px] sm:text-[40px] md:text-[50px]'>
                        TravelBuddy.ai
                    </p>
                    <div className='flex items-center justify-center gap-1'>
                        <p className='text-2xl font-semibold sm:text-2xl lg:text-2xl text-gray-400 text-center'>
                            Plan
                        </p>
                        <RotatingText
                            texts={['Smarter!', 'Better!']}
                            mainClassName="p-1 text-2xl font-semibold sm:text-2xl lg:text-2xl text-gray-400 overflow-hidden justify-center rounded-lg"
                            staggerFrom={"last"}
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "-120%" }}
                            staggerDuration={0.025}
                            splitLevelClassName="overflow-hidden"
                            transition={{ type: "spring", damping: 30, stiffness: 400 }}
                            rotationInterval={2000}
                        />
                    </div>
                </div>

                {/* Hero Title and Description */}
                <h1 className='relative z-10 font-extrabold text-[30px] sm:text-[40px] md:text-[50px] text-center'>
                    <span className='text-[#32c1c1]'>Discover Your Next Adventure with AI:</span>
                    <br />
                    Personalized Itineraries at Your Fingertips
                </h1>
                <p className='relative z-10 text-base sm:text-lg lg:text-xl text-gray-500 text-center'>
                    Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
                </p>
                <img src="/HeroPage.png" alt="" className='w-full h-[450px] sm:h-[400px] object-contain z-10' />
                <Link to={'/CreateTrip'}>
                    <Button className='relative z-10 mt-6 px-6 py-3 sm:px-8 sm:py-4 bg-[#32c1c1] mb-10'>Get Started</Button>
                </Link>
            </div>
        </motion.div>
    )
}

export default Hero