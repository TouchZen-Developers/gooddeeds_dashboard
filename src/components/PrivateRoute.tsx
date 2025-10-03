"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthenticated() && !isLoading) {
                await router.replace('/login');
            }
            setIsLoading(false);
        };
        checkAuth();
    }, [isAuthenticated, router, isLoading]);

    return !isLoading && isAuthenticated() ? <>{children}</> : null;
};

export default PrivateRoute;
