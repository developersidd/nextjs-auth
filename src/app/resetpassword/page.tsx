"use client";
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
  const [email, setEmail] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true);

  const sendEmailToResetPassword = async () => {
    setLoading(true);
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
      toast.error(error.response?.data?.error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className='w-[40%] mx-auto mt-16 p-5 rounded shadow-md'>
      <div className="text-center">
        <h1 className="text-xl font-medium mb-4"> {loading ? "Processing" : "Reset your password By Entering here your Email ID"} </h1>
        <input type="email" className='mr-3 outline-none p-3 rounded border-2 focus:border-orange-500 mb-4 text-sm' placeholder='Enter your Email' required value={email} onChange={(e) => setEmail(e.target.value)} />
        <button className='px-6 py-3  bg-orange-500 text-white rounded shadow my-3' onClick={sendEmailToResetPassword}> Submit </button>
      </div>
    </div>
  )
}

export default ResetPassword;