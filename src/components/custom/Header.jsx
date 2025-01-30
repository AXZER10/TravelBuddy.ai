import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { PiSignOutFill } from "react-icons/pi";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { IoIosHome } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa';
import { IoAirplane } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";

function Header() {
    const [user, setUser] = useState(null);
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') ? localStorage.getItem('theme') === 'dark' : true
    );

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    const handleDarkModePress = () => {
        setDarkMode(prev => !prev);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Google Login
    const LogIn = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                        Accept: 'application/json'
                    }
                });

                const userData = response.data;
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);

                // Store user in Firestore
                await saveUserToFirestore(userData);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        },
        onError: (error) => console.log("Login Failed:", error)
    });

    // Store user in Firestore
    const saveUserToFirestore = async (userData) => {
        if (!userData) return;

        try {
            const userRef = doc(db, "users", userData.id);
            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    uid: userData.id,
                    name: userData.name,
                    email: userData.email,
                    photoURL: userData.picture,
                    createdAt: new Date(),
                });
            }
        } catch (error) {
            console.error("Error storing user in Firestore:", error);
        }
    };

    // Logout
    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem('user');
        setUser(null);
        window.location.reload();
    };

    return (
        <div className='p-3 shadow-sm flex flex-row border-2 justify-between bg-white dark:bg-[#035b62] dark:border-gray-700'>
            <div className='flex flex-row items-center justify-evenly'>
                <img src="/Logo.png" alt="Logo" className='h-10 rounded-3xl' />
                <a href="/">
                    <div className='pl-2 font-black text-gray-500 dark:text-white text-[10px] md:text-[20px] lg:text-4xl text-center hidden sm:block'>
                        TravelBuddy.ai
                    </div>
                </a>
            </div>
            <div className='justify-center items-center flex gap-3'>
                <Button variant='outline' className='rounded-full bg-[#18cccb] dark:bg-white dark:text-black' onClick={handleDarkModePress}>
                    {darkMode ?
                        <div className='flex items-center justify-center gap-1'>
                            <MdLightMode />
                            <p className='hidden sm:hidden md:hidden lg:block'>Toggle Light Mode</p>
                        </div>
                        :
                        <div className='flex items-center justify-center gap-1'>
                            <MdDarkMode />
                            <p className='hidden sm:block'>Toggle Dark Mode</p>
                        </div>
                    }
                </Button>
                <a href="/">
                    <Button variant='outline' className='rounded-full bg-[#18cccb] dark:bg-white dark:text-black h-10'>
                        <IoIosHome size={50} className='rounded-3xl' />
                        <span className='hidden sm:block'>Home</span>
                    </Button>
                </a>
                <a href="/CreateTrip">
                    <Button variant='outline' className='rounded-full font-bold bg-[#18cccb] dark:bg-white dark:text-black'>
                        <FaPlus size={50} className='cursor-pointer rounded-full' />
                        <span className='hidden sm:block'>Create Trips</span>
                    </Button>
                </a>
                {user ? (
                    <div className='flex gap-3 items-center'>
                        <a href="/my-trips">
                            <Button variant='outline' className='rounded-full font-bold bg-[#18cccb] dark:bg-white dark:text-black'>
                                <IoAirplane />
                                <span className='hidden sm:block'>My trips</span>
                            </Button>
                        </a>
                        <Popover>
                            <PopoverTrigger>
                                <img
                                    src={user.picture}
                                    alt={user.name}
                                    className="h-12 w-12 rounded-full border border-gray-300 cursor-pointer"
                                    referrerPolicy="no-referrer"
                                />
                            </PopoverTrigger>
                            <PopoverContent className='w-32'>
                                <div className='flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-md' onClick={handleLogout}>
                                    <PiSignOutFill />
                                    <span className='hidden sm:block'>Logout</span>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                ) : (
                    <Button onClick={LogIn}>
                        Sign In with Google <FcGoogle className='h-7 w-7' />
                    </Button>
                )}
            </div>
        </div>
    );
}

export default Header;