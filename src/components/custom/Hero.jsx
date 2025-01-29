import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'

function Hero() {
    return (
        <div className='flex flex-col items-center mx-56 gap-9 justify-center mb-80'>
            <h1 className='font-extrabold text-[50px] text-center mt-16'>
                <span className='text-[#32c1c1]'>Discover Your Next Adventure with Al:</span>
                <br />
                Personalized Itineraries at Your Fingertips
            </h1>
            <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.</p>
            <Link to={'/CreateTrip'}>
                <Button>Get Started</Button>
            </Link>
        </div>
    )
}

export default Hero