"use client"
import Toast from '@/ui/Toast';
import axios from 'axios'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const VerifyEmail = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const router = useRouter();
    const [verified, setVerified] = useState(false);
    useEffect(() => {
        const verifyUserEmail = async () => {
            try {
                await axios.post("/api/users/verifyemail", { token });
                setVerified(true);
                router.push("/profile")
            } catch (error: any) {
                toast.error(error.message);
            } 
        }

        toast.promise(verifyUserEmail(), {
            loading: 'Loading',
            success: 'Verified Successfully',
            error: 'There was some issue when verifying user Email',
        });

        if (token) {
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className="p-20">
            <Toast />
            <h1> Verify Email </h1>
            <h2> {verified && "Verification Done"}  </h2>

        </div>
    )
}

export default VerifyEmail