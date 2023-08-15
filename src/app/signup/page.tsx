"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, FormEvent } from 'react'
import toast, {Toaster}  from 'react-hot-toast';


const SignUpPage = () => {
    const router = useRouter();
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: ""
    });
    const resetForm = () => (setUser({
        email: "",
        password: "",
        username: ""
    }))
    const onSignup = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post("/api/users/signup", user);
            console.log("res:", res)
            toast.success(res.data.message);
            resetForm();
            setTimeout(() => {router.push(`/login`)}, 1500);
            
        } catch (error: any) {
          return toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])


  
    return (

        <div className='flex bg-[#f5f5f5] flex-col justify-center items-center min-h-screen py-2'>
          <Toaster />
            <form action="" className="bg-white p-7 w-[30%] shadow-lg rounded" onSubmit={onSignup}>

                <h1 className="text-center text-xl border-b-2 mx-auto font-bold  w-20 border-orange-500 pb-1"> {loading ? "Processing" : "Signup"} </h1>
                <br />
                <label className='mb-2 block font-semibold' htmlFor="username"> Username</label>
                <input
                    type="text"
                    id='username'
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder='username'
                    className='outline-none p-3 w-full  rounded border-2 focus:border-orange-500 mb-4 text-sm'
                />

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
                <button type='submit' disabled={buttonDisabled || loading} className={`${(buttonDisabled || loading) ? "opacity-50" : "opacity-100"} px-6 py-2 border-2 border-orange-500 rounded shadow my-3`}> {buttonDisabled ? "No Signup" : "Signup"} </button>
                <br />
                <small>
                    have an account?
                    <Link href="/login">  Login   </Link>
                </small>
            </form>
        </div>



    )
}

export default SignUpPage