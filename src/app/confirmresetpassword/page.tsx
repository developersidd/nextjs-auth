"use client";
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { toast } from 'react-hot-toast';

const ConfirmResetPassword = () => {
    const [passwords, setPasswords] = useState({ password: "", confirmPassword: "" });
    const [loading, setLoading] = useState<boolean>(false);
    const { confirmPassword, password } = passwords;
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const resetPassword = async (e?: FormEvent<HTMLFormElement>) => {
        e!.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("Password and confirm password didn't match!");
        }

        if (!token) {
            return toast.error("Token was not found");
        }

        try {
            setLoading(true);
            const res = await axios.post("/api/users/confirmresetpassword", { password, token });
            console.log("res:", res)
            toast.success(res.data?.message);
            router.push(`/login`);
        } catch (error: any) {
            toast.error(error.response?.data?.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=' text-center'>
            <form action="" className='mx-auto mt-16 bg-white p-7 w-[30%] shadow-lg rounded' onSubmit={resetPassword}>
                <h1 className="mb-4 text-lg"> {loading ? "Processing" : "Reset your password"} </h1>
                <input required className='outline-none p-3 w-full  rounded border-2 focus:border-orange-500 mb-4 text-sm' value={password} onChange={(e) => setPasswords({ ...passwords, password: e.target.value })} type="password" placeholder='Enter your new Password' />
                <input required className='outline-none p-3 w-full  rounded border-2 focus:border-orange-500 mb-4 text-sm' value={confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} type="password" placeholder='Confirm your new Password' />
                <button disabled={confirmPassword.length === 0 || password.length === 0} className='px-6 py-2 border-2 border-orange-500 rounded shadow' type='submit' > Reset Password </button>
            </form>
        </div>
    )
}

export default ConfirmResetPassword