"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, FormEvent } from 'react'
import toast, { Toaster } from 'react-hot-toast';



const LoginPage = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const resetForm = () => (setUser({
    email: "",
    password: "",
  }))

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user])

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/users/login", user);
      //console.log("res:", res)
      toast.success(res.data.message);
      setTimeout(() => { router.push(`/profile/${res.data.user._id}`) }, 1000);

    } catch (error: any) {
      toast.error(error.message);

    } finally {
      resetForm();
      setLoading(false);
    }
  }

  return (
    <div className='flex bg-[#f5f5f5] flex-col justify-center items-center min-h-screen py-2'>
      <Toaster />
      <form action="" className="bg-white p-7 w-[30%] shadow-lg rounded" onSubmit={onLogin}>

        <h1 className="text-center text-xl border-b-2 mx-auto font-bold  w-20 border-orange-500 pb-1">{loading ? "Processing" : "Login"} </h1>
        <br />
        <label className='mb-2 block font-semibold' htmlFor="email"> Email</label>
        <input
          type="email"
          id='email'
          className='outline-none p-3 w-full  rounded border-2 focus:border-orange-500 mb-4 text-sm'
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder='email'
        />
        <br />
        <label className='mb-2 block font-semibold' htmlFor="password"> Password</label>
        <input

          type="password"
          id='password'
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder='password'
          className='w-full outline-none p-3  rounded border-2 focus:border-orange-500 mb-1 text-sm'
        />
        <br />
        <button type='submit' disabled={buttonDisabled || loading} className={`${(buttonDisabled || loading) ? "opacity-50" : "opacity-100"} px-6 py-2 border-2 border-orange-500 rounded shadow my-3`}> Login </button>
        <br />
        <small>
          Haven&apos;t account?
          <Link href="/signup"> Signup  </Link>
        </small>
      </form>
    </div>
  )
}

export default LoginPage