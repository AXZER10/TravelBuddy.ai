/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { PiSignOutFill } from "react-icons/pi";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
// import { useNavigation } from 'react-router';


function Header() {

    const user = localStorage.getItem('user');
    useEffect(() => {
        console.log(user)
    }, [])

    const LogIn = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)
    })
    const GetUserProfile = async (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            // console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            window.location.reload();
        })
    }

    // const navigation = useNavigation();

    return (
        <div className='p-3 shadow-sm flex flex-row border-2 justify-between'>
            <div className='flex flex-row items-center justify-evenly '>
                <img src="/Logo.png" alt="" className='h-10 rounded-3xl' />
                <div className='pl-2 font-black text-gray-500 text-xl text-center'>
                    TravelBuddy.ai
                </div>
            </div>
            <div className='justify-center items-center flex gap-3'>
                <Button variant='outline' className='rounded-full'>
                    <img src="/DarkModeIcon.png" alt="" className='h-5 rounded-3xl' />
                </Button>
                <Button variant='outline' className='rounded-full font-bold'>Home</Button>
                {user ?
                    <div className='flex gap-3 items-center'>
                        <Button variant='outline' className='rounded-full font-bold'>My trips</Button>
                        <div className='rounded-full'>
                            <Popover>
                                <PopoverTrigger>
                                    <img
                                        src={JSON.parse(user).picture}
                                        alt={JSON.parse(user).name}
                                        className="h-12 w-12 rounded-full border border-gray-300"
                                        referrerPolicy="no-referrer"
                                    />
                                </PopoverTrigger>
                                <PopoverContent className='w-32'>
                                    <div className='flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md' onClick={() => {
                                        googleLogout();
                                        localStorage.clear();
                                        // navigation('/')
                                        window.location.reload();
                                    }}>
                                        <PiSignOutFill />
                                        <h2>Logout</h2>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    :
                    <div>
                        <Button onClick={() => LogIn()}>
                            Sign In with Google<FcGoogle className='h-7 w-7' />
                        </Button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header