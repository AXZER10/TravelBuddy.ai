import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FcGoogle } from "react-icons/fc";
import { PROMPT, SelectBudgetOptions, SelectNoOfPersons } from '@/constants/options';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
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
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConfig';
import { Link, useNavigate } from 'react-router';
import { IoIosHome } from 'react-icons/io';


function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const [openDialogue, setOpenDialogue] = useState(false);
    const { showToast } = useCustomToast()

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
            setOpenDialogue(false);
            onGenerateTrip();
        })
    }

    const onGenerateTrip = async () => {

        const user = localStorage.getItem('user');
        if (!user) {
            setOpenDialogue(true);
        }

        if (
            !formData?.noOfDays ||
            !formData?.location ||
            !formData?.noOfPeople ||
            !formData?.budget
        ) {
            showToast("Please Enter all details", "Fill in the missing details.");
            return;
        }
        if (
            formData?.noOfDays &&
            formData?.location &&
            formData?.noOfPeople &&
            formData?.budget
        ) {
            if (formData?.noOfDays > 5) {
                showToast("Invalid number of days", "The number of days should be less than 5")
                return;
            }
            else if (formData?.noOfDays < 1) {
                showToast("Invalid number of days", "The number of days should be more than 0")
                return;
            }
            else {
                // console.log(formData)
                setLoading(true);
                const Final_Prompt = PROMPT
                    .replace('{location}', formData?.location?.label)
                    .replace('{noOfDays}', formData?.noOfDays)
                    .replace('{People}', formData?.noOfPeople)
                    .replace('{Budget}', formData?.budget)
                    .replace('{noOfDays}', formData?.noOfDays)
                    .replace('{Budget}', formData?.budget)
                // console.log("PROmpt", Final_Prompt)
                const result = await chatSession.sendMessage(Final_Prompt);
                console.log("Result", result?.response?.text());
                setLoading(false)
                await saveToDB(result?.response.text());
            }
        }

    }
    const saveToDB = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docID = Date.now().toString()
        await setDoc(doc(db, "AITrips", docID), {
            userSelection: formData,
            tripData: JSON.parse(TripData),
            userEmail: user?.email,
            id: docID
        });
        setLoading(false);
        navigate('/viewTrip/' + docID)
    }


    return (
        <>
            <div className=' flex items-center justify-end m-4 p-4'>
                <Link to={'/'}>
                    <Button>
                        <IoIosHome className='h-5 rounded-3xl' />
                    </Button>
                </Link>
            </div>
            <div className='sm:px-10 md:px-32 lg:px-56 xl:px-120 px-5 mt-10'>
                <h2 className='font-bold text-3xl'>Tell us your Travel Preferences</h2>
                <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
                <div className='mt-20 flex flex-col gap-10'>
                    <div>
                        <h2 className='text-xl my-3 font-medium'>
                            What is the destination of your choice?
                        </h2>
                        <GooglePlacesAutocomplete
                            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
                            selectProps={{
                                place,
                                onChange: (v) => {
                                    setPlace(v);
                                    handleInputChange('location', v)
                                }
                            }}
                        />
                    </div>
                    <div>
                        <h2 className='text-xl my-3 font-medium'>
                            How many days do you want to travel?
                        </h2>
                        <Input placeholder={'Ex. 3'} type="number"
                            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className='text-xl font-medium my-3'>What is your budget?</h2>
                        <div className='grid grid-cols-3 gap-5'>
                            {SelectBudgetOptions.map((item, index) => (
                                <div key={index}
                                    onClick={() => handleInputChange('budget', item.title)}
                                    className={`p-4 border rounded-lg hover:shadow-lg hover:border-[#32c1c1] cursor-pointer ${formData?.budget == item.title && 'shadow-lg shadow-[#32c1c1] border-[#32c1c1]'}`}>
                                    <h2 className='text-4xl'>{item.icon}</h2>
                                    <h2 className='font-bold text-lg'>{item.title}</h2>
                                    <h2 className='text-sm text-gray-500'>{item.desc}</h2>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className='text-xl font-medium my-3'>Who do you plan on traveling with on your next adventure?</h2>
                        <div className='grid grid-cols-3 gap-5'>
                            {SelectNoOfPersons.map((item, index) => (
                                <div key={index}
                                    onClick={() => handleInputChange('noOfPeople', item.no)}
                                    className={`p-4 border rounded-lg hover:shadow-lg hover:border-[#32c1c1] cursor-pointer ${formData?.noOfPeople == item.no && 'shadow-lg shadow-[#32c1c1]'}`}>
                                    <h2 className='text-4xl'>{item.icon}</h2>
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
                    >
                        {loading ? <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin font-bold' /> : <p>Generate Trip</p>}
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
                        <Button
                            onClick={LogIn}
                            className='w-full flex flex-row gap-2'>Sign in with Google<FcGoogle className='h-7 w-7' /></Button>
                    </DialogContent>
                </Dialog>

            </div>
        </>
    )
}

export default CreateTrip