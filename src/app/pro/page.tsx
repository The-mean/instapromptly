'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        localStorage.setItem('isProUser', 'true');
        router.push('/');
    }, [router]);

    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">🎉 Teşekkürler!</h1>
            <p className="text-gray-600 mt-2">Pro üyeliğiniz aktif edildi. Ana sayfaya yönlendiriliyorsunuz...</p>
        </div>
    );
}
