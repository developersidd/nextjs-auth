"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("")
  const sendEmailToResetPassword = async () => {
    if (email.length < 1) {
      return toast.error("Please Provide Email!");
    }
    try {
      const res = await axios.post("/api/users/resetpassword", { email });
      toast.success(
        <div>
          <h3 className='text-sm'> {res.data.message} </h3>
          <Link className='underline decoration-blue-500' href={res.data.link}> {res.data.subject} </Link>
        </div>,
        {
          position: "bottom-right",
          duration: 10000
        });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className='flex  items-center justify-center w-[30%] flex-col p-5 rounded shadow-md'>
      <h1> Reset your password By Entering here your Email ID </h1>
      <input type="email" className='outline-none p-3 rounded border-2 focus:border-orange-500 mb-4 text-sm' placeholder='Enter your Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
      <button className='px-6 py-2  bg-orange-500 text-white rounded shadow my-3' onClick={sendEmailToResetPassword}> Submit </button>
    </div>
  )
}

export default ResetPassword;