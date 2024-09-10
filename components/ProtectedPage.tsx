'use client'; // Indica que este componente es del lado del cliente

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const pin = localStorage.getItem('adminPin');
        if (pin !== process.env.NEXT_PUBLIC_PIN) { // Cambia '1234' por el PIN que deseas usar
            router.push('/admin/pin'); // Redirige a la página de PIN
        } else {
            setIsAuthorized(true); // Establece el estado si el PIN es correcto
        }
    }, [router]);

    if (!isAuthorized) {
        return null; // Evita renderizar la página hasta que el usuario esté autorizado
    }

    return <>{children}</>; // Renderiza el contenido protegido
};

export default ProtectedPage;
