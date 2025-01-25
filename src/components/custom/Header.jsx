import React from 'react'
import { Button } from '../ui/button'
import { useEffect } from 'react';

function Header() {

    const user = localStorage.getItem('user');
    
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
                {user ?
                    <>
                        {/* {var parsedUser = typeof user === 'string' ? JSON.parse(user) : user;} */}
                        <img
                            src={JSON.parse(user).picture}
                            alt={JSON.parse(user).name}
                            className="h-12 w-12 rounded-full border border-gray-300"
                            referrerPolicy="no-referrer"
                        />
                    </>
                    :
                    <Button>
                        Sign In
                    </Button>

                }

            </div>
        </div>
    )
}

export default Header