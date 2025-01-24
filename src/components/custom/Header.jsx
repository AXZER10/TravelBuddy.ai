import React from 'react'
import { Button } from '../ui/button'

function Header() {
    return (
        <div className='p-3 shadow-sm flex flex-row border-2 justify-between'>
            <div className='flex flex-row items-center justify-evenly '>
                <img src="/Logo.png" alt="" className='h-10 rounded-3xl' />
                <div className='pl-2 font-semibold text-xl text-center'>
                    TravelBuddy.ai
                </div>
            </div>
            <div className='justify-center items-center flex gap-3'>
                <Button>
                    <img src="/DarkModeIcon.png" alt="" className='h-5 rounded-3xl' />
                </Button>
                <Button>
                    Sign In
                </Button>
            </div>
        </div>
    )
}

export default Header