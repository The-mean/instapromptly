'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProActivatePage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        if (success) {
            const timeout = setTimeout(() => {
                router.push('/');
            }, 1500);
            return () => clearTimeout(timeout);
        }
    }, [success, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const res = await fetch('/api/activate-pro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (res.ok && data.success) {
                localStorage.setItem('isProUser', 'true');
                localStorage.setItem('proEmail', email);
                setSuccess(true);
            } else {
                setError(data.error || 'Activation failed.');
            }
        } catch (err: any) {
            setError(err.message || 'Activation failed.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Activate Pro Membership</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded shadow">
                <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? 'Activating...' : 'Activate Pro'}
                </button>
            </form>
            {success && <div className="mt-4 text-green-600 font-semibold">Pro membership activated! Redirecting...</div>}
            {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}
        </div>
    );
} 