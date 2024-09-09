'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PinPage() {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const correctPin = '1973'; // Aquí defines el PIN correcto

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === correctPin) {
            localStorage.setItem('adminPin', pin); // Guardar el PIN en localStorage
            router.push('/admin'); // Redirigir al área de administración
        } else {
            setError('PIN incorrecto. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col p-6 bg-white border border-gray-300 rounded shadow-md">
                <h1 className="text-xl font-bold mb-4">Acceso Admin</h1>
                <input
                    type="password"
                    placeholder="Ingrese el PIN"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    className="mb-4 p-2 border border-gray-300 rounded"
                />
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Acceder</button>
            </form>
        </div>
    );
}
