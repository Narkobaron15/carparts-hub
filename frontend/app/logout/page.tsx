'use client';

import { logout } from "@/lib/features/login_slice";
import { useAppDispatch } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(logout());
        router.push('/');
    }, []);

    return (
        <div className="container">
            <h1 className="text-3xl font-bold text-center my-8 text-gray-800">Logging out...</h1>
        </div>
    )
}

export default LogoutPage;