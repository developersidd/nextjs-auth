"use client";

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';


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

      //if (res.data) {
      toast.success(res.data.message);
      resetForm();
      router.push(`/profile`)
      return null;
      //}

    } catch (error: any) {
      //e.log("error:", error)
      toast.error(error?.response?.data?.error);

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex bg-[#f5f5f5] flex-col justify-center items-center min-h-screen py-2'>
      <form action="" className="bg-white p-7 w-[30%] shadow-lg rounded" onSubmit={onLogin}>
        <h1 className="text-center text-xl font-bold   pb-1">{loading ? "Processing" : "Login"} </h1>
        <hr className='h-[3px] rounded-lg w-1/4 mx-auto bg-orange-500' />
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
          <Link className="font-bold" href="/signup"> Signup  </Link>
        </small>
        <br />
        <small>
          forgot password?
          <Link className="font-bold" href="/resetpassword"> Reset password  </Link>
        </small>
      </form>
    </div>
  )
}

export default LoginPage