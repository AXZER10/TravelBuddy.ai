import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FcGoogle } from "react-icons/fc";
import { PROMPT, SelectBudgetOptions, SelectNoOfPersons } from '@/constants/options';
import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useCustomToast } from '@/components/custom/Toast';
import { chatSession } from '@/services/AiModel';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { useNavigate } from 'react-router';

function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDialogue, setOpenDialogue] = useState(false);
    const { showToast } = useCustomToast();
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' || window.matchMedia('(prefers-color-scheme: dark)').matches
    );

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const LogIn = useGoogleLogin({
        onSuccess: (codeResp) => GetUserProfile(codeResp),
        onError: (error) => console.log(error)
    });

    const GetUserProfile = async (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialogue(false);
            window.location.reload();
            onGenerateTrip();
        });
    };

    const onGenerateTrip = async () => {
        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDialogue(true);
        }

        if (!formData?.noOfDays || !formData?.location || !formData?.noOfPeople || !formData?.budget) {
            showToast("Please Enter all details", "Fill in the missing details.");
            return;
        }

        if (formData?.noOfDays && formData?.location && formData?.noOfPeople && formData?.budget) {
            if (formData?.noOfDays > 5) {
                showToast("Invalid number of days", "The number of days should be less than 5");
                return;
            } else if (formData?.noOfDays < 1) {
                showToast("Invalid number of days", "The number of days should be more than 0");
                return;
            } else {
                setLoading(true);
                const Final_Prompt = PROMPT
                    .replace('{location}', formData?.location?.label)
                    .replace('{noOfDays}', formData?.noOfDays)
                    .replace('{People}', formData?.noOfPeople)
                    .replace('{Budget}', formData?.budget);
                try {
                    const result = await chatSession.sendMessage(Final_Prompt);
                    setLoading(false);
                    await saveToDB(result?.response.text());
                    console.log(JSON.parse(result?.response.text()));
                } catch (error) {
                    setLoading(false);
                    if (error?.message?.includes("503")) {
                        showToast("Service Unavailable", "The model is currently overloaded. Please try again later.");
                    } else {
                        showToast("Error", "An error occurred while generating your trip. Please try again.");
                    }
                }
            }
        }
    };

    const saveToDB = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docID = Date.now().toString();
        await setDoc(doc(db, "AITrips", docID), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docID
        });
        setLoading(false);
        navigate('/viewTrip/' + docID);
    };

    return (
        <div className='sm:px-5 md:px-10 lg:px-32 xl:px-56 px-5 mt-10 dark:bg-gray-800'>
            <h2 className='font-bold text-2xl sm:text-3xl text-[#32c1c1]'>Tell us your Travel Preferences</h2>
            <p className='mt-3 text-gray-500 text-base sm:text-lg'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
            <div className='mt-3 sm:mt-10 flex flex-col gap-8 sm:gap-10'>
                <div>
                    <h2 className='text-lg sm:text-xl font-medium my-3 text-[#32c1c1]'>What is the destination of your choice?</h2>
                    <GooglePlacesAutocomplete
                        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                        selectProps={{
                            place,
                            onChange: (v) => {
                                setPlace(v);
                                handleInputChange('location', v);
                            },
                            styles: {
                                control: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: darkMode ? '#000' : '#fff', // Black in dark mode, white in light mode
                                    borderColor: state.isFocused ? '#32c1c1' : darkMode ? '#555' : '#ccc',
                                    color: darkMode ? '#fff' : '#333',
                                    boxShadow: state.isFocused ? '0 0 5px rgba(50, 193, 193, 0.5)' : 'none',
                                    '&:hover': {
                                        borderColor: '#32c1c1',
                                    }
                                }),
                                input: (provided) => ({
                                    ...provided,
                                    color: darkMode ? '#fff' : '#333', // White text in dark mode
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: darkMode ? '#fff' : '#333', // Selected value text color
                                }),
                                menu: (provided) => ({
                                    ...provided,
                                    backgroundColor: darkMode ? '#000' : '#fff', // Dropdown background black in dark mode
                                    borderRadius: '8px',
                                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                }),
                                option: (provided, state) => ({
                                    ...provided,
                                    backgroundColor: state.isSelected
                                        ? '#32c1c1'
                                        : state.isFocused
                                            ? darkMode ? '#333' : '#e0f7fa'
                                            : darkMode ? '#000' : '#fff',
                                    color: state.isSelected ? '#fff' : darkMode ? '#fff' : '#333',
                                    padding: '10px',
                                    cursor: 'pointer',
                                }),
                            }
                        }}
                    />
                </div>
                <div>
                    <h2 className='text-lg sm:text-xl font-medium my-3'>How many days do you want to travel?</h2>
                    <Input placeholder={'Ex. 3'} type="number"
                        onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                        className='w-full sm:w-1/2'
                    />
                </div>
                <div>
                    <h2 className='text-lg sm:text-xl font-medium my-3'>What is your budget?</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                        {SelectBudgetOptions.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('budget', item.title)}
                                className={`p-4 border border-slate-300 shadow-lg rounded-lg hover:shadow-lg hover:border-[#32c1c1] cursor-pointer ${formData?.budget == item.title && 'shadow-lg shadow-[#32c1c1] border-[#32c1c1]'}`}>
                                <h2 className='text-3xl sm:text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className='text-lg sm:text-xl font-medium my-3'>Who do you plan on traveling with on your next adventure?</h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
                        {SelectNoOfPersons.map((item, index) => (
                            <div key={index}
                                onClick={() => handleInputChange('noOfPeople', item.no)}
                                className={`p-4 border border-slate-300 shadow-lg rounded-lg hover:shadow-lg hover:border-[#32c1c1] cursor-pointer ${formData?.noOfPeople == item.no && 'shadow-lg shadow-[#32c1c1]'}`}>
                                <h2 className='text-3xl sm:text-4xl'>{item.icon}</h2>
                                <h2 className='font-bold text-lg'>{item.title}</h2>
                                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                                <h2 className='text-sm text-gray-500'>{item.no}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-5 mb-20 flex items-center justify-end">
                <Button onClick={onGenerateTrip}
                    disabled={loading}
                    className='w-full sm:w-auto'>
                    {loading ? <AiOutlineLoading3Quarters className='h-6 sm:h-7 w-6 sm:w-7 animate-spin font-bold' /> : <p>Generate Trip</p>}
                </Button>
            </div>
            <Dialog open={openDialogue}>
                <DialogContent>
                    <div className='flex flex-row items-center'>
                        <img src="/Logo.png" alt="" className='h-10 rounded-3xl' />
                        <div className='pl-2 font-semibold text-xl text-center'>
                            TravelBuddy.ai
                        </div>
                    </div>
                    <DialogTitle>Sign In with Google</DialogTitle>
                    <DialogDescription>
                        Sign in to the app with Google authentication securely.
                    </DialogDescription>
                    <Button onClick={LogIn} className='w-full flex flex-row gap-2'>
                        Sign in with Google <FcGoogle className='h-7 w-7' />
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateTrip;