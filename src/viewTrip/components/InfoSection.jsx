/* eslint-disable react/prop-types */
import React from 'react'
import { IoIosSend } from "react-icons/io";

function InfoSection({ tripData }) {
    const action = () => {
        console.log("Share Pressed")
    }

    return (
        <div>
            <img src="/Logo.png" className='h-[340px] rounded-xl w-full object-cover' />
            <div className='flex flex-row items-center justify-between'>
                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-2xl'>{tripData.userSelection?.location?.label}</h2>
                    <div className='gap-x-2 flex'>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>📆 {tripData.userSelection?.noOfDays} {tripData.userSelection?.noOfDays == 1 ? 'day' : "days"}</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>💸 {tripData.userSelection?.budget} Budget</h2>
                        <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>🤵🏻‍♂️ No. of people: {tripData.userSelection?.noOfPeople}</h2>
                    </div>
                </div>
                <IoIosSend 
                onClick={action}
                className='justify-center items-center w-10 h-10 border border-black bg-[#32c1c1] rounded-xl p-0.5 mx-2'/>
            </div>
        </div>
    )
}

export default InfoSection