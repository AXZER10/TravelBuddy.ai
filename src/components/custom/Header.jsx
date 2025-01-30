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
import { MdDarkMode } from "react-icons/md";


function Header() {
    const [user, setUser] = useState(null);

    // Check if user is logged in
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
            const userRef = doc(db, "users", userData.id); // Use Google ID as Firestore doc ID
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
        <div className='p-3 shadow-sm flex flex-row border-2 justify-between'>
            <div className='flex flex-row items-center justify-evenly '>
                <img src="/Logo.png" alt="Logo" className='h-10 rounded-3xl' />
                <a href="/">
                    <div className='pl-2 font-black text-gray-500 text-xl text-center'>
                        TravelBuddy.ai
                    </div>
                </a>
            </div>
            <div className='justify-center items-center flex gap-3'>
                <Button variant='outline' className='rounded-full'>
                    <MdDarkMode />
                </Button>
                <a href="/">
                    <Button variant='outline' className='rounded-full font-bold h-10'><IoIosHome size={50} className='rounded-3xl' />Home</Button>
                </a>
                <a href="/CreateTrip">
                    <Button variant='outline' className='rounded-full font-bold'><FaPlus size={50} className='cursor-pointer rounded-full' />Create Trips</Button>
                </a>
                {user ? (
                    <div className='flex gap-3 items-center'>
                        <a href="/my-trips">
                            <Button variant='outline' className='rounded-full font-bold'><IoAirplane />My trips</Button>
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
                                <div className='flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-200 p-2 rounded-md' onClick={handleLogout}>
                                    <PiSignOutFill />
                                    <h2>Logout</h2>
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