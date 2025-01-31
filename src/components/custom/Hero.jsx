import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'

function Hero() {
    return (
        <div className='flex flex-col items-center px-4 sm:px-8 lg:px-56 gap-9 justify-center mb-16 sm:mb-24'>
            {/* Site Name */}
            <div className='text-center flex flex-col items-center justify-center mt-10'>
                <img src="/Logo.png" className='rounded-3xl h-40 w-40' />
                <p className='font-extrabold text-[30px] sm:text-[40px] md:text-[50px]'>
                    TravelBuddy.ai
                </p>
                <p className='text-base font-semibold sm:text-lg lg:text-xl text-gray-400 text-center'>
                    Plan Smarter, Travel Better.
                </p>
            </div>
            {/* Hero Title and Description */}
            <h1 className='font-extrabold text-[30px] sm:text-[40px] md:text-[50px] text-center'>
                <span className='text-[#32c1c1]'>Discover Your Next Adventure with AI:</span>
                <br />
                Personalized Itineraries at Your Fingertips
            </h1>
            <p className='text-base sm:text-lg lg:text-xl text-gray-500 text-center'>
                Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
            </p>
            <Link to={'/CreateTrip'}>
                <Button className='mt-6 px-6 py-3 sm:px-8 sm:py-4 bg-[#32c1c1]'>Get Started</Button>
            </Link>
        </div>
    )
}

export default Hero