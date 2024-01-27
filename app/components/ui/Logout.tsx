// Logout.tsx
import React from 'react';
import { useRouter } from 'next/navigation';

interface LogoutProps {
    logOut: () => void;
}

const Logout: React.FC<LogoutProps> = ({ logOut }) => {
    const router = useRouter();

    const handleLogout = () => {
        logOut();
        router.push('/');
    };

    return (
        <div className="mb-8 flex items-center justify-center">
            <button
                onClick={handleLogout}
                className="rounded-md bg-green-600 px-10 py-3 text-white shadow-sm hover:bg-green-700"
            >
                Logout
            </button>
        </div>
    );
};

export default Logout;