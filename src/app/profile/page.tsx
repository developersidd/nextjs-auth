"use client";
import Toast from '@/ui/Toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
type UserType = {
  username: string;
  email: string;
}

const UserProfile = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();
  const [user, setUser] = useState<UserType>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users/me`);
        setUser(res.data.user)
      } catch (error: any) {
        toast.error(error.message);
      }finally{
        setLoading(false);
      }
    }
    getUser();
  }, []);

  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      toast.success(res.data.message);
       router.push(`/login`);
    } catch (error: any) {
      console.log("error:", error)
      toast.error(error.message);
    }
  }

  return (
    <div className="bg-white h-screen p-20">
      <Toast />
      <p className='mb-5'>
        User Profile : <span> {id} </span>
      </p>
      <p> {loading && "...Loading"} </p>
      <p> {user?.username} </p>
      <p> {user?.email} </p>
      <button onClick={logout} className='mt-5 bg-blue-600 text-white font-medium px-5 py-2'> Logout </button>
    </div>
  )
}

export default UserProfile